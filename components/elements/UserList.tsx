'use client'

import React, { useEffect } from "react";
import { useAddUser } from "../../features/Hooks/useAddUser";

export const UserList: React.FC = () => {
    const { users, fetchUsers } = useAddUser(); // useAddUserから必要な変数だけを取得

    useEffect(() => {
        fetchUsers(); // ユーザー情報を取得
    }, [fetchUsers]); // fetchUsersを依存配列に追加して、不要な再実行を防ぐ

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
