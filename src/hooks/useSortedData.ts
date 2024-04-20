import { useCallback, useEffect, useState } from "react";

import { CategoryData, ProductData } from "../App.types";

type SortMode = "default" | "ascending" | "descending";

const sortPredicates: Record<
  SortMode,
  (a: ProductData, b: ProductData) => number
> = {
  default: () => 0,
  ascending: (productA: ProductData, productB: ProductData) =>
    productA.price - productB.price,
  descending: (productA: ProductData, productB: ProductData) =>
    productB.price - productA.price,
};

export const useSortedData = (data: CategoryData[]) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortMode, setSortMode] = useState<SortMode>("default");

  const toggleSortMode = () => {
    const sortModeOrder: SortMode[] = ["default", "ascending", "descending"];
    const currentSortModeIndex = sortModeOrder.findIndex(
      (item) => item === sortMode,
    );
    if (currentSortModeIndex === sortModeOrder.length - 1) {
      setSortMode(sortModeOrder[0]);
      return;
    }
    setSortMode(sortModeOrder[currentSortModeIndex + 1]);
  };

  const sortData = useCallback(() => {
    return data.map((category) => {
      return {
        ...category,
        subcategories: category.subcategories.map((subcategory) => ({
          ...subcategory,
          products: subcategory.products
            .map((product) => ({ ...product }))
            .sort(sortPredicates[sortMode]),
        })),
      };
    });
  }, [data, sortMode]);

  useEffect(() => {
    setSortedData(sortData());
  }, [sortMode, sortData]);

  return {
    sortedData,
    sortMode,
    toggleSortMode,
  };
};
