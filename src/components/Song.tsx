import "../css/Song.css"
import React from "react";
import axios from "axios";

export type songProps = {
    id: number;
    name: string;
    source: string;
}

type renameStatus = "changed" | "saved" | "forbidden"

type songState = {
    name: string
    renamed: boolean
    expanded: boolean
    renameStatus: renameStatus
}

class Song extends React.Component<songProps, songState> {

    initName = ""

    constructor(props: songProps) {
        super(props)
        this.state = {
            name: props.name,
            renamed: false,
            expanded: false,
            renameStatus: "saved"
        }
        this.initName = props.name

        this.onChange = this.onChange.bind(this)
        this.onKeyPressed = this.onKeyPressed.bind(this)
    }

    onKeyPressed(event: React.KeyboardEvent<HTMLInputElement>) {
        switch (event.key) {
            case "Enter":
                this.Rename(this.state.name)
                return
            case "Escape":
                event.currentTarget.value = this.initName
                event.currentTarget.blur()
                this.setState({
                    name: this.initName,
                    expanded: false,
                    renameStatus: "saved",
                    renamed: false
                })
                return
            default:
                return
        }
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.setState({name: event.currentTarget.value})

        if (event.currentTarget.value === this.initName) {
            this.setState({renamed: false, expanded: false})
        } else {
            this.setState({renamed: true, expanded: true, renameStatus: "changed"})
        }
    }

    Rename(newName: string) {
        if (this.initName === newName) return

        const url = `${process.env.REACT_APP_HOST}/api/songs/${this.props.id}/rename`
        axios.post(url, {"name": newName}, {withCredentials: true})
            .then(response => {
                this.setState({renamed: false, renameStatus: "saved"})
                this.initName = newName
                setTimeout(() => {
                    this.setState({expanded: false})
                }, 1000)
            })
            .catch(error => {
                switch (error.response.status) {
                    case 403:
                        this.setState({renameStatus: "forbidden"})
                }
            })
    }

    getStatusDescription(state: renameStatus): string {
        switch (state) {
            case "changed":
                return "press Enter to save changes"
            case "saved":
                return "Saved!"
            case "forbidden":
                return "you are not allowed to rename songs"
        }
    }

    render() {
        return <div className="song">
            <label className="song-number">{this.props.id}</label>
            <div className="song-name">
                <input
                    defaultValue={this.state.name}
                    onChange={this.onChange}
                    onKeyDown={this.onKeyPressed}
                />
                <label
                    className={"song-status" + (this.state.renamed ? " song-status-not-saved" : " song-status-saved")}
                    hidden={!this.state.expanded}
                >{this.getStatusDescription(this.state.renameStatus)}</label>
            </div>
            <a className="song-source" href={this.props.source}>YT link</a>
        </div>
    }
}

export default Song
