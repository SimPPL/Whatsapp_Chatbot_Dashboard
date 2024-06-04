import { useEffect, useState } from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import api from "../service/api";

const CustomerChart = () => {
  const [chartType, setChartType] = useState("monthly"); // Default to monthly chart
  const [monthlyData, setMonthlyData] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);

  const data = chartType === "monthly" ? monthlyData : weeklyData;

  useEffect(() => {
      api.get("monthlyGraphData")
      .then(res => setMonthlyData(res.data)) 
      .catch(err => console.log(err))

  }, [])

  useEffect(() => {
    api.get("weeklyGraphData")
    .then(res => setWeeklyData(res.data)) 
    .catch(err => console.log(err))

}, [])

  return (
    <Box justifyContent={"center"}>
      <Heading size={"lg"} align={'center'} mt='2%'>
        Customer Analytics
      </Heading>
      <Box mt={5} mb={3} display="flex" justifyContent="center">
        <Button
          variant={chartType === "monthly" ? "solid" : "outline"}
          onClick={() => setChartType("monthly")}
          mr={2}
        >
          Monthly
        </Button>
        <Button
          variant={chartType === "weekly" ? "solid" : "outline"}
          onClick={() => setChartType("weekly")}
        >
          Weekly
        </Button>
      </Box>
      <Box mt={2}>
        <ResponsiveContainer width="100%" aspect={2.5}>
          <LineChart data={data}>
            <CartesianGrid />
            <XAxis
              dataKey={chartType === "monthly" ? "monthName" : "dayName"}
              interval={"preserveStartEnd"}
            />
            <YAxis />
            <Legend />
            <Tooltip />
            <Line dataKey="no_of_responses" stroke="black" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default CustomerChart;
