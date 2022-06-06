import React, { useEffect, useState } from 'react';

const ChatPage = () => {
    const [chats, setChats] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/api/chats`;
        fetch(url)
            .then(res => res.json())
            .then(data => setChats(data))
    }, [])
    console.log(chats);
    return (
        <div>
            {
                chats.map(chat => <div key={chat._id}>{chat.chatName}</div>)
            }
        </div>
    );
};

export default ChatPage;