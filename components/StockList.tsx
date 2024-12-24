import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function StockList({ stocks, selectedDate, onSelectDate, onEditStock, onDeleteStock, currentUser, selectedUser }) {
  const [editingStock, setEditingStock] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', cost: '', close: '' });

  const uniqueDates = [...new Set(stocks.map(stock => stock.date))].sort();
  const filteredStocks = selectedDate === 'all' 
    ? stocks 
    : stocks.filter(stock => stock.date === selectedDate);

  const startEdit = (stock) => {
    setEditingStock(stock.id);
    setEditFormData({
      name: stock.name,
      cost: stock.cost,
      close: stock.close
    });
  };

  const saveEdit = (stockId) => {
    onEditStock(stockId, editFormData);
    setEditingStock(null);
  };

  const cancelEdit = () => {
    setEditingStock(null);
    setEditFormData({ name: '', cost: '', close: '' });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">股票记录</h2>
        <Select value={selectedDate} onValueChange={onSelectDate}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="选择日期" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有日期</SelectItem>
            {uniqueDates.map(date => (
              <SelectItem key={date} value={date}>{date}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">日期</th>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">股票名称</th>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">成本价</th>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">收盘价</th>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">收益率 (%)</th>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">权重 (%)</th>
              <th className="p-2 border text-left bg-gray-50 text-gray-900">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-2 border text-center text-gray-500">
                  暂无数据
                </td>
              </tr>
            ) : (
              filteredStocks.reduce((acc, stock) => {
                if (!acc.find(item => item.date === stock.date)) {
                  acc.push({
                    id: `summary-${stock.date}`,
                    date: stock.date,
                    isSummary: true,
                    dailyReturn: stock.dailyReturn
                  });
                }
                acc.push(stock);
                return acc;
              }, []).map(row => (
                row.isSummary ? (
                  <tr key={row.id} className="bg-gray-100 font-semibold">
                    <td className="p-2 border text-gray-900">{row.date}</td>
                    <td className="p-2 border text-center text-gray-900" colSpan={5}>
                      当日收益率：{row.dailyReturn}%
                    </td>
                    <td className="p-2 border text-gray-900"></td>
                  </tr>
                ) : (
                  <tr key={row.id}>
                    <td className="p-2 border text-gray-900">{row.date}</td>
                    <td className="p-2 border text-gray-900">
                      {editingStock === row.id ? (
                        <Input
                          value={editFormData.name}
                          onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                        />
                      ) : (
                        row.name
                      )}
                    </td>
                    <td className="p-2 border text-gray-900">
                      {editingStock === row.id ? (
                        <Input
                          type="number"
                          value={editFormData.cost}
                          onChange={(e) => setEditFormData({ ...editFormData, cost: e.target.value })}
                        />
                      ) : (
                        row.cost
                      )}
                    </td>
                    <td className="p-2 border text-gray-900">
                      {editingStock === row.id ? (
                        <Input
                          type="number"
                          value={editFormData.close}
                          onChange={(e) => setEditFormData({ ...editFormData, close: e.target.value })}
                        />
                      ) : (
                        row.close
                      )}
                    </td>
                    <td className="p-2 border text-gray-900">{row.return?.toFixed(2)}%</td>
                    <td className="p-2 border text-gray-900">{row.weight}%</td>
                    <td className="p-2 border text-gray-900">
                      {editingStock === row.id ? (
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => saveEdit(row.id)}>
                            保存
                          </Button>
                          <Button variant="ghost" size="sm" onClick={cancelEdit}>
                            取消
                          </Button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => startEdit(row)}
                            disabled={currentUser.id !== selectedUser.id}
                          >
                            编辑
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => onDeleteStock(row.id)}
                            disabled={currentUser.id !== selectedUser.id}
                          >
                            删除
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

