import Song, {songProps} from "./Song";
import React from "react";
import axios from "axios";
import "../css/SongList.css"

type songListState = {
    songs: songProps[]
}

class SongList extends React.Component<any, songListState> {
    constructor(props: any) {
        super(props)
        this.state = {
            songs: []
        }
        this.getSongs()
    }

    getSongs(): songProps[] {
        let songs: songProps[] = []
        const url = `${process.env.REACT_APP_HOST}/api/songs`
        axios.get<songProps[]>(url, {withCredentials: true}).then((response) => {
            this.setState({songs: response.data})
        })
        return songs
    }

    render() {
        return (
            <div className="song-list">{this.state.songs.map((song: songProps) => (
                <Song id={song.id} name={song.name} source={song.source} key={song.id}/>
            ))}</div>
        )
    }
}


export default SongList