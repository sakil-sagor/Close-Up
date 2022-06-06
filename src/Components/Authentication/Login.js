import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    // password show hide function 
    const handelShow = () => { setShow(!show) }

    // for submit form 
    const submitHandler = () => { }
    return (
        <div>
            <VStack spacing={"5px"}>
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
                <Button
                    colorScheme={"blue"}
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={submitHandler}
                >Login</Button>
                <Button
                    variant={"solid"}
                    colorScheme="red"
                    width={"100%"}
                    onClick={() => {
                        setEmail("guest@example.com");
                        setPassword('123456')
                    }}
                >
                    Get guest user credentials
                </Button>
            </VStack>
        </div>
    );
};

export default Login; <h1>This is login page</h1>