import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [show, setShow] = useState(false)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    // password show hide function 
    const handelShow = () => { setShow(!show) }

    // for submit form 
    const submitHandler = async () => {
        setLoading(true);
        if (!email && !password) {
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
        try {
            const config = {
                headers: {
                    "content-type": "application/json",
                },
            };
            const { data } = await axios.post("https://we-are-buddy.herokuapp.com/api/user/login", { email, password }, config);
            toast({
                title: 'Login Successful',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: "bottom",

            });

            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);

            history.push('/chats')
            window.location.reload(false);



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
                    <FormLabel >Email</FormLabel>
                    <Input
                        value={email}
                        placeholder='Enter your email'
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                </FormControl>
                <FormControl isRequired id='password'>
                    <FormLabel >Password</FormLabel>
                    <InputGroup>
                        <Input
                            value={password}
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
                        setPassword('123456');

                    }}
                    isLoading={loading}
                >
                    Get guest user credentials
                </Button>
            </VStack>
        </div>
    );
};

export default Login; 