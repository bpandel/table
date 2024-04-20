import styled from "styled-components";
import { VariableSizeList } from "react-window";

export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Control = styled.div`
  max-width: 500px;
`;

export const StyledVariableSizeList = styled(VariableSizeList)`
  & > div {
    border-bottom: 1px solid black;
  }
`;
