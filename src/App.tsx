import React, { useState } from "react";
import "./App.css";
import { testData } from "./data";
import { MultiSelect } from "react-multi-select-component";
import { useDropdownItems } from "./hooks/useDropdownItems";
import { useFilteredData } from "./hooks/useFilteredData";
import { useSortedData } from "./hooks/useSortedData";
import { Control, Controls, StyledVariableSizeList } from "./App.styles";
import { Product } from "./components/Product/Product";
import { Category } from "./components/Category/Category";
import { Subcategory } from "./components/Subcategory/Subcategory";

export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    categories,
    subcategories,
    selectedCategories,
    selectedSubcategories,
    selectedCategoryIds,
    selectedSubcategoryIds,
    handleSelectCategory,
    handleSelectSubcategory,
  } = useDropdownItems(testData);
  const { sortedData, sortMode, toggleSortMode } = useSortedData(testData);
  const { flatFilteredData } = useFilteredData(
    sortedData,
    searchQuery,
    selectedCategoryIds,
    selectedSubcategoryIds,
  );

  return (
    <div>
      <Controls>
        <Control>
          <MultiSelect
            options={categories}
            value={selectedCategories}
            labelledBy={""}
            onChange={handleSelectCategory}
            valueRenderer={() => "Select categories"}
          />
        </Control>
        <Control>
          <MultiSelect
            options={subcategories}
            value={selectedSubcategories}
            labelledBy={""}
            onChange={handleSelectSubcategory}
            valueRenderer={() => "Select subcategories"}
          />
        </Control>
        <Control>
          <button onClick={toggleSortMode}>{sortMode} order</button>
        </Control>
        <Control>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </Control>
      </Controls>
      <StyledVariableSizeList
        height={400}
        itemCount={flatFilteredData.length}
        itemSize={(index) => flatFilteredData[index].size}
        estimatedItemSize={40}
        width={"100%"}
      >
        {({ index, style }) => {
          const item = flatFilteredData[index];

          if (item.type === "category") {
            return <Category {...item} style={style} />;
          }

          if (item.type === "subcategory") {
            return <Subcategory {...item} style={style} />;
          }

          if (item.type === "product") {
            return <Product {...item} style={style} />;
          }

          return null;
        }}
      </StyledVariableSizeList>
    </div>
  );
};
