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
    expanded: boolean
}

class Song extends React.Component<songProps, songState> {

    initName = ""

    constructor(props: songProps) {
        super(props)
        this.state = {
            name: props.name,
            renamed: false,
            expanded: false,
        }
        this.initName = props.name

        this.onChange = this.onChange.bind(this)
        this.onKeyPressed = this.onKeyPressed.bind(this)
    }

    onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key !== "Enter") return
        this.Rename(this.state.name)
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.currentTarget.value})

        if (event.currentTarget.value === this.initName) {
            this.setState({renamed: false, expanded: false})
        } else {
            this.setState({renamed: true, expanded: true})
        }
    }

    Rename(newName: string) {
        const url = `${process.env.REACT_APP_HOST}/api/songs/${this.props.id}/rename`
        axios.post(url, {"name": newName}, {withCredentials: true}).then((response) => {
            if (response.status !== 204) {
                alert("Error during rename")
            }
            this.setState({renamed: false})
            this.initName = newName
            setTimeout(() => {
                this.setState({expanded: false})
            }, 1000)
        })
    }

    render() {
        return <div className="song">
            <label className="song-number">{this.props.id}</label>
            <div className="song-name">
                <input
                    defaultValue={this.state.name}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPressed}
                />
                <label
                    className={"song-status" + (this.state.renamed ? " song-status-not-saved" : " song-status-saved")}
                    hidden={!this.state.expanded}
                >{this.state.renamed ? "press Enter to save changes" : "Saved!"}</label>
            </div>
            <a className="song-source" href={this.props.source}>YT link</a>
        </div>
    }
}

export default Song
