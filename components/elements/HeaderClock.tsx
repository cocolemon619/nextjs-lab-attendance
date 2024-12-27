"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

export default function HeaderClock() {
    const [time, setTime] = useState(dayjs().format("HH:mm:ss"));
    const [date, setDate] = useState(dayjs().format("YYYY/MM/DD"));

    useEffect(() => {
        const interval = setInterval(() => {
            setDate(dayjs().format("YYYY/MM/DD"));
            setTime(dayjs().format("HH:mm:ss"));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            {/* <h1>現在時刻:</h1> */}
            <p className="text-neutral-content text-4xl font-bold">{date} {time}</p>
        </div>
    );
}