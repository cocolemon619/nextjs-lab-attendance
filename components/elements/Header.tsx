import React from "react";

export default function Header() {
    return (
        <div className="navbar bg-neutral fixed top-0 z-50">
            <div className="navbar-start"></div>
            <div className="navbar-center">
                <a className="text-neutral-content text-xl font-bold">時計をここに置きたい</a>
            </div>
            <div className="navbar-end"></div>
        </div>
    )
}