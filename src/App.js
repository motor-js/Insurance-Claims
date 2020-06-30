import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Grid,
  Box,
  Bar,
  Column,
  Juno,
  Pie,
  // google,
  // powerbi,
  base,
  KPI,
  Filter,
  // SmartHeading,
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
        <Box
          gridArea="sidebar"
          backgroundColor="brand"
          direction="column"
          align="center"
        >
          <div style={{ color: "white" }}>Filters</div>
          <Filter label="Claim Status" dimension={["Claim Status"]} />
          {/* <Filter
            label="Claim Occurence Year"
            dimension={["Claim Occurence Date.autocalendar.Year"]}
          /> */}
          <Filter label="Claim Type" dimension={["Claim Type"]} />
          <Filter label="Claim Sub-Type" dimension={["Claim Sub-Type"]} />
          <Filter label="Broker" dimension={["BrokerName"]} />
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
          backgroundColor="brandLight"
        >
          <Grid
            backgroundColor="brandLight"
            // cols={["auto"]}
            // cols={["50%", "50%"]}
            areas={[
              ["topleft", "topright"],
              ["bottomleft", "bottomright"],
            ]}
          >
            <Box
              // gridArea="main"
              border="bottom"
              direction="row"
              align="center"
              padding="20px"
              size="large"
              backgroundColor="brandLight"
            >
              <KPI
                cols={[
                  "=Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1} ,[Claim Notification Date.autoCalendar.YearsAgo]={0} > } [ClaimCounter] )",
                ]}
                label="Claims Opened (YTD)"
                size="small"
              />
              <KPI
                cols={[
                  "=Sum( { $< [Claim Settled Date.autoCalendar.InYTD]={1} ,[Claim Settled Date.autoCalendar.YearsAgo]={0} > } [ClaimCounter] )",
                ]}
                label="Claims Settled (YTD)"
                size="small"
              />
              <KPI
                cols={[
                  "=Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1}, [Claim Notification Date.autoCalendar.YearsAgo]={0} > } [Total Claim Cost])/1000000",
                ]}
                label="Claim Payments (YTD) {display as £}"
                size="small"
              />
              <KPI
                cols={[
                  "=Avg( { $< [Claim Notification Date.autoCalendar.InYTD]={1} ,[Claim Notification Date.autoCalendar.YearsAgo]={0} > } [Total Claim Cost])",
                ]}
                label="Ave Claim Costs (YTD) {display as £}"
                size="small"
              />
            </Box>
            {/* <Box
              // gridArea="main"
              border="bottom"
              direction="row"
              align="center"
              padding="20px"
              size="large"
              backgroundColor="brandLight"
            ></Box> */}
            <Bar
              cols={[
                // { qField: "Year", qLabel: "Year" },
                {
                  qField: "[Claim Notification Date.autoCalendar.Year]",
                  qLabel: "Claim Year",
                },
                {
                  qField: "[Claim Type]",
                  qLabel: "Claim Type",
                },
                {
                  qField:
                    "=Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1} > } [ClaimCounter] )",
                  qLabel: "Claims Opened (All Yrs YTD)",
                },
              ]}
              stacked={true}
              suppressZero={true}
              // showLegend={false}
              textOnAxis="xAxis"
            />
            <Column
              // notes :
              // can we use master item Claim Type Drill-down by Claim Occurrence Year // qLibraryId
              // can we use function in dimension - Year([Claim Occurrence Date])
              cols={[
                {
                  // qField: "=Year([Claim Occurrence Date])",
                  qField: "[Claim Occurrence Date]",
                  qLabel: "Claim Type Drill-down by Claim Occurrence Year",
                },
                {
                  qField: "=Sum([Total Claim Cost])",
                  qLabel: "Total Claim Cost",
                },
              ]}
              suppressZero={true}
              title="Total Claims Cost by Claims Type (Drill Down)"
            />
            <Bar
              cols={[
                { qField: "[Vehicle Type]", qLabel: "Vehicle Type" },
                // { qField: "[Claim Type]", qLabel: "Claim Type" },
                {
                  qField: "=Sum({[State 1]}[Total Claim Cost])",
                  qLabel: "Total Claim Costs",
                },
              ]}
              suppressZero={true}
              showLegend={false}
              suppressScroll={true}
              title={"Total claim costs..."}
              // subTitle={
              //   "Choose the selector on the left to see the costs for different dimensions"
              // }
            />
            <Pie
              cols={[
                { qField: "[Claim Type]", qLabel: "Claim Type" },
                {
                  qField: "=Sum({[State 1]}[Total Claim Cost])",
                  qLabel: "Total Claim Costs",
                },
              ]}
              suppressZero={true}
            />
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
