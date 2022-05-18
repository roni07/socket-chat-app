import React, {useEffect, useState} from 'react';

const Chat = ({socket, username, room}) => {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage) {
            const messageData = {
                room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    return (
        <div style={{border: "1px solid blue", width: "300px"}}>
            <div style={{backgroundColor: "blue", padding: "10px"}}>
                <p style={{margin: "0", color: "#fff", fontWeight: "bold"}}>Live Chat</p>
            </div>
            <div style={{height: "400px", overflowY: "scroll"}}>
                {
                    messageList.map((messageContent, index) =>
                        <h1 key={index}>{messageContent.message}</h1>
                    )
                }
            </div>
            <div style={{width: "100%", display: "flex"}}>
                <input
                    type="text"
                    placeholder="hey..."
                    onChange={e => setCurrentMessage(e.target.value)}
                    style={{width: "80%", padding: "7px 5px", border: "1px solid blue"}}
                />
                <button
                    style={{
                        width: "20%",
                        padding: "7px 0",
                        fontSize: "20px",
                        border: "1px solid blue"
                    }}
                    onClick={sendMessage}
                >
                    &#9658;
                </button>
            </div>
        </div>
    );
};

export default Chat;
