import { Cell, Container } from "./Product.styles";
import { CSSProperties } from "react";

export interface ProductProps {
  index: string;
  name: string;
  price: number;
  quantity: number;
  style: CSSProperties;
}

export const Product = ({
  quantity,
  index,
  price,
  name,
  style,
}: ProductProps) => {
  return (
    <Container style={style}>
      <Cell>{index}</Cell>
      <Cell>{name}</Cell>
      <Cell>{quantity}</Cell>
      <Cell>{price}</Cell>
    </Container>
  );
};
