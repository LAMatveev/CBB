import React from "react";
import {Form} from "react-bootstrap";
import "../Pages/Styles.css"

export default function CheckboxList(data,checks,setChecks,display,setDisplay,hide){

    function searchHandler(e) {
        let searchjQuery = e.target.value.toLowerCase()
        let displayedContacts = data.children.map((elem) => {
            let searchValue = `(${elem.id}) ${elem.description}`.toLowerCase();
            return (searchValue.indexOf(searchjQuery) !== -1);
        })
        setDisplay(displayedContacts)
    }

    return (
        <div hidden={hide} className={"box"}>
            <Form.Control type="text" placeholder="Search" onChange={searchHandler}/>
            {data.children.map((elem, index) => ([
                checks[index] = checks[index] != null ? checks[index] : false,
                display[index] = display[index] != null ? display[index] : true,
                display[index]
                    ? <Form.Check key={elem.id} checked={checks[index]}
                                  style={{display: "flex", fontWeight: "bold"}}
                                  value={elem.id} type="checkbox"
                                  label={`(${elem.id}) ${elem.description}`}
                                  onChange={(e) => {
                                      checks[index] = e.target.checked;
                                      setChecks(checks)
                                  }}/>
                    : null
            ]))}
        </div>
    );
}
