'use client'

import React, { useEffect } from "react";
import { useAddUser } from "../../features/Hooks/useAddUser";

export const UserList: React.FC = () => {
    const { users, fetchUsers } = useAddUser(); // useAddUserから必要な変数だけを取得

    useEffect(() => {
        fetchUsers(); // ユーザー情報を取得
    }, [fetchUsers]); // fetchUsersを依存配列に追加して、不要な再実行を防ぐ

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {users.map((user) => (
                <div key={user.id} className="card bg-white shadow-lg w-full flex flex-row justify-between p-8 px-12 md:p-10">
                    <p className="font-bold text-2xl">{user.name}</p>
                    <p className="text-xl">{user.status}</p>
                </div>
            ))}
        </div>
    );
};
