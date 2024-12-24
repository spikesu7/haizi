import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UserSelector({ users, currentUser, selectedUser, onSelectUser }) {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-700">查看用户：</span>
      <Select value={selectedUser?.id.toString()} onValueChange={(value) => onSelectUser(users.find(u => u.id.toString() === value))}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="选择用户" />
        </SelectTrigger>
        <SelectContent>
          {users.map(user => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.username} {user.id === currentUser.id ? '(你)' : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

