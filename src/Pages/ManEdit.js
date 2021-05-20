import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect, useHistory, useParams} from "react-router-dom";
import CheckboxList from "../Components/CheckboxList";
import {checklogin} from "../Components/LoginEmulator";
import NotFound from "./NotFound";

export default function ManEdit() {
    let {man} = useParams()
    man = parseInt(man)
    let tkey = checklogin(localStorage.getItem('token'))
    let path = window.location.toString().substring(0, window.location.toString().lastIndexOf('/'))
    let arg = path.substring(path.lastIndexOf('/'))
    let admin = arg === '/Admins'
    const creating = man === -1

    const [name, setName] = useState("")
    const [fathers_name, setFathersName] = useState("")
    const [last_name, setLastName] = useState("")
    const [email, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [attributes, setAttributes] = useState(null);
    const [displayed, setDisplayed] = useState([])
    const [checks, setChecks] = useState([]);

    let history = useHistory();
    const [elems, setElems] = useState(null)
    useEffect(() => {
        function getmen() {
            return fetch(`http://localhost:3000/res/templates${arg}.json`)
                .then((res) => res.json())
        }

        function getattr() {
            if (!admin)
                return fetch(`http://localhost:3000/res/templates/Attributes.json`)
                    .then((res) => res.json())
        }

        function getall() {
            return Promise.all([getmen(), getattr()])
        }

        if (!(tkey === 403 || (tkey === 1 && arg === '/Admins'))) getall().then(([men, attr]) => {
            if (men !== null) if ((men.children.findIndex((e) => e.id === man) !== -1) && !(creating)) {
                console.log(man)
                let m = men.children.filter((e) => e.id === man)[0]
                setFathersName(m.fathers_name)
                setName(m.name)
                setLastName(m.last_name)
                setUsername(m.email)
                setPassword(m.password)
                if (!admin) setChecks(attr.children.map((elem) => m.attributes.includes(elem.id)))
            }
            setElems(men)
            setAttributes(attr)
        })
    }, [admin, arg, creating, man, tkey])

    async function postForm(e) {
        e.preventDefault()
        let data =
            {
                last_name: last_name,
                name: name,
                fathers_name: fathers_name,
                email: email,
                password: password
            }
        if (!admin) {
            data.attributes = attributes.children.map((elem, index) => {
                if (checks[index]) return elem.id
                else return null
            }).filter(x => x != null)
        }
        const response = await fetch(window.location, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'JWT': 'token'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    if (tkey === 403) {
        return <Redirect to='/'/>
    } else if (tkey === 1 && arg === '/Admins') return <NotFound/>
    else if (elems == null || (attributes == null && !admin)) {
        return null
    } else if ((elems.children.findIndex((e) => e.id === man) === -1) && !(creating)) {
        return <Redirect to={arg}/>
    } else
        return (
            <div align={"center"} style={{
                display: 'flex',
                flexDirection: "column",
                backgroundColor: "#d9fffa",
                justifyItems: 'center',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                alignContent: "space-evenly",
                height: '100%',
                overflow: "auto"
            }}>
                <Button
                    className={"bbutton"}
                    onClick={() =>
                        history.push(arg)
                    } style={{
                    position: "absolute",
                    left: "0",
                    top: "0",
                }}>Back</Button>
                <h1 className={"unselectable script"}>{
                    creating ? "Create new person" : "Edit"}
                </h1>
                <Form onSubmit={(e) => postForm(e)} style={{
                    display: "flex", alignItems: "center",
                    height: "75%"
                }}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Form.Group size="lg" controlId="last_name" style={{textAlign: "center"}}>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control
                                required
                                onChange={(e) => setLastName(e.target.value)}
                                autoFocus
                                autoComplete='on'
                                type="text"
                                name="last_name"
                                value={last_name}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="name" style={{textAlign: "center"}}>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                                autoComplete='on'
                                type="text"
                                name="name"
                                value={name}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="fathers_name" style={{textAlign: "center"}}>
                            <Form.Label>Father's name</Form.Label>
                            <Form.Control
                                onChange={(e) => setFathersName(e.target.value)}
                                autoFocus
                                autoComplete='on'
                                type="text"
                                name="fathers_name"
                                value={fathers_name}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="email" style={{textAlign: "center"}}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                autoComplete='on'
                                type="email"
                                name="email"
                                value={email}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password" style={{textAlign: "center"}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="password"
                                value={password}
                            />
                        </Form.Group>
                        <Button
                            type={"submit"}
                            className={"bbutton"}
                        >
                            {creating ? "Save" : "Edit"}
                        </Button>
                    </div>
                    {admin ? null : <div style={{position: "absolute", right: "10%", height: "50%", overflow: "auto"}}>
                        {CheckboxList(attributes, JSON.parse(JSON.stringify(checks)), setChecks, displayed, setDisplayed)}</div>}
                </Form>
            </div>
        );
}

