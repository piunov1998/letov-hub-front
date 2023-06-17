import QueueItem, {queueItemProps} from "./QueueItem";
import React from "react";
import axios from "axios";
import "../css/Queue.css"


type queueState = {
    queue: queueItemProps[]
}

class Queue extends React.Component<any, queueState> {
    constructor(props: any) {
        super(props)
        this.state = {
            queue: []
        }
        this.getQueue()
    }

    getQueue() {
        const url = `${process.env.REACT_APP_HOST}/api/queue`
        axios.get<queueItemProps[]>(url, {withCredentials: true}).then((response) => {
            this.setState({queue: response.data})
        })
    }

    render() {
        return (<div>
            {
                this.state.queue.length > 0 ? <div className="queue">
                    {this.state.queue.map((item: queueItemProps) => (
                        <QueueItem id={item.id} song={item.song} user={item.user} key={item.id}/>
                    ))}
                </div> : <div className="queue-placeholder">No items</div>
            }
        </div>)
    }
}

export default Queue