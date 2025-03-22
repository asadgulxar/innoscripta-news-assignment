import React, { useEffect, useReducer, useRef } from "react";
import styles from "./FilterNews.module.scss";
import { Article } from "../../types";

interface FilterState {
  selectedCategory: string;
  selectedSource: string;
  startDate: string;
  endDate: string;
  categories: string[];
  sources: string[];
}

type FilterAction =
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "SET_SOURCE"; payload: string }
  | { type: "SET_START_DATE"; payload: string }
  | { type: "SET_END_DATE"; payload: string }
  | { type: "SET_CATEGORIES"; payload: string[] }
  | { type: "SET_SOURCES"; payload: string[] }
  | { type: "RESET_FILTERS" };

const initialState: FilterState = {
  selectedCategory: "",
  selectedSource: "",
  startDate: "",
  endDate: "",
  categories: [],
  sources: [],
};

const filterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SOURCE":
      return { ...state, selectedSource: action.payload };
    case "SET_START_DATE":
      return { ...state, startDate: action.payload };
    case "SET_END_DATE":
      return { ...state, endDate: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_SOURCES":
      return { ...state, sources: action.payload };
    case "RESET_FILTERS":
      return {
        ...initialState,
        categories: state.categories,
        sources: state.sources,
      };
    default:
      return state;
  }
};

interface FilterNewsProps {
  data: Article[];
  setData: (articles: Article[]) => void;
  combined: Article[];
}

export const FilterNews: React.FC<FilterNewsProps> = ({
  data,
  setData,
  combined,
}) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);
  const {
    selectedCategory,
    selectedSource,
    startDate,
    endDate,
    categories,
    sources,
  } = state;

  const originalData = useRef<Article[]>(data);

  useEffect(() => {
    dispatch({
      type: "SET_CATEGORIES",
      payload: [...new Set(combined.map((item) => item.category))],
    });
    dispatch({
      type: "SET_SOURCES",
      payload: [...new Set(combined.map((item) => item.source))],
    });
  }, [combined]);

  useEffect(() => {
    let filteredData = [...originalData.current];

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === selectedCategory
      );
    }
    if (selectedSource) {
      filteredData = filteredData.filter(
        (item) => item.source === selectedSource
      );
    }
    if (startDate && endDate) {
      filteredData = filteredData.filter(
        (item) =>
          new Date(item.date) >= new Date(startDate) &&
          new Date(item.date) <= new Date(endDate)
      );
    }

    setData(filteredData);
  }, [selectedCategory, selectedSource, startDate, endDate, setData]);

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
    setData(originalData.current);
  };

  return (
    <div className={styles["filter-container"]}>
      <select
        className={styles["filter-dropdown"]}
        value={selectedCategory}
        onChange={(e) =>
          dispatch({ type: "SET_CATEGORY", payload: e.target.value })
        }
      >
        <option value="">All Categories</option>
        {categories.map((category, index) => (
          <option key={index} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className={styles["filter-dropdown"]}
        value={selectedSource}
        onChange={(e) =>
          dispatch({ type: "SET_SOURCE", payload: e.target.value })
        }
      >
        <option value="">All Sources</option>
        {sources.map((source, index) => (
          <option key={index} value={source}>
            {source}
          </option>
        ))}
      </select>

      <input
        type="date"
        className={styles["filter-date"]}
        value={startDate}
        onChange={(e) =>
          dispatch({ type: "SET_START_DATE", payload: e.target.value })
        }
      />
      <input
        type="date"
        className={styles["filter-date"]}
        value={endDate}
        onChange={(e) =>
          dispatch({ type: "SET_END_DATE", payload: e.target.value })
        }
      />

      <button className={styles["filter-reset-btn"]} onClick={resetFilters}>
        Clear
      </button>
    </div>
  );
};
