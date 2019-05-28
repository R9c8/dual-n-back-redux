import styled from 'styled-components';

export const SmallButton = styled.button`
  display: inline-block;
  font-weight: 400;
  color: #fff;
  background-color: #375a7f;
  border-color: #375a7f;
  
  text-align: center;
  vertical-align: middle;
  -webkit-user-select: none;
    -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border: 1px solid #375a7f;
  padding: 0.25rem 0.5rem;
  font-size: 0.8203125rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  -webkit-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    color: #fff;
    background-color: #2b4764;
    border-color: #28415b;
  }

  &:active {
    -webkit-box-shadow: 0 0 0 0.2rem rgba(85, 115, 146, 0.5);
    box-shadow: 0 0 0 0.2rem rgba(85, 115, 146, 0.5);
  }

  &:focus {
    outline: none !important;
    box-shadow: none !important;
  }

  transition: color 0.05s ease-in-out, background-color 0.05s ease-in-out, border-color 0.05s ease-in-out, box-shadow 0.05s ease-in-out, -webkit-box-shadow 0.05s ease-in-out;
`;
