import "../css/Header.css"
// @ts-ignore
import logo from "../img/logo.png"
import React from "react";

type headerProps = {
    onSongTab(): void
    onQueueTab(): void
}

type Tab = "songs" | "queue"

type headerState = {
    activeTab: Tab
}

class Header extends React.Component<headerProps, headerState> {
    constructor(props: headerProps) {
        super(props)
        this.state = {
            activeTab: process.env.REACT_APP_DEFAULT_TAB as Tab
        }
    }

    render() {
        return (
            <header className="header">
                <img src={logo} alt="Letov the punk"/>
                <button
                    className={this.state.activeTab==="songs" ? "active-tab":""}
                    onClick={() => {this.setState({activeTab: "songs"}); this.props.onSongTab()}}
                >Songs</button>
                <button
                    className={this.state.activeTab==="queue" ? "active-tab":""}
                    onClick={() => {this.setState({activeTab: "queue"}); this.props.onQueueTab()}}
                >Queue</button>
            </header>
        )
    }
}

export default Header