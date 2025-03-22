import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Article, GuardianResponse } from "../types";

export const useGuardianData = (): [Article[], boolean, string | null] => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatArticles = (data: GuardianResponse): Article[] => {
    return data.response.results.map((item) => ({
      title: item.webTitle,
      date: new Date(item.webPublicationDate),
      author:
        item.tags
          ?.map((tag) => tag.webTitle.trim())
          .slice(0, 2)
          .join(",") || "Unknown",
      source: "Guardian",
      category: item.pillarName?.toLowerCase() || "general",
      url: item.webUrl,
      image: item.elements?.[0]?.assets?.[0]?.file || "",
    }));
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<GuardianResponse>(
        "https://content.guardianapis.com/search",
        {
          params: {
            format: "json",
            "show-tags": "contributor",
            "show-elements": "image",
            "api-key": "f28ea144-63b7-401f-bae1-d45994aee086",
          },
        }
      );

      setArticles(formatArticles(data));
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [articles, isLoading, error];
};
