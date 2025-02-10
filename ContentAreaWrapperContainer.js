import React from "react";
import { styled } from "@mui/material/styles";
import color from '../common/colors.json';

const ContentAreaWrapperContainer = styled("div")((props) => ({
  padding: ${props?.padding ? props.padding : "30px"},
  margin: ${props?.margin ? props.margin : "0px"},
  border: ${props?.border ? "1px solid #E0E0E0": "0"},
  backgroundColor: ${props?.backgroundColor ? props.backgroundColor: color.snow}
}));

const ContentAreaWrapper = ({ children, p, m, border, backgroundColor, ...props }) => {
  return (
    <ContentAreaWrapperContainer padding={p} margin={m} border={border} backgroundColor={backgroundColor} {...props}>
      {children}
    </ContentAreaWrapperContainer>
  );
};

export default ContentAreaWrapper;
