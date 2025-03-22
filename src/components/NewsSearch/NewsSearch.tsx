import { useEffect, useState } from "react";
import styles from "./NewsSearch.module.scss";
import { Article } from "../../types";

interface NewsSearchPropsType {
  setData: (articles: Article[]) => void;
  originalData: Article[];
}

export const NewsSearch = ({ setData, originalData }: NewsSearchPropsType) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setData(originalData);
    } else {
      const filteredResults = originalData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredResults);
    }
  }, [query, originalData, setData]);

  return (
    <div className={styles["news-search"]}>
      <input
        type="text"
        placeholder="Search news..."
        className={styles["search-input"]}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};
