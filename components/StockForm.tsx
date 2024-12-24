import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function StockForm({ onAddStock }) {
  const [newStock, setNewStock] = useState({ name: '', cost: '', close: '' });

  const handleAddStock = () => {
    if (newStock.name && newStock.cost && newStock.close) {
      onAddStock(newStock);
      setNewStock({ name: '', cost: '', close: '' });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">添加股票</h2>
      <div className="grid grid-cols-4 gap-4">
        <Input
          placeholder="股票名称"
          value={newStock.name}
          onChange={e => setNewStock({ ...newStock, name: e.target.value })}
        />
        <Input
          type="number"
          placeholder="成本价"
          value={newStock.cost}
          onChange={e => setNewStock({ ...newStock, cost: e.target.value })}
        />
        <Input
          type="number"
          placeholder="收盘价"
          value={newStock.close}
          onChange={e => setNewStock({ ...newStock, close: e.target.value })}
        />
        <Button onClick={handleAddStock}>添加</Button>
      </div>
    </Card>
  );
}

