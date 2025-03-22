import { useEffect, useState, useMemo } from "react";
import { Article } from "../types";
import { useNYTimesData } from "./useNYTimesData";
import { useGuardianData } from "./useGuardianData";
import { useNewsApiData } from "./useNewsApiData";

export const useNewsData = () => {
  const [nytData, isLoadingNyt] = useNYTimesData();
  const [guardianData, isLoadingGuardian] = useGuardianData();
  const [newsapiData, isLoadingNewsapi] = useNewsApiData();
  const [filteredNews, setFilteredNews] = useState<Article[]>([]);

  const isLoading = isLoadingNyt || isLoadingGuardian || isLoadingNewsapi;

  const newsCollection = useMemo(() => {
    return [...nytData, ...guardianData, ...newsapiData]
      .filter((newsItem) => newsItem.author?.length > 0)
      .sort(
        (first, second) =>
          new Date(second.date).getTime() - new Date(first.date).getTime()
      );
  }, [nytData, guardianData, newsapiData]);

  useEffect(() => {
    setFilteredNews(newsCollection);
  }, [newsCollection]);

  return {
    allArticles: newsCollection,
    filteredArticles: filteredNews,
    setFilteredArticles: setFilteredNews,
    isLoading,
  };
};
