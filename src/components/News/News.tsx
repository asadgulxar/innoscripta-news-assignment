import styles from "./News.module.scss";
import { FaPlus } from "react-icons/fa";
import { Article } from "../../types";
import { useEffect, useState } from "react";

interface NewsProps {
  data: Article;
}

export const News: React.FC<NewsProps> = ({ data }) => {
  const background = data.image;
  const [favorites, setFavorites] = useState<{ [key: string]: Set<string> }>({
    category: new Set(),
    source: new Set(),
    author: new Set(),
  });

  useEffect(() => {
    setFavorites({
      category: new Set(localStorage.getItem("category")?.split(",") || []),
      source: new Set(localStorage.getItem("source")?.split(",") || []),
      author: new Set(localStorage.getItem("author")?.split(",") || []),
    });
  }, []);

  const toggleFavorites = (value: string, field: keyof typeof favorites) => {
    setFavorites((prev) => {
      const updatedSet = new Set(prev[field]);

      if (updatedSet.has(value)) {
        updatedSet.delete(value);
      } else {
        updatedSet.add(value);
      }

      localStorage.setItem(field?.toString(), Array.from(updatedSet).join(","));
      return { ...prev, [field]: updatedSet };
    });
  };

  return (
    <div
      className={styles["card-container"]}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles["card-header"]}>
        <span className={styles["card-category"]}>
          {data.category}
          <FaPlus
            title="Add as favorite topic"
            className={`${styles["add-icon"]} ${
              favorites.category.has(data.category) ? styles["active"] : ""
            }`}
            onClick={() => toggleFavorites(data.category, "category")}
          />
        </span>
      </div>

      <div className={styles["card-header"]}>
        <span className={styles["card-source"]}>
          {data.source}
          <FaPlus
            title="Add as favorite source"
            className={`${styles["add-icon"]} ${
              favorites.source.has(data.source) ? styles["active"] : ""
            }`}
            onClick={() => toggleFavorites(data.source, "source")}
          />
        </span>
      </div>

      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles["card-url"]}
      >
        <p className={styles["card-title"]}>{data.title}</p>
      </a>

      <div className={styles["card-authors"]}>
        {data.author?.split(",").map((author, index) => (
          <div className={styles["author-container"]} key={index}>
            <span className={styles["author-name"]}>{author}</span>
            <FaPlus
              title="Add as favorite Author"
              className={`${styles["add-icon"]} ${
                favorites.author.has(author) ? styles["active"] : ""
              }`}
              onClick={() => toggleFavorites(author, "author")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
