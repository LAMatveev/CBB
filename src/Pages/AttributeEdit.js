import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect, useHistory, useParams} from "react-router-dom";
import Popup from "../Components/Popup";
import {checklogin} from "../Components/LoginEmulator";

let path = window.location.toString().substring(0, window.location.toString().lastIndexOf('/'))
let arg = path.substring(path.lastIndexOf('/'))

export default function AttributeEdit() {
    let {attribute} = useParams();
    attribute = parseInt(attribute)
    let tkey = checklogin(localStorage.getItem('token'))
    const [attr, setAttr] = useState('');
    let history = useHistory();
    const [attributes, setAttributes] = useState(null);

    const [text, setText] = useState('')
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if (tkey !== 403)
            fetch(`http://localhost:3000/res/templates/Attributes.json`)
                .then(
                    res =>
                        res.json()
                )
                .then(
                    (result) => {
                        setAttributes(result)
                        if (result.children.find((e) => e.id === attribute) !== undefined)
                            setAttr(result.children.find((e) => e.id === attribute).description)
                    },
                    (error) => {
                        return <div>{{error}}</div>
                    }
                )

    }, [attribute, tkey])

    async function postForm(e) {
        e.preventDefault()
        let data =
            {
                "description": attr,
            }
        /*const response = await fetch(window.location, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'JWT': 'token'
            },
            body: JSON.stringify(data)
        });*/

        setText(JSON.stringify(data, null, 2))
        setPopup(true)
        //return await response.json();
    }

    if (tkey === 403) {
        return <Redirect to='/'/>
    } else if (attributes == null) {
        return null
    } else if (!attributes.children.find((e) => e.id === attribute) && !(attribute === -1)) {
        return <Redirect to={arg}/>
    } else
        return (
            <div align={"center"} style={{
                display: 'flex',
                flexDirection: "column",
                backgroundColor: "#d9fffa",
                justifyItems: 'center',
                alignItems: 'center',
                alignContent: "center",
                height: '100%',
                overflow: "auto"
            }}>
                <Button
                    className={"bbutton"}
                    onClick={() => {
                        history.push(arg)
                    }} style={{
                    position: "absolute",
                    left: "10px",
                    top: "10px",
                }}>Back</Button>
                <h1 className={"unselectable script"}>{
                    attribute === -1 ? "Create new attribute" : "Edit"}
                </h1>
                <Form
                    onSubmit={(e) => postForm(e)}
                    style={{width: '100%', height: '100%'}}>

                    <Button
                        type={"submit"}
                        className={"bbutton"}
                        style={{
                            position: "absolute",
                            right: "10px",
                            bottom: "10px",
                            backgroundColor: "green",
                            zIndex: "2",
                        }}>
                        {attribute === -1 ? "Save" : "Edit"}
                    </Button>

                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        {Popup(popup, setPopup, text)}
                        <Form.Control required
                                      type={"text"}
                                      value={attr}
                                      placeholder="Attribute"
                                      style={{width: "50%", textAlign: "center"}}
                                      onChange={(e) => setAttr(e.target.value)}/>
                    </div>
                </Form>
            </div>
        );
}

