import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
    Avatar, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import NotificationBadge, { Effect } from 'react-notification-badge';
import { useHistory } from 'react-router-dom';
import { getSender } from '../../config/ChatLogics';
import { ChatState } from '../../Context/ChatProvider';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import ProfileModal from './ProfileModal';

const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [serachResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const history = useHistory();
    const { user, setSelectedChat, chats, setChats, notification, setNotification } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/")
    }

    const handelSearch = async () => {

        if (!search) {
            toast({
                title: 'Please enter a name or email',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "top-left"
            })
        }

        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                }
            }
            const { data } = await axios.get(`https://we-are-buddy.herokuapp.com/api/user?search=${search}`, config);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: 'Error Occured',
                description: "Failed to loacd the search result",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }


    const accessChat = async (userId) => {

        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post(`https://we-are-buddy.herokuapp.com/api/chat`, { userId }, config);

            if (!chats.find((c) => c._id === data._id)) {
                setChats([data, ...chats]);
            }
            setSelectedChat(data);
            setLoadingChat(false);
            onClose()
        } catch (error) {
            toast({
                title: 'Error fetching the chat',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }
    }


    return (
        <>
            <Box display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Tooltip label="Search Users to Chat" hasArrow placement='bottom-end'>
                    <Button variant="ghost" ref={btnRef} colorScheme='teal' onClick={onOpen}>
                        <i class="fas fa-search" ></i>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    We are Buddy
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notification.length && "No New Messages"}
                            {notification.map((notif) => (
                                <MenuItem
                                    key={notif._id}
                                    onClick={() => {
                                        setSelectedChat(notif.chat);
                                        setNotification(notification.filter((n) => n !== notif));
                                    }}
                                >
                                    {notif.chat.isGroupChat
                                        ? `New Message in ${notif.chat.chatName}`
                                        : `New Message from ${getSender(user, notif.chat.users)}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.picture}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>{" "}
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler} >Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>

                    <DrawerBody>
                        <Box display={"flex"} pb={2}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handelSearch}> Go</Button>
                        </Box>
                        {loading ? (<ChatLoading></ChatLoading>)
                            :
                            (
                                serachResult.map(user => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    ></UserListItem>
                                ))
                            )}
                        {
                            loadingChat && <Spinner ml="auto" display={"flex"}></Spinner>
                        }
                    </DrawerBody>


                </DrawerContent>
            </Drawer>
        </>
    );
};

export default SideDrawer; 