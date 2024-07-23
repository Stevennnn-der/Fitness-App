import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./WeightChart.css";

const WeightChart = ({ data }) => {
  console.log("dataaaa: ", data)
  const example = [
    { weightDate: "Mon 27", weight: 142 },
    { weightDate: "Tue 28", weight: 145 },
    // Add more data points as needed
  ];
  return (
    <div className="chart-container">
      <LineChart
        width={500}
        height={500}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#CCCCCC" />
        <XAxis
          dataKey="weightDate"
          stroke="#ffffff"
          label={{ value: "Date", position: "insideBottom", offset: -5 }}
        />
        <YAxis
          domain={["dataMin - 1", "dataMax + 1"]}
          stroke="#ffffff" // Color of the Y-axis line
          label={{
            value: "Weight (KG)",
            angle: -90,
            position: "insideLeft",
            offset: -5,
            dy: 60,
          }}
        />
        <Tooltip />
        <Legend
          align="right"
          verticalAlign="top"
          wrapperStyle={{ color: "#FFFFFF", paddingTop: '0.5em', paddingBottom: '0.5em' }}

        />
        <Line
          type="monotone"
          dataKey="weightInKg"
          stroke="#FFFFFF"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default WeightChart;
