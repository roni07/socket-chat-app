import './App.css';
import io from "socket.io-client";
import {useState} from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

const App = () => {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            const data = {username, room}
            socket.emit("join_room", data);
        }
    }

    return (
        <div className="App">
            <h3>Join A Chat</h3>
            <input
                type="text"
                placeholder="John"
                onChange={e => setUsername(e.target.value)}
            />

            <input
                type="text"
                placeholder="Room ID.."
                onChange={e => setRoom(e.target.value)}
            />

            <button onClick={joinRoom}>
                Join A Room
            </button>

            <Chat
                socket={socket}
                username={username}
                room={room}
            />
        </div>
    );
}

export default App;
