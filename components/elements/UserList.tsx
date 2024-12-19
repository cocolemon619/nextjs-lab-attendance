'use client'

import React, { useEffect } from "react";
import { useAddUser } from "../../features/Hooks/useAddUser";

export const UserList: React.FC = () => {
    // const { users } = useAddUser(); // ユーザーリストを取得
    const { users, pushUser, fetchUsers, loading, error } = useAddUser();
    useEffect(() => {
        // console.log(users);
        fetchUsers()
    })

    return (
        <div>
            {/* <ul>
                {users.map((user) => (
                    <li key={user.id} >{user.name}:{user.status}</li>
                ))}
            </ul> */}
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
