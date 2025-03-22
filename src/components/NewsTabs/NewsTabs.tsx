import { useState } from "react";
import styles from "./NewsTabs.module.scss";
import { NewsSearch } from "../NewsSearch/NewsSearch";
import { Article } from "../../types";

interface NewsTabsProps {
  data: Article[];
  setData: (articles: Article[]) => void;
  combined: Article[];
}

type TabsType = "latest" | "author" | "category" | "source";

const tabLabels: Record<TabsType, string> = {
  latest: "Latest News",
  author: "Favorite Authors",
  category: "Favorite Topics",
  source: "Trusted Sources",
};

export const NewsTabs: React.FC<NewsTabsProps> = ({
  data,
  setData,
  combined,
}) => {
  const [activeTab, setActiveTab] = useState<TabsType>("latest");
  const [originalData, setOriginalData] = useState<Article[]>(data);

  const handleTabChange = (tab: TabsType) => {
    setActiveTab(tab);
    if (tab === "latest") {
      setData(combined);
      setOriginalData(combined);
    } else {
      const savedItems = localStorage.getItem(tab)?.split(",") || [];
      const filteredData = combined.filter((item) =>
        savedItems.some((fav) =>
          item[tab as keyof Article]?.toString().split(",").includes(fav)
        )
      );
      setData(filteredData);
    }
  };

  return (
    <>
      <div className={styles["news-tabs"]}>
        <ul className={styles["tabs-list"]}>
          {(["latest", "author", "category", "source"] as const).map((tab) => (
            <li
              key={tab}
              className={`${styles["tab-item"]} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => handleTabChange(tab)}
            >
              <p>{tabLabels[tab]}</p>
            </li>
          ))}
        </ul>
      </div>
      <NewsSearch setData={setData} originalData={originalData} />
    </>
  );
};
