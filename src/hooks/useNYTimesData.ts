import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Article, NytResponse } from "../types";

export const useNYTimesData = (): [Article[], boolean, string | null] => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatArticles = (data: NytResponse): Article[] => {
    return data.response.docs.map((item) => ({
      title: item.headline.main,
      date: new Date(item.pub_date),
      author:
        item.byline?.person
          ?.map((author) =>
            `${author.firstname ?? ""} ${author.lastname ?? ""}`.trim()
          )
          .slice(0, 2)
          .join(",") || "Unknown",
      source: item.source,
      category: item.news_desk?.toLowerCase() || "general",
      url: item.web_url,
      image: item.multimedia?.[0]?.url
        ? `https://www.nytimes.com/${item.multimedia[0].url}`
        : "",
    }));
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<NytResponse>(
        "https://api.nytimes.com/svc/search/v2/articlesearch.json",
        {
          params: {
            "api-key": "86JFmvNtaPgGyJ2CLYITVkqGj2G76lNt",
          },
        }
      );

      setArticles(formatArticles(data));
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to fetch NYT articles");
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
