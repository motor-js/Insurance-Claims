import React from "react";
import { Box, Filter, Sidebar } from "@motor-js/core";
import styled from "styled-components";
import { Filter as styledFilter } from "@styled-icons/ionicons-solid";

const FilterIcon = styled(styledFilter)`
  color: black;
  padding: 0px 10px 0px 5px;
`;

const SidebarContent = (props) => {
  const toggle = () => {
    props.onClick();
  };
  return (
    <Sidebar
      width="30%"
      collapsable
      direction="column"
      padding="15px 12px"
      isOpen={props.isOpen}
      backgroundColor="altGray1"
      justifyContent="top"
      border={{ color: "brand" }}
      // style={{ zIndex: "999" }}
    >
      <Box direction="column" overflow="visible">
        <Box
          gridArea="header"
          // backgroundColor="brand"
          // border="bottom"
          border={{ side: "bottom", color: "brand" }}
          padding="0px 0px 10px 0px"
          direction="row"
          align="center"
          // padding="12px"
          size="large"
          overflow="hidden"
        >
          <FilterIcon onClick={toggle} size={25} />
          Filters
        </Box>
        <Box direction="column" padding="0px 0px 0px 30px" overflow="visible">
          <Filter label="Claim Status" dimension={["Claim Status"]} />
          <Filter label="Claim Type" dimension={["Claim Type"]} />
          <Filter label="Claim Sub-Type" dimension={["Claim Sub-Type"]} />
          <Filter label="Broker" dimension={["BrokerName"]} />
        </Box>
      </Box>
    </Sidebar>
  );
};

export default SidebarContent;
