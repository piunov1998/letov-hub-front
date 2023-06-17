import QueueItem, {queueItemProps} from "./QueueItem";
import React, {useState} from "react";
import axios from "axios";
import "../css/Queue.css"

function getQueue(setter: React.Dispatch<React.SetStateAction<queueItemProps[]>>) {
    const url = `${process.env.REACT_APP_HOST}/api/queue`
        axios.get<queueItemProps[]>(url, {withCredentials: true}).then((response) => {
            setter(response.data)
    })
}

function Queue() {

    const [queue, setQueue] = useState<queueItemProps[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    if (!loaded) {
        getQueue(setQueue)
        setLoaded(true)
    }

    return (<div>
        {
            queue.length > 0 ? <div className="queue">
                {queue.map((item: queueItemProps) => (
                    <QueueItem id={item.id} song={item.song} user={item.user} key={item.id}/>
                ))}
            </div> : <div className="queue-placeholder">No items</div>
        }
    </div>)
}

export default Queue