import './Home.css';
import React from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@nextui-org/react";
import axios from 'axios';
import { redirect } from "react-router-dom";

function Home() {
    const [selected, setSelected] = React.useState("login");

    const url = 'http://localhost:5000/';
    
    async function signUp() {
        const data = {
            username: document.getElementById('username-signup').value,
            password: document.getElementById('password-signup').value,
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            email: document.getElementById('email').value,
        };

        axios({
            method: 'post',
            url: url + 'register',
            data,
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.error(err);
        });
    }

    async function logIn() {
        const data = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };

        axios({
            method: 'post',
            url: url + 'login',
            data,
        }).then(res => {
            localStorage.setItem('access-token', res.data.token);
            window.location.pathname = '/';
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div className="flex flex-col w-full">
            <Card className="max-w-full w-[340px] h-[600px]">
                <CardBody className="overflow-hidden">
                    <Tabs
                        fullWidth
                        size="md"
                        aria-label="Tabs form"
                        selectedKey={selected}
                        onSelectionChange={setSelected}
                    >
                        <Tab key="login" title="Login">
                            <form className="flex flex-col gap-4">
                                <Input 
                                    isRequired 
                                    id='username'
                                    label="Username" 
                                    placeholder="Enter your username" 
                                    type="text"
                                    variant='bordered' />
                                <Input 
                                    isRequired 
                                    id='password'
                                    label="Password" 
                                    placeholder="Enter your password" 
                                    type="password"
                                    variant='bordered' />
                                <p className="text-center text-small">
                                    Need to create an account?{" "}
                                    <Link size="sm" onPress={() => setSelected("sign-up")} className='cursor-pointer'>
                                        Sign up
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary" onPress={ logIn }>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        <Tab key="sign-up" title="Sign up">
                            <form className="flex flex-col gap-4 h-[300px]">
                                <Input 
                                    isRequired 
                                    id='username-signup'
                                    label="Username" 
                                    placeholder="Enter your username" 
                                    type="text"
                                    variant='bordered' />
                                <Input 
                                    isRequired 
                                    id='password-signup'
                                    label="Password" 
                                    placeholder="Enter your password" 
                                    type="password"
                                    variant='bordered' />
                                <Input 
                                    isRequired 
                                    id='first-name'
                                    label="First Name" 
                                    placeholder="Enter your first name" 
                                    type="text"
                                    variant='bordered' />
                                <Input 
                                    isRequired 
                                    id='last-name'
                                    label="Last Name" 
                                    placeholder="Enter your last name" 
                                    type="text"
                                    variant='bordered' />
                                <Input 
                                    isRequired 
                                    id='email'
                                    label="Email" 
                                    placeholder="Enter your email" 
                                    type="email"
                                    variant='bordered' />
                                <p className="text-center text-small">
                                    Already have an account?{" "}
                                    <Link size="sm" onPress={() => setSelected("login")}>
                                        Login
                                    </Link>
                                </p>
                                <div className="flex gap-2 justify-end">
                                    <Button fullWidth color="primary" onPress={ signUp }>
                                        Sign up
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </CardBody>
            </Card>
        </div>
    );
}

export default Home;