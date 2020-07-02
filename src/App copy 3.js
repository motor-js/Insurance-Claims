import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Grid,
  Box,
  SmartHeading,
  Sidebar,
  useScreenSize,
  useSidebar,
  KPI,
  Column,
  Bar,
  Pie,
} from "juno-ui/dist";
import { Menu } from "@styled-icons/feather";

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
      return <Box gridArea="sidebar" backgroundColor="brand"></Box>;
    }
  };

  return (
    <Grid rows={["60px", "auto", "40px"]} columns={cols} areas={areas}>
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
        <div>Motor Starter Dashboard</div>
      </Box>
      <div style={{ display: "flex", backgroundColor: "#eeefff" }}>
        <div style={{ "flex-direction": "column", width: "100%" }}>
          <div style={{ display: "flex" }}>
            <KPI
              margin="10px"
              cols={[
                "=Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1} ,[Claim Notification Date.autoCalendar.YearsAgo]={0} > } [ClaimCounter] )",
              ]}
              label="Claims Opened (YTD)"
              size="small"
            />
            <KPI
              margin="10px"
              cols={[
                "=Sum( { $< [Claim Settled Date.autoCalendar.InYTD]={1} ,[Claim Settled Date.autoCalendar.YearsAgo]={0} > } [ClaimCounter] )",
              ]}
              label="Claims Settled (YTD)"
              size="small"
            />{" "}
            <KPI
              margin="10px"
              cols={[
                {
                  qField:
                    "=Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1}, [Claim Notification Date.autoCalendar.YearsAgo]={0} > } [Total Claim Cost])/1000000",
                  qLabel: "Margin Amount",
                  qNumFormat: {
                    qType: "M",
                    qnDec: 0,
                    qUseThou: 1,
                    qFmt: "£#,##0",
                    qDec: ".",
                    qThou: ",",
                  },
                },
              ]}
              roundNum={false}
              label="Claim Payments (YTD)"
              size="small"
            />
            <KPI
              margin="10px"
              cols={[
                {
                  qField:
                    "=Avg( { $< [Claim Notification Date.autoCalendar.InYTD]={1} ,[Claim Notification Date.autoCalendar.YearsAgo]={0} > } [Total Claim Cost])",
                  qNumFormat: {
                    qType: "M",
                    qnDec: 0,
                    qUseThou: 1,
                    qFmt: "£#,##0",
                    qDec: ".",
                    qThou: ",",
                  },
                },
              ]}
              roundNum={false}
              label="Ave Claim Costs (YTD)"
              size="small"
            />
          </div>
          <div
            style={{
              display: "flex",
              "flex-flow": "row wrap",
              // margin: "32px 0",
            }}
          >
            <div
              style={{
                margin: "0 5px",
                "flex-basis": "calc(50% - 10px)",
              }}
            >
              <Bar
                cols={[
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
                // suppressScroll={true}
                textOnAxis="xAxis"
              />
            </div>
            <div
              style={{
                margin: "0 5px",
                "flex-basis": "calc(50% - 10px)",
              }}
            >
              <Column
                cols={[
                  {
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
            </div>
            <div
              style={{
                margin: "0 5px",
                "flex-basis": "calc(50% - 10px)",
              }}
            >
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
            </div>
            <div
              style={{
                margin: "0 5px",
                "flex-basis": "calc(50% - 10px)",
              }}
            >
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
            </div>
          </div>
        </div>
      </div>
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
    </Grid>
  );
}

export default App;
