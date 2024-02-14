import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import * as React from "react";
import { useState } from "react";
import { TabPanel } from "../components/TabPanel";
import TrendChart from "../components/TrendChart";
import useReportData from "../hooks/useReportData";
import { tabProps } from "../utils/tabProps";
import { getTrendChartData } from "../utils/getTrendChartData";
import {
  Typography,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function DurationSummery() {
  const [value, setValue] = useState(0);
  const [isToggled, setIsToggled] = useState(false);
  const [durationData, setDurationData] = useState([]);
  const { data } = useReportData();
  const [selectedChartData, setSelectedChartData] = useState([]);
  const objectList = getTrendChartData(data)[0]?.data;

  // Handle trend chart data selection
  const handleChartDataSelection = (event) => {
    const selectedValues = event.target.value;
    if (selectedValues.find((item) => item == "select-all")) {
      setIsToggled((prevState) => !prevState);
      if (isToggled) {
        setSelectedChartData(objectList);
        setDurationData(getTrendChartData(data));
      } else {
        setSelectedChartData([]);
        setDurationData([
          { title: "Feature", data: [] },
          { title: "Scenarios", data: [] },
          { title: "Steps", data: [] },
        ]);
      }
    } else {
      const selectedObjects = objectList.filter((obj) =>
        selectedValues.includes(obj.id)
      );
      setSelectedChartData(selectedObjects);
      const selectedData = getTrendChartData(data).map((duration) => ({
        ...duration,
        data: duration.data.filter((item) => selectedValues.includes(item.id)),
      }));
      setDurationData(selectedData);
    }
  };
  // Tab Navigate...........
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (data) {
      setDurationData(getTrendChartData(data));
    }
  }, [data]);

  return (
    <Box id="trendchart" pt="80px" sx={{ width: "100%" }}>
      <Typography mt={5} my={5} align="center" variant="h2">
        DURATION SUMMERY
      </Typography>
      <Box
        sx={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <Tabs
          textColor="red"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#FCD73C",
              TextColor: "red",
            },
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Feature" {...tabProps(0)} />
          <Tab label="Scenarios" {...tabProps(1)} />
          <Tab label="Steps/Tests" {...tabProps(2)} />
        </Tabs>

        <FormControl sx={{ width: 300, marginLeft: "30px" }}>
          <Typography variant="formlabel">Select By Featues </Typography>
          <Select
            multiple
            value={selectedChartData.map((obj) => obj.id)}
            onChange={handleChartDataSelection}
            renderValue={(selected) =>
              selectedChartData.map((obj) => obj.name).join(", ")
            }
          >
            <MenuItem key="select-all" value="select-all">
              <CheckCircle
                sx={{
                  visibility:
                    selectedChartData?.length === objectList?.length
                      ? "visible"
                      : "hidden",
                  marginRight: "8px",
                }}
              />
              All
            </MenuItem>

            {objectList?.map((obj) => (
              <MenuItem key={obj.id} value={obj.id}>
                <CheckCircle
                  sx={{
                    visibility: selectedChartData
                      .map((obj) => obj.id)
                      .includes(obj.id)
                      ? "visible"
                      : "hidden",
                    marginRight: "8px",
                  }}
                />
                {obj.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {durationData &&
        durationData?.map((duration, index) => (
          <TabPanel value={value} index={index}>
            <TrendChart {...duration} />
          </TabPanel>
        ))}
    </Box>
  );
}
