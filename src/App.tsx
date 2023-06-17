import React, {JSX, useState} from 'react'
import SongList from "./components/SongList"
import Header from "./components/Header";
import Queue from "./components/Queue";

type Tab = "songs" | "queue"


function SelectComponent(tab: Tab): JSX.Element {
    switch (tab) {
        default:
            return <div/>
        case "songs":
            return <SongList/>
        case "queue":
            return <Queue/>
    }
}


function App() {
    let startValue = process.env.REACT_APP_DEFAULT_TAB as Tab
    if (startValue === undefined) {
        startValue = "songs"
    }
    const [tab, setTab] = useState<Tab>(startValue)

    return (
        <div className="App">
            <Header
                onQueueTab={() => {setTab("queue")}}
                onSongTab={() => {setTab("songs")}}
            />
            {SelectComponent(tab)}
        </div>
    )
}

export default App
