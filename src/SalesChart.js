import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ data }) => {
  // We format the data so the chart understands it
  const chartData = data
    .map((sale) => ({
      name: new Date(sale.date).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      amount: sale.totalAmount,
    }))
    .reverse(); // Reverse so oldest is on left, newest on right

  return (
    <div className="w-full h-full">
      <h3 className="text-gray-600 font-semibold mb-4">Sales Performance</h3>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#4f46e5"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
