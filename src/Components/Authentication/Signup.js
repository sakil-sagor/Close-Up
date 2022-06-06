import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Signup = () => {
    const [show, setShow] = useState(false)
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [picture, setPicture] = useState();

    // password show hide function 
    const handelShow = () => { setShow(!show) }

    // for user photo 
    const postDetails = (picture) => { }

    // for submit form 
    const submitHandler = () => { }
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
                            onChange={(e) => setPassword(e.target.value)}
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
                >Sign Up</Button>
            </VStack>
        </div>
    );
};

export default Signup;