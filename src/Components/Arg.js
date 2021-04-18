import React from "react";
import "../Pages/Styles.css"
import TypeDD from "./DropDown";
import Form from "react-bootstrap/Form";
import CheckboxList from "./CheckboxList";

export default function Arg(id, t, st, o, so, c, sc, la, sla, lw, slw, d, sd, da, sda, workers, attributes) {
    function apply(val, def, func) {
        let t = JSON.parse(JSON.stringify(def));
        t[id] = val;
        func(t)
    }

    return (
        <div className={"formgroup"}>
            {TypeDD((e) => apply(e, t, st), t[id], ["id", "attribute"])}
            {TypeDD((e) => apply(e, o, so), o[id], ["All in the list", "At least one in the list"])}
            {o[id] === 0 ? <Form.Control value={c[id]} style={{width: "100%"}} type="number"
                                         placeholder="Least participant count (blank or zero for all)"
                                         onChange={(e) => {
                                             if (Number(e.target.value) <= 0) {
                                                 e.target.value = ''
                                                 apply(0, c, sc)
                                                 return
                                             }
                                             apply(Number(e.target.value), c, sc)
                                         }}/> : null}
            {CheckboxList(workers, la[id], (e) => apply(e, la, sla),
                d[id], (e) => apply(e, d, sd), t[id] !== 0)}
            {CheckboxList(attributes, lw[id], (e) => apply(e, lw, slw),
                d[id], (e) => apply(e, d, sd), t[id] === 0)
            }</div>
    );
}
