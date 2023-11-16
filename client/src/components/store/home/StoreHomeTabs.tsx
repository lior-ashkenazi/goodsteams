import { useState } from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme, ThemeProvider } from "@mui/material";
import StoreHomeTab from "./StoreHomeTab";

const tabTheme = createTheme({
  components: {
    // Style overrides for Tab component
    MuiTabs: {
      styleOverrides: {
        // The "indicator" is the line that appears under the active tab
        indicator: {
          // Set the background color you want for the indicator here
          backgroundColor: "#22c55e",
        },
      },
    },
  },
});

const StoreHomeTabs = () => {
  const [value, setValue] = useState("1");

  const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={tabTheme}>
      <Box sx={{ width: "42rem", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="store-home-tabs">
              <Tab
                className="normal-case text-green-500"
                label="New & Trending"
                value="1"
              />
              <Tab
                className="normal-case text-green-500"
                label="Top Sellers"
                value="2"
              />
              <Tab
                className="normal-case text-green-500"
                label="Specials"
                value="3"
              />
            </TabList>
          </Box>
          <TabPanel value="1">
            <StoreHomeTab sort="release-date,desc" />
          </TabPanel>
          <TabPanel value="2">
            <StoreHomeTab sort="purchase-count,desc" />
          </TabPanel>
          <TabPanel value="3">
            <StoreHomeTab sort="discount-percent,desc" />
          </TabPanel>
        </TabContext>
      </Box>
    </ThemeProvider>
  );
};

export default StoreHomeTabs;
