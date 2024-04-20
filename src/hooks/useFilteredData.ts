import { useEffect, useState } from "react";
import {
  CategoryData,
  FlatCategory,
  FlatProduct,
  FlatSubcategory,
} from "../App.types";
import { filterData, flattenData } from "../App.helpers";

export const useFilteredData = (
  data: CategoryData[],
  searchQuery: string,
  selectedCategoryIds: string[],
  selectedSubcategoryIds: string[],
) => {
  const [flatFilteredData, setFlatFilteredData] = useState<
    Array<FlatCategory | FlatSubcategory | FlatProduct>
  >([]);

  useEffect(() => {
    const targetSearchQuery =
      searchQuery.length < 3 && searchQuery.length !== 0 ? "" : searchQuery;

    const filteredData = filterData(
      data,
      targetSearchQuery,
      selectedCategoryIds,
      selectedSubcategoryIds,
    );

    setFlatFilteredData(flattenData(filteredData));
  }, [searchQuery, data, selectedCategoryIds, selectedSubcategoryIds]);

  return {
    flatFilteredData,
  };
};
