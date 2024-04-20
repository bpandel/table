import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  border: 1px solid black;
  border-bottom: none;
  height: 40px;
  box-sizing: border-box;
`;

export const Cell = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  border-right: 1px solid black;
  &:last-child {
    border-right: 0;
  }
  padding-inline: 12px;
`;
