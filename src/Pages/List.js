import React, {useEffect, useState} from "react";
import "./Styles.css";
import {Redirect, useParams} from "react-router-dom";
import Button from "react-bootstrap/Button";
import NavHead from "../Components/NavHead";
import NotFound from "./NotFound";
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
import Popup from "../Components/Popup";
import {IconButton} from "@material-ui/core";
import {Form} from "react-bootstrap";
import {checklogin} from "../Components/LoginEmulator";

export default function List() {
    let tkey = checklogin(localStorage.getItem('token'))
    let {id} = useParams()
    const [ex, setEx] = useState(true);

    const [elems, setElems] = useState(null);
    const [display, setDisplay] = useState([]);

    const [text, setText] = useState('')
    const [popup, setPopup] = useState(false);

    async function exists(url) {
        const result = await fetch(url, {method: 'HEAD'});
        return result.status !== 404;
    }

    useEffect(() => {
        if (!(tkey === 403 || (tkey === 1 && id === 'Admins')))
            exists(`http://localhost:3000/res/templates/${id}.json`)
                .then(
                    (e) => {
                        if (!e) {
                            setEx(false)
                        }
                    })
                .then(() =>
                    fetch(`http://localhost:3000/res/templates/${id}.json`)
                        .then(
                            res =>
                                res.json()
                        )
                        .then(
                            (result) => {
                                setElems(result)
                            },
                            (error) => {
                                return <div>{{error}}</div>
                            }
                        ))
    }, [id, tkey])

    async function postForm(id) {
        let data =
            {
                "id": id
            }
        /*const response = await fetch(window.location, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'JWT':
            },
            body: JSON.stringify(data)
        });*/
        setText(JSON.stringify(data, null, 2))
        setPopup(true)
        //return await response.json();
    }

    function searchHandler(e) {
        let searchjQuery = e.target.value.toLowerCase()
        let displayedContacts = elems.children.map((elem) => {
            let searchValue = `${elem.description}`.toLowerCase();
            return (searchValue.indexOf(searchjQuery) !== -1);
        })
        setDisplay(displayedContacts)
    }

    if (tkey === 403 || !ex) {
        return <Redirect to='/'/>
    } else if (tkey === 1 && id === 'Admins') return <NotFound/>
    else if (elems == null) {
        return null
    } else

        return (
            <div align={"center"} style={{
                height: '100%',
                position: "relative",
                overflow: "auto"
            }}>
                <div key={id} align={"center"} style=
                    {{
                        display: 'flex',
                        flexDirection: "column",
                        backgroundColor: "#d9fffa",
                        justifyItems: 'center',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        //alignContent: "center",
                        height: '100%',
                        overflow: "auto"
                    }}
                >
                    <div style={{width: "100%", height: "min-content", maxHeight: "30%"}}>
                        <NavHead/>
                        <div style={{width: "100%"}}>
                            <h1 className={"unselectable script"}>
                                {`Corporate Big Br👁ther`}
                            </h1>
                            <h1 className={"script"}>
                                {`${id}`}
                            </h1>
                        </div>
                    </div>

                    <div style={{
                        width: "100%",
                        height: "70%",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column"
                    }}>
                        <Form.Control style={{width: "50%", textAlign: "center", zIndex: "2", marginBottom: "20px"}}
                                      type="text"
                                      placeholder="Search"
                                      onChange={searchHandler}/>
                        <div style={{
                            display: 'flex',
                            flexDirection: "column",
                            justifyItems: 'center',
                            alignItems: 'center',
                            height: "min-content",
                            maxHeight: '50%',
                            overflowY: "auto",
                            zIndex: 3,
                            width: "auto",
                            minWidth: "50%",
                            backgroundColor: "#d9fffa",
                            padding: "10px",
                            border: "solid darkblue 2px",
                            borderRadius: "1rem"
                        }}>
                            {Popup(popup, setPopup, text)}
                            <Button style={{marginBottom: "1em"}} className={'round'} key={-1}
                                    href={`/${id}/-1`}>{'➕'}</Button>
                            {
                                elems.children.map((elem, index) => ([
                                        display[index] = display[index] != null ? display[index] : true,
                                        display[index]
                                            ?
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <Button style={{marginRight: "10px"}} key={elem.id}
                                                        href={`/${id}/${elem.id}`}>{elem.description}</Button>
                                                <IconButton children={<DeleteIcon style={{
                                                    backgroundColor: "#e8220dba",
                                                    color: "white",
                                                    borderRadius: '1rem',
                                                    width: "40px",
                                                    height: "40px",
                                                }}/>} onClick={() => postForm(elem.id)}/>
                                            </div> : null]
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
}
