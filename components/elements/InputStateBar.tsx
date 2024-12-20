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
        <form onSubmit={handleSubmit}>
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
                    className="range range-primary"
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

            {/* 選択した状態表示 */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">選択した状態</span>
                </label>
                <input
                    type="text"
                    value={statusOptions[rangeValue]}
                    readOnly
                    className="input input-bordered"
                    name="displayStatus"
                />
            </div>

            {/* 送信ボタン */}
            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '更新中...' : '更新'}
            </button>

            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
