import styles from "./NewsFeed.module.scss";
import {
  Loader,
  News,
  FilterNews,
  NewsTabs,
  NoDataFound,
} from "../../components";
import { useNewsData } from "../../hooks/useNewsData";

export const NewsFeed = () => {
  const { allArticles, filteredArticles, setFilteredArticles, isLoading } =
    useNewsData();

  if (isLoading || !filteredArticles) return <Loader />;

  return (
    <div className={styles.feed}>
      <NewsTabs
        data={filteredArticles}
        setData={setFilteredArticles}
        combined={allArticles}
      />
      <div className={styles.content}>
        <FilterNews
          data={filteredArticles}
          setData={setFilteredArticles}
          combined={allArticles}
        />
        {filteredArticles.length > 0 ? (
          <div className={styles.cards}>
            {filteredArticles.map((article, index) => (
              <News data={article} key={index} />
            ))}
          </div>
        ) : (
          <NoDataFound message="No news available" />
        )}
      </div>
    </div>
  );
};
