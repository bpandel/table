export interface ProductData {
  index: string;
  name: string;
  price: number;
  quantity: number;
}

export interface SubcategoryData {
  subCatId: string;
  name: string;
  products: ProductData[];
}

export interface CategoryData {
  catId: number;
  name: string;
  subcategories: SubcategoryData[];
}

export interface DropdownItem {
  value: string;
  label: string;
}

export interface FlatCategory {
  name: string;
  size: 80;
  type: "category";
}

export interface FlatSubcategory {
  name: string;
  size: 60;
  type: "subcategory";
}

export interface FlatProduct {
  index: string;
  name: string;
  price: number;
  quantity: number;
  size: 40;
  type: "product";
}
