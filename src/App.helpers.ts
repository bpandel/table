import {
  CategoryData,
  FlatCategory,
  FlatProduct,
  FlatSubcategory,
  ProductData,
  SubcategoryData,
} from "./App.types";

export const getDropdownItems = (
  data: CategoryData[],
  selectedCategoryIds?: string[],
) => {
  const categories = data.map((category) => ({
    value: category.catId.toString(),
    label: category.name,
  }));

  const subcategories = data
    .filter(
      (category) =>
        !selectedCategoryIds ||
        selectedCategoryIds?.includes(category.catId.toString()),
    )
    .flatMap((category) =>
      category.subcategories.map((subcategory) => ({
        value: subcategory.subCatId,
        label: `${subcategory.name} of ${category.name}`,
      })),
    );

  return {
    categories,
    subcategories,
  };
};

export const flattenData = (data: CategoryData[]) => {
  const flatData: Array<FlatCategory | FlatSubcategory | FlatProduct> = [];

  data.forEach((category) => {
    flatData.push({
      name: category.name,
      type: "category",
      size: 80,
    });
    category.subcategories.forEach((subcategory) => {
      flatData.push({
        name: subcategory.name,
        type: "subcategory",
        size: 60,
      });
      subcategory.products.forEach((product) => {
        flatData.push({ ...product, type: "product", size: 40 });
      });
    });
  });
  return flatData;
};

export const filterData = (
  data: CategoryData[],
  searchQuery: string,
  selectedCategoryIds: string[],
  selectedSubcategoryIds: string[],
) => {
  return data.reduce<CategoryData[]>((acc1, category) => {
    if (
      (searchQuery.at(0) !== category.catId.toString() && !!searchQuery) ||
      !selectedCategoryIds.includes(category.catId.toString())
    ) {
      return acc1;
    }

    const subcategories = category.subcategories.reduce<SubcategoryData[]>(
      (acc2, subCategory) => {
        if (
          (searchQuery.at(0) !== subCategory.subCatId.at(0) && !!searchQuery) ||
          !selectedSubcategoryIds.includes(subCategory.subCatId)
        ) {
          return acc2;
        }

        const products = subCategory.products.reduce<ProductData[]>(
          (acc3, product) => {
            if (product.name.startsWith(searchQuery)) {
              acc3.push(product);
            }
            return acc3;
          },
          [],
        );

        if (products.length > 0) {
          acc2.push({ ...subCategory, products });
        }

        return acc2;
      },
      [],
    );

    if (subcategories.length > 0) {
      acc1.push({ ...category, subcategories });
    }

    return acc1;
  }, []);
};
