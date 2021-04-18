import React from "react";
import "../Pages/Styles.css"

export default function Popup(popup, setPopup, text) {
    return (
        <div hidden={!popup} onClick={() => setPopup(false)} style={{
            position: "absolute",
            textAlign: "left",
            height: "min-content",
            width: "min-content",
            backgroundColor: "#ffffff",
            border: "solid black 1px",
            borderRadius: "1rem",
            padding:"20px",
            zIndex: 5
        }}>
            <pre>{text}</pre>
        </div>
    );
}