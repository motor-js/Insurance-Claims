import React from "react";
import { Box, Filter } from "motor-ui";

const SidebarContent = () => {
  return (
    <Box direction="column">
      Hello Sidebar
      <span role="img" aria-label="wave_emoji">
        👋
      </span>
      <div style={{ color: "black" }}>Filters</div>
      <Filter label="Claim Status" dimension={["Claim Status"]} />
      <Filter label="Claim Type" dimension={["Claim Type"]} />
      <Filter label="Claim Sub-Type" dimension={["Claim Sub-Type"]} />
      <Filter label="Broker" dimension={["BrokerName"]} />
    </Box>
  );
};

export default SidebarContent;
