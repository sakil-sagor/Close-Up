import { Box } from '@chakra-ui/react';
import React from 'react';
import ChatBox from '../Components/ChatBox';
import SideDrawer from '../Components/miscellaneous/SideDrawer';
import MyChat from '../Components/MyChat';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
    const { user } = ChatState();

    return (

        <div style={{ width: "100%" }}>
            {user && <SideDrawer></SideDrawer>}
            <Box display="flex" justifyContent={"space-between"} w="100%" h="91.5vh" p="10px">
                {user && <MyChat></MyChat>}
                {user && <ChatBox></ChatBox>}
            </Box>
        </div >

    );
};

export default ChatPage;