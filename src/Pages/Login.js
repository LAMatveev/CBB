import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Styles.css";
import {useHistory} from "react-router-dom";
import {applyLogin, checklogin} from '../Components/LoginEmulator'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [text, setText] = useState('');

    let history = useHistory()

    useEffect(() => {
        let res = checklogin(localStorage.getItem('token'))
        if (res !== 403) {
            history.push('/Attributes')
        }
    })

    const login = async (e) => {
        e.preventDefault();

        applyLogin(email, password).then((ttok) => {
            if (ttok === null) setText('Invalid email or password')
            else {
                localStorage.setItem("token", ttok)
                history.push('/Attributes')
            }
        })
    }
    return (
        <div align={"center"} style={{
            display: 'flex',
            flexDirection: "column",
            backgroundColor: "#d9fffa",
            justifyItems: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: "space-evenly",
            height: '100%',
            overflow: "auto"
        }}>
            <h1 className={"script"}>{
                'Corporate Big Br👁ther'}
            </h1>
            <h2>{text}</h2>
            <Form id="login" style={{display: "grid", alignItems: "center"}} onSubmit={(e) => login(e)}>
                <Form.Group size="lg" controlId="email" style={{textAlign: "center"}}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        required
                        className={email === '' ? "error" : ''}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                        autoComplete='on'
                        type="email"
                        name="email"/>
                </Form.Group>
                <Form.Group size="lg" controlId="password" style={{textAlign: "center"}}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        className={password === '' ? "error" : ''}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"/>
                </Form.Group>
                <Button type={"submit"}
                        className={Button}>Login</Button>
            </Form>
        </div>
    );
}
