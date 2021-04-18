import React from "react";
import {Dropdown, DropdownButton} from "react-bootstrap";
import "../Pages/Styles.css"

export default function DropDown(selector, getter ,names) {
    return (
        <div>
            <DropdownButton onSelect={(e)=>selector(Number.parseInt(e))} title={names[getter]}>
                {names.map((elem, index) => (
                    <Dropdown.Item key = {elem} active={getter === index} eventKey={index}> {elem} </Dropdown.Item>
                ))}
            </DropdownButton>
        </div>
    );
}
