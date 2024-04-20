import { Container } from "./Subcategory.styles";
import { CSSProperties } from "react";

export interface SubcategoryProps {
  name: string;
  style: CSSProperties;
}

export const Subcategory = ({ name, style }: SubcategoryProps) => {
  return <Container style={style}>{name}</Container>;
};
