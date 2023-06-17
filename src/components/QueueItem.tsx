import "../css/QueueItem.css"
import {songProps} from "./Song";

export type queueItemProps = {
    id: number;
    song: songProps;
    user: string;
}

function QueueItem(props: queueItemProps) {
    return <div className="item">
        <label className="item-number">{props.id}</label>
        <label className="item-name">{props.song.name}</label>
        <label className="item-user">{props.user}</label>
    </div>
}

export default QueueItem
