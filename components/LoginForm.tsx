import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginForm({ onLogin, onRegister }) {
  const [loginInfo, setLoginInfo] = useState({ username: '', password: '' });
  const [newUser, setNewUser] = useState({ username: '', password: '' });
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = () => {
    onLogin(loginInfo.username, loginInfo.password);
  };

  const handleRegister = () => {
    onRegister(newUser.username, newUser.password);
    setNewUser({ username: '', password: '' });
    setShowRegister(false);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">重生之-股神归来</h1>
        <div className="space-y-4">
          <Input
            placeholder="用户名"
            value={loginInfo.username}
            onChange={e => setLoginInfo({ ...loginInfo, username: e.target.value })}
          />
          <Input
            type="password"
            placeholder="密码"
            value={loginInfo.password}
            onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })}
          />
          <Button className="w-full" onClick={handleLogin}>登录</Button>
          {!showRegister && (
            <Button variant="outline" className="w-full" onClick={() => setShowRegister(true)}>
              注册新账户
            </Button>
          )}
        </div>

        {showRegister && (
          <div className="mt-6 pt-6 border-t space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">注册新账户</h2>
            <Input
              placeholder="用户名"
              value={newUser.username}
              onChange={e => setNewUser({ ...newUser, username: e.target.value })}
            />
            <Input
              type="password"
              placeholder="密码"
              value={newUser.password}
              onChange={e => setNewUser({ ...newUser, password: e.target.value })}
            />
            <div className="flex space-x-2">
              <Button onClick={handleRegister}>创建账户</Button>
              <Button variant="outline" onClick={() => setShowRegister(false)}>取消</Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

