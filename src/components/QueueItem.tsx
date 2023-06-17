import "../css/QueueItem.css"
import {songProps} from "./Song";
import React from "react";

export type queueItemProps = {
    id: number;
    song: songProps;
    user: string;
}

class QueueItem extends React.Component<queueItemProps, any> {
    render() {

        return <div className="item">
            <label className="item-number">{this.props.id}</label>
            <label className="item-name">{this.props.song.name}</label>
            <label className="item-user">{this.props.user}</label>
        </div>
    }
}

export default QueueItem
