'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginForm from './LoginForm';
import StockForm from './StockForm';
import StockList from './StockList';
import ReturnChart from './ReturnChart';
import UserSelector from './UserSelector';

export default function StockTracker() {
  const [users, setUsers] = useState([
    { id: 1, username: 'test', password: 'test' }
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [stocks, setStocks] = useState([]);
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const loginUser = (username, password) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setSelectedUser(user);
    } else {
      alert('用户名或密码错误');
    }
  };

  const registerUser = (username, password) => {
    if (username && password) {
      const newUser = { username, password, id: Date.now() };
      setUsers([...users, newUser]);
      setCurrentUser(newUser);
      setSelectedUser(newUser);
      alert('注册成功！');
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setSelectedUser(null);
  };

  const addStock = (newStock) => {
    const stockData = {
      ...newStock,
      id: Date.now(),
      userId: currentUser.id,
      date: new Date().toISOString().split('T')[0]
    };
    setStocks([...stocks, stockData]);
  };

  const editStock = (stockId, editedData) => {
    setStocks(stocks.map(stock =>
      stock.id === stockId ? { ...stock, ...editedData } : stock
    ));
  };

  const deleteStock = (stockId) => {
    setStocks(stocks.filter(stock => stock.id !== stockId));
  };

  const calculateReturns = () => {
    if (!selectedUser) return [];
    const userStocks = stocks.filter(s => s.userId === selectedUser.id);
    
    const dailyReturns = userStocks.reduce((acc, stock) => {
      if (!acc[stock.date]) {
        acc[stock.date] = {
          totalReturn: 0,
          count: 0,
          stocks: []
        };
      }
      const returnRate = ((parseFloat(stock.close) - parseFloat(stock.cost)) / parseFloat(stock.cost)) * 100;
      acc[stock.date].totalReturn += returnRate;
      acc[stock.date].count += 1;
      acc[stock.date].stocks.push({
        ...stock,
        returnRate
      });
      return acc;
    }, {});

    const stocksWithReturns = [];
    Object.entries(dailyReturns).forEach(([date, data]) => {
      const weight = 100 / data.count;
      const dailyTotalReturn = data.stocks.reduce((sum, stock) => {
        return sum + (stock.returnRate * (weight / 100));
      }, 0);

      data.stocks.forEach(stock => {
        stocksWithReturns.push({
          ...stock,
          return: stock.returnRate,
          weight: weight.toFixed(2),
          dailyReturn: dailyTotalReturn.toFixed(2),
          stockCount: data.count
        });
      });
    });

    return stocksWithReturns.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const userReturns = calculateReturns();

  if (!currentUser) {
    return <LoginForm onLogin={loginUser} onRegister={registerUser} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">欢迎回来，{currentUser.username}</h1>
        <div className="flex items-center space-x-4">
          <UserSelector 
            users={users}
            currentUser={currentUser}
            selectedUser={selectedUser}
            onSelectUser={setSelectedUser}
          />
          <Button variant="outline" onClick={logoutUser}>退出登录</Button>
        </div>
      </div>

      {selectedUser && selectedUser.id === currentUser.id && (
        <StockForm onAddStock={addStock} />
      )}
      <StockList 
        stocks={userReturns} 
        selectedDate={selectedDate} 
        onSelectDate={setSelectedDate}
        onEditStock={editStock}
        onDeleteStock={deleteStock}
        currentUser={currentUser}
        selectedUser={selectedUser}
      />
      <ReturnChart returns={userReturns} selectedUser={selectedUser} />
    </div>
  );
}

