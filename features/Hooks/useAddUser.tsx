import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";
import { User } from "@/types";

export const useAddUser = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false); // ローディング状態
    const [error, setError] = useState<string | null>(null); // エラーメッセージ

    const fetchUsers = async () => {
        const { data, error } = await supabase.from("users").select("*");
        if (error) {
            console.error("Error fetching users:", error.message);
        } else {
            setUsers(data || []); // DBからデータを取得
        }
    };

    const pushUser = async ( name : string ) => {
        setLoading(true); // ユーザー追加前にローディング開始
        setError(null); // エラーメッセージリセット

        // ユーザー追加処理
        const { data, error } = await supabase.from('users').insert({ name:name,status:"在室" });

        if (error) {
            setError("ユーザー追加に失敗しました: " + error.message); // エラーメッセージを設定
        } else {
            await fetchUsers(); // ユーザー追加後に再度DBからデータをフェッチ
        }

        setLoading(false); // ローディング終了
    };

    return { users, fetchUsers, pushUser, loading, error };
};
