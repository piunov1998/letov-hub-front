import React from "react"
import "../css/IconButton.css"

type ButtonProps = {
    icon: string
    onClick(): void
    tooltip: string
    size: number
}

type ButtonState = {}

class IconButton extends React.Component<ButtonProps, ButtonState> {
    constructor(props: ButtonProps) {
        super(props)
        this.state = {}
    }

    render() {
        return <div
            className="icon-button"
            style={{height: this.props.size, width: this.props.size}}
            title={this.props.tooltip}
            onClick={this.props.onClick}
        >
            <img className="icon-button-image" src={this.props.icon} alt={this.props.tooltip} />
        </div>
    }
}

export default IconButton
