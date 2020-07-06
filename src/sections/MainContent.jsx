import React from "react";
import {
  Box,
  useScreenSize,
  CurrentSelections,
  KPI,
  Bar,
  Column,
  Pie,
} from "motor-ui";

const MainContent = () => {
  const { screen } = useScreenSize();

  let flexDirection = "column";
  if (screen === "desktop" || screen === "largeDesktop") flexDirection = "row";

  const boxProps = {
    backgroundColor: "white",
    border: "dashed",
    margin: "5px",
  };

  const dynamicWidth = "calc(50% - 10px)";

  return (
    <Box padding="10px" width="100%" overflow="scroll" direction="column">
      <CurrentSelections minHeight="60px" width="100%" />
      <Box width="100%" direction={flexDirection}>
        <Box
          flex={true}
          height="120px"
          {...boxProps}
          border={{ color: "brand" }}
          borderRadius="8px"
        >
          <KPI
            margin="10px"
            cols={[
              "=Sum( { $< [Claim Notification Date.autoCalendar.InYTD]={1} ,[Claim Notification Date.autoCalendar.YearsAgo]={0} > } [ClaimCounter] )",
            ]}
            label="Claims Opened (YTD)"
            size="small"
            border={false}
            backgroundColor="white"
            // border={false}
          />
        </Box>
        <Box
          flex={true}
          height="120px"
          {...boxProps}
          border={{ color: "brand" }}
          borderRadius="8px"
        >
          <KPI
            margin="10px"
            cols={[
              "=Sum( { $< [Claim Settled Date.autoCalendar.InYTD]={1} ,[Claim Settled Date.autoCalendar.YearsAgo]={0} > } [ClaimCounter] )",
            ]}
            label="Claims Settled (YTD)"
            size="small"
            border={false}
          />
        </Box>
        <Box
          flex={true}
          height="120px"
          {...boxProps}
          border={{ color: "brand" }}
          borderRadius="8px"
        >
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
            border={false}
          />
        </Box>
        <Box
          flex={true}
          height="120px"
          {...boxProps}
          border={{ color: "brand" }}
          borderRadius="8px"
        >
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
            border={false}
            // border={{ color: brand }}
            // backgroundColor="white"
          />
        </Box>
      </Box>

      <Box width="100%" flex="grow" wrapProp={true}>
        <Box width={dynamicWidth} {...boxProps}>
          <Bar
            height="315px"
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
        </Box>
        <Box width={dynamicWidth} {...boxProps}>
          <Column
            height="315px"
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
        </Box>
        <Box width={dynamicWidth} {...boxProps}>
          <Bar
            height="315px"
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
            title={"Total claim cost"}
            // subTitle={
            //   "Choose the selector on the left to see the costs for different dimensions"
            // }
          />
        </Box>
        <Box width={dynamicWidth} {...boxProps}>
          {" "}
          <Pie
            height="315px"
            cols={[
              { qField: "[Claim Type]", qLabel: "Claim Type" },
              {
                qField: "=Sum({[State 1]}[Total Claim Cost])",
                qLabel: "Total Claim Costs",
              },
            ]}
            suppressZero={true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MainContent;
