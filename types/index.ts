// types/index.ts

// User 型定義
export type User = {
    id: number;      // INTEGER 型に対応
    name: string;    // TEXT 型に対応
    status: Status | string;  // TEXT 型に対応
};

export type Status = "在室" | "授業" | "外出" | "食事" |  "学内" | "帰宅";