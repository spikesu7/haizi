import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

export default function ReturnChart({ returns, selectedUser }) {
  const chartData = returns.filter((v, i, a) => 
    a.findIndex(t => t.date === v.date) === i
  );

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        {selectedUser.username} 的收益曲线
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip formatter={(value) => value + '%'} />
            <Line 
              type="monotone" 
              dataKey="dailyReturn" 
              stroke="#8884d8" 
              name="日收益率"
              dot={{ r: 4 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

