import React from "react";
import { Box } from "motor-ui";

const FooterContent = (props) => {
  return (
    <Box
      gridArea="footer"
      border={{ side: "top", color: "brand" }}
      align="center"
      justifyContent="center"
      direction="row"
      size="small"
    >
      {props.children}
    </Box>
  );
};

export default FooterContent;
