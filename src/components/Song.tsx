import "../css/Song.css"

export type songProps = {
    id: number;
    name: string;
    source: string;
}

function Song(props: songProps) {
    return <div className="song">
        <label className="song-number">{props.id}</label>
        <input className="song-name" value={props.name}></input>
        <a className="song-source" href={props.source}>YT link</a>
    </div>
}

export default Song
