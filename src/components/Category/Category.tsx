import { Container } from "./Category.styles";
import { CSSProperties } from "react";

export interface CategoryProps {
  name: string;
  style: CSSProperties;
}

export const Category = ({ name, style }: CategoryProps) => {
  return <Container style={style}>{name}</Container>;
};
