import { Heading } from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";
import api from "../service/api";


const blues = [
  ["#457AA6"],
  ["#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#E3EBF2"],
  ["#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"],
  ["#1A334A", "#264F73", "#457AA6", "#A2BBD2", "#E3EBF2"]
];

const getColor = (length, index) => {
  if (length <= blues.length) {
    return blues[length - 1][index];
  }

  return blues[blues.length - 1][index % blues.length];
};


// eslint-disable-next-line react/prop-types
const YAxisLeftTick = ({ y, payload: { value } }) => {
  return (
    <text x={0} y={y} textAnchor="start" >
      {value}
    </text>
  );
};

let ctx;

const measureText14HelveticaNeue = text => {
  if (!ctx) {
    ctx = document.createElement("canvas").getContext("2d");
    ctx.font = "14px 'Helvetica Neue";
  }

  return ctx.measureText(text).width;
};

const BAR_AXIS_SPACE = 10;

const FAQTable = () => {
  const yKey = "freq"
  const xKey = "question"
  const [freq, setFreq] = useState([]);
  useEffect(() => {
    api.get('quesfreq')
    .then((res)=> {
      const response = res.data;
      const a = response.data;
      setFreq(a.slice(0, 10))
    })
    .catch((err) => console.log(err))
    
  }, [])


  const maxTextWidth = useMemo(
    () =>
      freq.reduce((acc, cur) => {
        const value = cur[yKey];
        const width = measureText14HelveticaNeue(value.toLocaleString());
        if (width > acc) {
          return width;
        }
        return acc;
      }, 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [freq, yKey]
  );

  return (
    <>
      <Heading size='lg' align='center' mb={10}>Most Asked Questions</Heading>
    <ResponsiveContainer width={"100%"} height={50 * freq.length} debounce={50}>
      <BarChart
        data={freq}
        layout="vertical"
        margin={{ left: 350, right: maxTextWidth + (BAR_AXIS_SPACE - 8) }}
      >
        <XAxis hide axisLine={false} type="number" />
        <YAxis
          yAxisId={0}
          dataKey={xKey}
          type="category"
          axisLine={false}
          tickLine={false}
          tick={YAxisLeftTick}
        />
        <Bar dataKey={yKey} minPointSize={2} barSize={32}>
          {freq.map((d, idx) => {
            return <Cell key={d[xKey]} fill={getColor(freq.length, idx)} />;
          })}
        </Bar>
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};

export default FAQTable
