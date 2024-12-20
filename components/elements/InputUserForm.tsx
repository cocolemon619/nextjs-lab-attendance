'use client'

import React, { useState } from "react";
import { useAddUser } from "../../features/Hooks/useAddUser";

export const InputUserForm: React.FC = () => {
    const [name, setName] = useState("");
    const { pushUser, loading, error } = useAddUser(); // pushUser 関数を呼び出す

    // e の型を React.FormEvent<HTMLFormElement> に指定
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // フォームのデフォルト動作を防止
        setName(""); // フォームをリセット
        await pushUser(name); // ユーザー追加
    };

    return (
        <form onSubmit={handleSubmit} className="text-center">
            <label className="input input-bordered flex items-center gap-2 w-96 mx-auto">
                <input
                    type="text"
                    className="grow bg-red-300"
                    placeholder="Add" value={name}
                    onChange={(event) => setName(event.target.value)}
                    disabled={loading} />
            </label>

            <button
                type="submit"
                className="btn btn-active btn-accent text-white text-base mx-auto mt-2"
                disabled={loading}>追加</button>
            {loading && <p>ローディング中...</p>}  {/* ローディング中に表示 */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーメッセージ */}
        </form>
    );
};
