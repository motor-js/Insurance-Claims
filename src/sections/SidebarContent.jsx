import React from "react";
import { Box, Filter } from "motor-ui";

const SidebarContent = () => {
  return (
    <Box direction="column" style={{ zIndex: "999" }}>
      Hello Sidebar{" "}
      <span role="img" aria-label="wave_emoji">
        👋
      </span>
      <div style={{ color: "white" }}>Filters</div>
      <Filter label="Claim Status" dimension={["Claim Status"]} />
      <Filter label="Claim Type" dimension={["Claim Type"]} />
      <Filter label="Claim Sub-Type" dimension={["Claim Sub-Type"]} />
      <Filter label="Broker" dimension={["BrokerName"]} />
    </Box>
  );
};

export default SidebarContent;
