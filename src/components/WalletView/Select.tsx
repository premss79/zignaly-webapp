import React from "react";
import { FormControl, Select as SelectMui, MenuItem } from "@material-ui/core";
import styled from "styled-components";

const StyledSelect = styled(SelectMui)`
  background: ${(props) =>
    props.theme.palette.type === "dark"
      ? "rgba(12, 13, 33, 0.8)"
      : "linear-gradient(312.12deg, #41BDD8 14.16%, #7568DE 83.59%)"};
  border-radius: 4px;
  color: ${(props) =>
    props.theme.palette.type === "dark" ? props.theme.newTheme.neutralText : "white"};
  font-weight: 600;
  font-size: 13px;
  position: relative;
  z-index: 0;
  margin-left: 18px;

  svg {
    color: ${(props) =>
      props.theme.palette.type === "dark" ? props.theme.newTheme.neutralText : "white"};
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: inherit;
    padding: 1px;
    background: ${(props) =>
      props.theme.palette.type === "dark"
        ? "linear-gradient(289.8deg, #149cad 0%, #4540c1 100%)"
        : "linear-gradient(289.8deg, #817cce 0%, #779fd4 100%)"};
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
    z-index: -1;
  }
`;

interface FilterValue {
  value: string | number;
  label: string;
}

interface ISelect {
  values: FilterValue[];
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select = ({ values, value, handleChange }: ISelect) => {
  return (
    <FormControl variant="filled" hiddenLabel={true}>
      <StyledSelect disableUnderline value={value} onChange={handleChange}>
        {values.map((v) => (
          <MenuItem key={v.value} value={v.value}>
            {v.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};
export default Select;
