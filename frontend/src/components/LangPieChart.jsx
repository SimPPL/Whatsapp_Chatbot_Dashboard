import { Box, Card, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import api from '../service/api';

const COLORS = ['green', 'red']; // Define colors for each sector of the pie chart

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const LangPieChart = () => {
  const [langCount, setLangCount] = useState([]);

  useEffect(() => {
    api.get("languageCount")
      .then(res => setLangCount(res.data))
      .catch(err => console.log(err))

  }, [])
  return (
    <Card height={230}>
      <Box>
        {/* <ResponsiveContainer width="100%" height={170}> */}
        <Heading size='md' align='center'>Language usage</Heading>
        <PieChart width={300} height={200}>
          <Pie
            data={langCount}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            scale={10}
          >
            {langCount.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        {/* </ResponsiveContainer> */}
      </Box>
    </Card>
  );
};

export default LangPieChart;
