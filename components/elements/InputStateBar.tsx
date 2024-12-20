'use client';

import { useState, useEffect } from 'react';
import { Status } from '@/types'; // types/index.ts から Status 型をインポート
import { useUserStatus } from '@/features/Hooks/useInsertStatus'; // 状態更新のフックをインポート
import supabase from '@/utils/supabase'; // Supabase クライアントをインポート

interface User {
    id: number; // ユーザーのID
    name: string; // ユーザーの名前
}

export default function InputStateBar() {
    const [rangeValue, setRangeValue] = useState(0);
    const [users, setUsers] = useState<User[]>([]); // ユーザー一覧を格納
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // 選択されたユーザーID
    const statusOptions: Status[] = ["在室", "授業", "外出", "食事", "学内", "帰宅"];
    const { updateStatus, loading, error } = useUserStatus();

    // ユーザー一覧を取得
    useEffect(() => {
        const fetchUsers = async () => {
            const { data, error } = await supabase.from('users').select('id, name');
            if (error) {
                console.error('ユーザーの取得に失敗しました:', error.message);
            } else if (data) {
                setUsers(data as User[]);
            }
        };

        fetchUsers();
    }, []);

    const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRangeValue(Number(e.target.value));
    };

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserId(Number(e.target.value));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedUserId === null) {
            alert('ユーザーを選択してください。');
            return;
        }

        const selectedStatus = statusOptions[rangeValue];
        const success = await updateStatus(selectedUserId, selectedStatus);

        if (success) {
            console.log(`ユーザー ${selectedUserId} のステータスが更新されました: ${selectedStatus}`);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='card w-full bg-white p-6 shadow-lg gap-8 hidden md:p-9 md:flex md:flex-col'>
                {/* ユーザー選択 */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">ユーザーを選択</span>
                    </label>
                    <select
                        className="select select-bordered text-lg"
                        onChange={handleUserChange}
                        value={selectedUserId ?? ''}
                    >
                        <option value="" disabled>
                            ユーザーを選択してください
                        </option>
                        {users.map((user) => (
                            <option
                                className="text-lg"
                                key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 状態選択 */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">現在の状態</span>
                    </label>
                    <input
                        type="range"
                        min="0"
                        max={statusOptions.length - 1}
                        value={rangeValue}
                        onChange={handleRangeChange}
                        className="range range-nutral"
                        step="1"
                        name="status"
                    />
                    <div className="flex w-full justify-between px-2 text-xs">
                        {statusOptions.map((status, index) => (
                            <span className="text-lg" key={index}>
                                {status}
                            </span>
                        ))}
                    </div>
                </div>

                {/* 送信ボタン */}
                <button type="submit" className="btn btn-neutral" disabled={loading}>
                    {loading ? '更新中...' : '更新'}
                </button>

                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
            <button className="btn btn-circle btn-neutral size-16 fixed bottom-0 right-0 z-50 m-10 shadow-xl md:hidden"
                onClick={() => {
                    const modal = document.getElementById('inputStatus_modal') as HTMLDialogElement | null;
                    if (modal) {
                        modal.showModal();
                    } else {
                        console.error('Modal element not found');
                    }
                }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"><path fill="currentColor" d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
                </svg>
            </button>

            <dialog id="inputStatus_modal" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                        {/* ユーザー選択 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">ユーザーを選択</span>
                            </label>
                            <select
                                className="select select-bordered text-lg"
                                onChange={handleUserChange}
                                value={selectedUserId ?? ''}
                            >
                                <option value="" disabled>
                                    ユーザーを選択してください
                                </option>
                                {users.map((user) => (
                                    <option
                                        className="text-lg"
                                        key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* 状態選択 */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">現在の状態</span>
                            </label>
                            <input
                                type="range"
                                min="0"
                                max={statusOptions.length - 1}
                                value={rangeValue}
                                onChange={handleRangeChange}
                                className="range range-nutral"
                                step="1"
                                name="status"
                            />
                            <div className="flex w-full justify-between px-2 text-xs">
                                {statusOptions.map((status, index) => (
                                    <span className="text-lg" key={index}>
                                        {status}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* 送信ボタン */}
                        <button type="submit" className="btn btn-neutral" disabled={loading}>
                            {loading ? '更新中...' : '更新'}
                        </button>

                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </>
    );
}
