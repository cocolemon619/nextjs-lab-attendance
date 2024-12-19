import { useState } from 'react';
import supabase from '@/utils/supabase'; // Supabaseクライアントをインポート

export const useUserStatus = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 指定したユーザーのstatusを更新する
    const updateStatus = async (userId: number, status: string) => {
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase
                .from('users')
                .update({ status }) // 更新するフィールド
                .eq('id', userId); // 条件：id を整数型として指定

            if (error) {
                console.error('Supabase Error:', error.message);
                setError('ステータスの更新に失敗しました: ' + error.message);
                return false;
            }

            return true;
        } catch (err) {
            console.error('Unexpected Error:', err);
            setError('予期しないエラーが発生しました');
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { updateStatus, loading, error };
};
