import React from "react"
import Filler from "./Filler"
import "../css/Dialog.css"

type DialogProps = {
    text: string
    boldPart: string | undefined
    okCallback(): void
    cancelCallback(): void
}

type DialogState = {}

class DialogBox extends React.Component<DialogProps, DialogState> {
    constructor(props: DialogProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <div style={{padding: 0, margin: 0}}>
            <Filler onClick={this.props.cancelCallback}/>
            <div className="dialog-box">
                <text className="dialog-box-text">{this.props.text}<text style={{fontWeight: "bold"}}>{this.props.boldPart}</text></text>
                <div className="dialog-box-buttons">
                    <button onClick={this.props.okCallback}>Ok</button>
                    <button onClick={this.props.cancelCallback}>Cancel</button>
                </div>
            </div>
        </div>
    }
}

export default DialogBox
