import { PieChart, Pie, Cell } from 'recharts';
import { useEffect, useState } from 'react';
import { Box, Card, Heading } from '@chakra-ui/react';
import api from '../service/api';

const ResponsesPie = () => {
  const [donutChartData, setDonutChartData] = useState([]);

  useEffect(() => {
    api.get('/') // Assuming you have an endpoint to get all responses
      .then((res) => {
        const responses = res.data;
        const r = responses.data;
        const dontKnowCount = r.filter(response => response.answer === "I cannot answer that.").length;
        const data = [
          { name: 'I cannot answer that.', value: dontKnowCount },
          { name: 'Others', value: r.length - dontKnowCount }
        ];
        setDonutChartData(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Card>
    <Box>
        <Heading size='md' align='center'>Answers Provided</Heading>
      <PieChart width={300} height={200}>
        <Pie
          data={donutChartData}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          fill="#8884d8"
          label
        >
          {donutChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.name === "I cannot answer that." ? 'orange' : 'green'} />
          ))}
        </Pie>
      </PieChart>
      </Box>
      </Card>
  );
};

export default ResponsesPie;
