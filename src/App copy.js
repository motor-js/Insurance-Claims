import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Grid,
  Box,
  Bar,
  Juno,
  google,
  powerbi,
  base,
  // BarPlot,
  Filter,
  SmartHeading,
  Sidebar,
  useScreenSize,
  useSidebar,
} from "juno-ui/dist";
import { Menu } from "@styled-icons/feather";
import { config } from "./config.js";

// base.selectionModal.buttonType = "button";
base.global.fontFamily = "'Source Sans Pro', sans-serif";

function App() {
  //state for tablet and mobile viewing
  const [smallScreen, setSmallScreen] = useState(false);

  //get the screen type
  const { screen } = useScreenSize();
  //use the Siderbar hook
  const { isOpen, toggle } = useSidebar();

  useEffect(() => {
    if (screen === "mobile" || screen === "tablet") {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  });

  let cols;
  let areas;

  //change grid based on screen size
  if (smallScreen) {
    cols = ["auto"];
    areas = [["header"], ["main"], ["footer"]];
  } else {
    cols = ["20%", "auto"];
    areas = [
      ["sidebar", "header"],
      ["sidebar", "main"],
      ["sidebar", "footer"],
    ];
  }

  //render sidebar
  const sidebar = () => {
    if (smallScreen) {
      return (
        <Sidebar
          width="100%"
          collapsable
          padding="15px 20px"
          isOpen={isOpen}
          backgroundColor="brand"
          justifyContent="top"
        >
          <Menu
            onClick={toggle}
            size={25}
            style={{ padding: "0px 30px 0px 5px" }}
          />
        </Sidebar>
      );
    } else {
      return (
        <Box gridArea="sidebar" backgroundColor="brand">
          <Filter label="Year" dimension={["Year"]} />
        </Box>
      );
    }
  };

  return (
    <Grid rows={["60px", "auto", "40px"]} columns={cols} areas={areas}>
      {/* <Juno config={config} theme={powerbi}> */}
      <Juno config={config}>
        <Box
          gridArea="header"
          border="bottom"
          direction="row"
          align="center"
          padding="20px"
          size="large"
        >
          {smallScreen && (
            <Menu
              onClick={toggle}
              size={25}
              style={{ padding: "0px 30px 0px 5px" }}
            />
          )}
          <div>
            Motor Starter Dashboard
            {/* <SmartHeading level={5}>Last reload : </SmartHeading> */}
          </div>
        </Box>
        <Box
          gridArea="main"
          border="bottom"
          direction="row"
          align="center"
          padding="20px"
          size="large"
        >
          <Grid
            rows={["50%", "50%"]}
            // columns={["auto", "auto"]}
            cols={["50%", "50%"]}
            // cols={["50%", "50%"]}
            // areas={[
            //   ["topleft", "topright"],
            //   ["bottomleft", "bottomright"],
            // ]}
          >
            {/* <Box
            gridArea="topleft"
            // border="bottom"
            // direction="row"
            // align="center"
            // padding="20px"
            // size="large"
          > */}
            <Bar
              cols={[
                // { qField: "Year", qLabel: "Year" },
                { qField: "[OICA region]", qLabel: "OICA region" },
                {
                  qField: "=Sum([Car sales])*if(Year=2011,1,1)",
                  qLabel: "Car sales",
                },
              ]}
              suppressZero={true}
            />
            {/* </Box> */}
            {/* <Box
            gridArea="topright"
            // border="bottom"
            // direction="row"
            // align="center"
            // padding="20px"
            // size="large"
          > */}
            <Bar
              cols={[
                { qField: "Year", qLabel: "Year" },
                // { qField: "[OICA region]", qLabel: "OICA region" },
                {
                  qField: "=Sum([Car sales])",
                  qLabel: "Car sales",
                },
              ]}
              suppressZero={true}
            />
            {/* </Box> */}
          </Grid>
        </Box>
        {sidebar()}
        <Box
          gridArea="footer"
          border="top"
          align="center"
          justifyContent="center"
          direction="row"
          size="small"
        >
          made with ❤️ by motor
        </Box>
      </Juno>
    </Grid>
  );
}

export default App;
