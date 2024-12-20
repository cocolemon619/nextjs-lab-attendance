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
        <div className="mx-auto">
            <button className="btn btn-neutral text-white btn-lg"
                onClick={() => {
                    const modal = document.getElementById('inputUser_modal') as HTMLDialogElement | null;
                    if (modal) {
                        modal.showModal();
                    } else {
                        console.error('Modal element not found');
                    }
                }}>
                ユーザーの追加</button>
            <dialog id="inputUser_modal" className="modal">
                <div className="modal-box">
                    <h1 className="text-2xl font-bold text-center py-3">ユーザー新規登録</h1>
                    <form onSubmit={handleSubmit} className="text-center">
                        <label className="input input-bordered flex items-center gap-2 w-full mx-auto">
                            <input
                                type="text"
                                className="grow bg-red-300"
                                placeholder="ユーザー名を入力してね" value={name}
                                onChange={(event) => setName(event.target.value)}
                                disabled={loading} required />
                        </label>

                        <button
                            type="submit"
                            className="btn btn-active btn-neutral text-white text-base mx-auto mt-2"
                            disabled={loading}>追加</button>
                        {loading && <p>ローディング中...</p>}  {/* ローディング中に表示 */}
                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーメッセージ */}
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};
