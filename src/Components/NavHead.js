import React from "react";
import {Nav, Navbar} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import "../Pages/Styles.css"
import {checklogin} from "./LoginEmulator";
import Button from "react-bootstrap/Button";

export default function NavHead() {
    let {id} = useParams()
    let history = useHistory()
    let tkey = checklogin(localStorage.getItem('token'))
    if (tkey === 403) {
        history.push('/')
    }
    function logout(){
        localStorage.removeItem('token')
        history.push('/')
    }
    let pdp = (tkey === 0 ? ['Admins'] : []).concat(['Workers', 'Attributes', 'Rules'])
    return (
        <div style={{zIndex: 2, width: '100%'}}>
            <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
                <Navbar.Collapse className="justify-content-center">
                    <Nav activeKey={window.location.pathname}
                         variant={'pills'}>
                        {pdp.map((page) => (
                            <Nav.Link disabled={id === page} key={page} href={`/${page}`}>{page}</Nav.Link>))}
                        <Button style={{position: 'absolute', right: 10}} onClick={logout}>Logout</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}
