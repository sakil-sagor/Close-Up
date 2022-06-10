import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import ChatBox from '../Components/ChatBox';
import SideDrawer from '../Components/miscellaneous/SideDrawer';
import MyChat from '../Components/MyChat';
import { ChatState } from '../Context/ChatProvider';

const ChatPage = () => {
    const { user } = ChatState();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (

        <div style={{ width: "100%" }}>
            {user && <SideDrawer></SideDrawer>}
            <Box display="flex" justifyContent={"space-between"} w="100%" h="91.5vh" p="10px">
                {user && <MyChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} ></MyChat>}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} ></ChatBox>}
            </Box>
        </div >

    );
};

export default ChatPage;