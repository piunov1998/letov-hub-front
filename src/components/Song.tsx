import "../css/Song.css"
import React from "react";
import axios from "axios";
import IconButton from "./IconButton";
// @ts-ignore
import youtubeIcon from "../img/icons/youtube.png"
// @ts-ignore
import deleteIcon from "../img/icons/delete.png"
// @ts-ignore
import queueIcon from "../img/icons/add-to-playlist.png"
import DialogBox from "./Dialog";

export type songProps = {
    id: number
    name: string
    source: string
    selfDestructCallback(): void
}

type renameStatus = "changed" | "saved" | "forbidden"

type songState = {
    name: string
    renamed: boolean
    expanded: boolean
    renameStatus: renameStatus
    deleteConfirmationOpened: boolean
}

const iconsSize = 16

class Song extends React.Component<songProps, songState> {

    initName = ""

    constructor(props: songProps) {
        super(props)
        this.state = {
            name: props.name,
            renamed: false,
            expanded: false,
            renameStatus: "saved",
            deleteConfirmationOpened: false
        }
        this.initName = props.name

        this.onChange = this.onChange.bind(this)
        this.onKeyPressed = this.onKeyPressed.bind(this)
        this.Delete = this.Delete.bind(this)
        this.Queue = this.Queue.bind(this)
        this.showDeletingConfirmation = this.showDeletingConfirmation.bind(this)
        this.hideDeletingConfirmation = this.hideDeletingConfirmation.bind(this)
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

    Delete(): void {
        const url = `${process.env.REACT_APP_HOST}/api/songs/${this.props.id}`
        axios.delete(url, {withCredentials: true})
            .then(()=>{
                this.props.selfDestructCallback()
            })
            .catch(err => {
                switch (err.response?.status) {
                    case 403:
                        alert("Forbidden")
                        return
                    case 404:
                        this.props.selfDestructCallback()
                        return
                }
            })
        this.hideDeletingConfirmation()
    }

    Queue(): void {
        const url = `${process.env.REACT_APP_HOST}/api/songs/${this.props.id}/queue`
        axios.post(url, null, {withCredentials: true})
            .catch(err => {
                switch (err.response?.status) {
                    case 403:
                        alert("Forbidden")
                        return
                    case 404:
                        alert("Song not found")
                        return
                }
            })
    }

    showDeletingConfirmation(): void {
        this.setState({deleteConfirmationOpened: true})
    }

    hideDeletingConfirmation(): void {
        this.setState({deleteConfirmationOpened: false})
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
            <div className="song-button-panel">
                <IconButton icon={queueIcon} onClick={this.Queue} tooltip="Add to queue" size={iconsSize}/>
                <IconButton icon={youtubeIcon} onClick={() => {
                    window.open(this.props.source, "_blank")?.focus()
                }} tooltip={"Open in YouTube"} size={iconsSize}/>
                <IconButton icon={deleteIcon} onClick={this.showDeletingConfirmation} tooltip="Delete" size={iconsSize}/>
            </div>
            {this.state.deleteConfirmationOpened ? <DialogBox
                text="Confirm deleting"
                boldPart={this.props.name}
                okCallback={this.Delete}
                cancelCallback={this.hideDeletingConfirmation}
            /> : null
            }
        </div>
    }
}

export default Song
