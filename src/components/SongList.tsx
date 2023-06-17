import Song, {songProps} from "./Song";
import React, {useState} from "react";
import axios from "axios";
import "../css/SongList.css"

function getSongs(setter: React.Dispatch<React.SetStateAction<songProps[]>>): songProps[] {
    let songs: songProps[] = []
    const url = `${process.env.REACT_APP_HOST}/api/songs`
    axios.get<songProps[]>(url, {withCredentials: true}).then((response) => {
        setter(response.data)
    })
    return songs
}

function SongList() {

    const [songList, setSongList] = useState<songProps[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    if (!loaded) {
        getSongs(setSongList)
        setLoaded(true)
    }

    return (
        <div className="song-list">{songList.map((song: songProps) => (
            <Song id={song.id} name={song.name} source={song.source} key={song.id}/>
        ))}</div>
    )
}

export default SongList