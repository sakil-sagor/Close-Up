import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [picture, setPicture] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    // password show hide function 
    const handelShow = () => { setShow(!show) }

    // for user photo 
    const postDetails = (picture) => {
        setLoading(true);
        if (picture === undefined) {
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        }
        if (picture.type === "image/jpeg" || picture.type === "image/png") {
            const data = new FormData();
            data.append("file", picture);
            data.append("upload_preset", "we-are-buddy");
            data.append("cloud_name", "dml6haipz");
            fetch("https://api.cloudinary.com/v1_1/dml6haipz/image/upload", {
                method: "post",
                body: data,
            }).then((res) => res.json())
                .then(data => {
                    setPicture(data.url.toString());
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                });
        } else {
            toast({
                title: 'Please Select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }

    }

    // for submit form 
    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please fill all the Feilds',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: 'Password do not Match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);

            return;
        }
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };


            const { data } = await axios.post("https://we-are-buddy.herokuapp.com/api/user", { name, email, password, picture }, config);
            toast({
                title: 'Registration Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push('/chats')
        } catch (error) {
            toast({
                title: 'Error Occured',
                description: error.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setLoading(false);
        }
    }
    return (
        <div>
            <VStack spacing={"5px"}>
                <FormControl isRequired>
                    <FormLabel >Name</FormLabel>
                    <Input
                        placeholder='Enter your name'
                        onChange={(e) => setName(e.target.value)}
                    ></Input>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel >Email</FormLabel>
                    <Input
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                </FormControl>
                <FormControl isRequired id='password'>
                    <FormLabel >Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                        ></Input>
                        <InputRightElement width={"4.5rem"}>
                            <Button h="1.75re" size="sm" onClick={handelShow}> {show ? "Hide" : "Show"}</Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl isRequired id='password'>
                    <FormLabel >Password</FormLabel>
                    <InputGroup>
                        <Input
                            type={show ? "text" : "password"}
                            placeholder='Confirm password'
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Input>
                        <InputRightElement width={"4.5rem"}>
                            <Button h="1.75re" size="sm" onClick={handelShow}> {show ? "Hide" : "Show"}</Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl isRequired id='pic'>
                    <FormLabel >Upload your Picture</FormLabel>
                    <Input
                        type={"file"}
                        p={1.5}
                        accept="image/*"
                        onChange={(e) => postDetails(e.target.files[0])}
                    ></Input>
                </FormControl>
                <Button
                    colorScheme={"blue"}
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                    isLoading={loading}
                >Sign Up</Button>
            </VStack>
        </div>
    );
};

export default Signup;