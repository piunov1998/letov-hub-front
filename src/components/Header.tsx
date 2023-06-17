import "../css/Header.css"
// @ts-ignore
import logo from "../img/logo.png"
import React, {useState} from "react";

type headerProps = {
    onSongTab(): void
    onQueueTab(): void
}

type Tab = "songs" | "queue"


function Header(props: headerProps) {
    const [activeTab, setActiveTab] = useState<Tab>("queue")

    return (
        <header className="header">
            <img src={logo} alt="Letov the punk"/>
            <button
                className={activeTab==="songs" ? "active-tab":""}
                onClick={() => {setActiveTab("songs"); props.onSongTab()}}
            >Songs</button>
            <button
                className={activeTab==="queue" ? "active-tab":""}
                onClick={() => {setActiveTab("queue"); props.onQueueTab()}}
            >Queue</button>
        </header>
    )
}

export default Header