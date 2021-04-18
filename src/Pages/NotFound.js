import React from "react";
import Button from "react-bootstrap/Button";
import "./Styles.css";
import {useHistory} from "react-router-dom";

export default function NotFound() {
    let history = useHistory();
    const fuckgoback = async (e) => {
        history.push('/');
    }
    return (

        <div align={"center"} style={{
            backgroundColor: "black",
            height: '100%',
            position: "relative",
            overflow:"auto"
        }}>
            <Button onClick={(e) => fuckgoback(e)} className={"bbutton"} style={{position:"absolute", left:"0", zIndex: "4"}}>FUCK! GO BACK!</Button>
            <div className={"fullscreen"} style={{zIndex: 2}}>
                <h1 style={{
                    fontFamily: "script",
                    fontSize: "90em",
                    fontWeight: "bold",
                    color: "red",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    width: "100%",
                    height: "100%"
                }} className={"unselectable"}>
                    {'👁'}
                </h1>
            </div>
            <div className={"fullscreen"} style={{zIndex: 3}}>
                <h1 style={{
                    fontFamily: "Papyrus",
                    fontSize: "15em",
                    fontWeight: "bold",
                    color: "white",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    width: "100%",
                    height: "100%"
                }} className={"unselectable"}>
                    {'Where are you going?\n403'}
                </h1>
            </div>

        </div>
    );
}
