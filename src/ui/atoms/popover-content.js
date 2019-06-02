import styled from "styled-components";

export const PopoverContent = styled.div`
  background-color: #303030;
  border-radius: 0.5rem;
  border: 1px solid #222;
  padding: 10px;
  ${p => p.maxWidth && `max-width: ${p.maxWidth}px;`}
`;
