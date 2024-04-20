import { useEffect, useMemo, useState } from "react";
import { CategoryData, DropdownItem } from "../App.types";
import { getDropdownItems } from "../App.helpers";

export const useDropdownItems = (data: CategoryData[]) => {
  const [categories, setCategories] = useState<DropdownItem[]>([]);
  const [subcategories, setSubcategories] = useState<DropdownItem[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<DropdownItem[]>(
    [],
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    DropdownItem[]
  >([]);

  const selectedCategoryIds = useMemo(
    () => selectedCategories.map((selectedCategory) => selectedCategory.value),
    [selectedCategories],
  );

  const selectedSubcategoryIds = useMemo(
    () =>
      selectedSubcategories.map(
        (selectedSubcategory) => selectedSubcategory.value,
      ),
    [selectedSubcategories],
  );

  useEffect(() => {
    const { categories, subcategories } = getDropdownItems(data);

    setSelectedCategories(categories);
    setSelectedSubcategories(subcategories);
  }, [data]);

  useEffect(() => {
    const { categories, subcategories } = getDropdownItems(
      data,
      selectedCategoryIds,
    );

    setCategories(categories);
    setSubcategories(subcategories);
  }, [data, selectedCategoryIds]);

  const handleSelectCategory = (value: DropdownItem[]) => {
    setSelectedCategories(value);
  };

  const handleSelectSubcategory = (value: DropdownItem[]) => {
    setSelectedSubcategories(value);
  };

  return {
    categories,
    subcategories,
    selectedCategories,
    selectedSubcategories,
    selectedCategoryIds,
    selectedSubcategoryIds,
    handleSelectCategory,
    handleSelectSubcategory,
  };
};
