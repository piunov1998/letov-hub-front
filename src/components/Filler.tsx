import React from "react"
import "../css/Filler.css"

type FillerProps = {
    onClick(): void
}

type FillerState = {}

class Filler extends React.Component<FillerProps, FillerState> {
    constructor(props: FillerProps) {
        super(props)
        this.state = {}
        this.OnClick = this.OnClick.bind(this)
    }

    OnClick(event: React.MouseEvent<HTMLDivElement>): void {
        if (event.currentTarget === event.target) {
            this.props.onClick()
        }
    }

    render() {
        return <div className="filler" onClick={this.OnClick}></div>
    }
}

export default Filler
