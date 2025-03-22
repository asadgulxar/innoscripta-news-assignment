import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Article, NewsApiResponse } from "../types";

export const useNewsApiData = (): [Article[], boolean, string | null] => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatArticles = (data: NewsApiResponse): Article[] => {
    return data.articles.map((item) => ({
      title: item.title,
      date: new Date(item.publishedAt),
      author: item.author
        ? item.author.split(",").slice(0, 2).join(",")
        : "Unknown",
      source: item.source.name,
      category: "entertainment",
      url: item.url,
      image: item.urlToImage || "",
    }));
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get<NewsApiResponse>(
        "https://newsapi.org/v2/top-headlines",
        {
          params: {
            category: "entertainment",
            apiKey: "509ce15740ec48839ce33f6b183ae5a4",
          },
        }
      );

      setArticles(formatArticles(data));
      setError(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Failed to fetch news articles"
        );
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
