import "../css/Song.css"
import React from "react";
import axios from "axios";

export type songProps = {
    id: number;
    name: string;
    source: string;
}

type songState = {
    name: string
    renamed: boolean
}

class Song extends React.Component<songProps, songState> {
    constructor(props: songProps) {
        super(props)
        this.state = {
            name: props.name,
            renamed: false
        }
        this.onChange = this.onChange.bind(this)
        this.onKeyPressed = this.onKeyPressed.bind(this)
    }

    onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key !== "Enter") return
        this.Rename(this.state.name)
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.currentTarget.value, renamed: true})
    }

    Rename(newName: string) {
        const url = `${process.env.REACT_APP_HOST}/api/songs/${this.props.id}/rename`
        axios.post(url, {"name": newName}, {withCredentials: true}).then((response) => {
            if (response.status !== 204) {
                alert("Error during rename")
            }
        })
    }

    render() {
        return <div className="song">
            <label className="song-number">{this.props.id}</label>
            <input
                className="song-name"
                defaultValue={this.state.name}
                onChange={this.onChange}
                onKeyPress={this.onKeyPressed}
            ></input>
            <a className="song-source" href={this.props.source}>YT link</a>
        </div>
    }
}

export default Song
