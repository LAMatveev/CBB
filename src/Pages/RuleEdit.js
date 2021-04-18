import React, {useEffect, useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect, useHistory, useParams} from "react-router-dom";
import Arg from "../Components/Arg";
import DropDown from "../Components/DropDown";
import Popup from "../Components/Popup";
import {checklogin} from "../Components/LoginEmulator";

export default function RuleEdit() {
    let path = window.location.toString().substring(0, window.location.toString().lastIndexOf('/'))
    let arg = path.substring(path.lastIndexOf('/'))
    let {rule} = useParams();
    rule = parseInt(rule)
    let creating = rule === -1
    let tkey = checklogin(localStorage.getItem('token'))
    let history = useHistory();

    let days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [daysFlag, setDaysFlag] = useState([false, false, false, false, false, false, false]);

    const [suspend, setSuspend] = useState(false);

    const [description, setDescription] = useState('');
    const [result, setResult] = useState(0);

    const [timeFlag, setTimeFlag] = useState(false);
    const [time, setTime] = useState([]);

    const [periodFlag, setPeriodFlag] = useState(false);
    const [period, setPeriod] = useState(null);

    const [type, setType] = useState([0, 0]);
    const [option, setOption] = useState([0, 0]);

    const [displayedWorkers, setDisplayedWorkers] = useState([[], []])
    const [displayedAttributes, setDisplayedAttributes] = useState([[], []])
    const [workerList, setWorkerList] = useState([[], []]);
    const [attributesList, setAttributesList] = useState([[], []]);

    const [count, setCount] = useState([]);

    const [rules, setRules] = useState(null);
    const [workers, setWorkers] = useState(null);
    const [attributes, setAttributes] = useState(null);

    const [text, setText] = useState('')
    const [popup, setPopup] = useState(false);


    useEffect(() => {
        function getworkers() {
            return fetch(`http://localhost:3000/res/templates/Workers.json`)
                .then((res) => res.json())
        }

        function getattributes() {
            return fetch(`http://localhost:3000/res/templates/Attributes.json`)
                .then((res) => res.json())
        }

        function getrules() {
            return fetch(`http://localhost:3000/res/templates/Rules.json`)
                .then((res) => res.json())
        }

        function getall() {
            return Promise.all([getworkers(), getattributes(), getrules()])
        }

        if (tkey !== 403) getall().then(([work, attr, rul]) => {
            setWorkers(work)
            setAttributes(attr)
            setRules(rul)
            if (work !== null && attr != null &&
                rul.children.find((e) => e.id === rule) !== undefined &&
                !(creating)) {
                let r = rul.children.find((e) => e.id === rule)
                setDescription(r.description)
                setSuspend(r.suspended)
                setResult(r.result)
                setTimeFlag(r.timeflag)
                setTime([r.timefrom, r.timeto])
                setPeriodFlag(r.periodflag)
                setPeriod(r.period)
                setDaysFlag(r.days)
                setType([r.children[0].type, r.children[1].type])
                setOption([r.children[0].option, r.children[1].option])
                setCount([r.children[0].count, r.children[1].count])
                setWorkerList(r.children.map((elem) =>
                    work.children.map((w) => {
                        return elem.type === 0 ? elem.list.includes(w.id) : null
                    })
                ))
                setAttributesList(r.children.map((elem) =>
                    work.children.map((w) => {
                        return elem.type === 1 ? elem.list.includes(w.id) : null
                    })
                ))
            }
        })


    }, [creating, rule, tkey])


    async function postForm(e) {
        e.preventDefault()
        let data =
            {
                "description": description,
                "suspended": suspend,
                "result": result,
                "timeflag": timeFlag,
                "timefrom": time[0],
                "timeto": time[1],
                "periodflag": periodFlag,
                "period": period ? period : 0,
                "days": daysFlag
            }
        let arr = [0, 1]
        data.children = [null, null]
        arr.forEach((el) => {
            data.children[el] = {
                "type": type[el],
                "option": option[el],
                "list": (type[el] === 0 ? workers.children.map((elem, index) => {
                    if (workerList[el][index]) {
                        return elem.id
                    } else return null
                }) : attributes.children.map((elem, index) => {
                    return attributesList[el][index] ? elem.id : null
                }))
                    .filter(x => x != null),
                "count": (count[el] == null ? 0 : count[el])
            }

        })
        /*const response = await fetch(window.location, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'JWT': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });*/
        setText(JSON.stringify(data, null, 2))
        setPopup(true)
        //return await response.json();
    }

    if (tkey === 403) {
        return <Redirect to='/'/>
    } else if (rules == null || workers == null || attributes == null) {
        return null
    } else {
        if ((rules.children.find((e) => e.id === rule) === undefined) && !(creating)) {
            return <Redirect to={arg}/>
        } else
            return (
                <div align={"center"} style={{
                    display: 'flex',
                    flexDirection: "column",
                    backgroundColor: "#d9fffa",
                    justifyItems: 'center',
                    alignItems: 'center',
                    alignContent: "space-evenly",
                    height: '100%',
                    overflow: "auto"
                }}>
                    {Popup(popup, setPopup, text)}
                    <Button onClick={() => {
                        history.push(arg)
                    }} className={"bbutton"} style={{
                        position: "absolute",
                        left: "10px",
                        top: "10px",
                    }}>Back</Button>
                    <h1 className={"unselectable script"}>{
                        creating ? "Create new rule" : "Edit"}
                    </h1>
                    <div style={{
                        flexDirection: "row",
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-evenly",
                        overflowX: "auto",
                        position: "relative",
                        top: "10%",
                        height: "70%"
                    }}>
                        <Form onSubmit={(e) => postForm(e)} style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                            overflowX: "auto",
                            height: "100%"
                        }}>
                            <Button
                                type={"submit"}
                                className={"bbutton"}
                                style={{
                                    position: "absolute",
                                    right: "10px",
                                    bottom: "10px",
                                    backgroundColor: "green",
                                }}>
                                {creating ? "Save" : "Edit"}
                            </Button>
                            <div style={{
                                display: "flex",
                                width: "100%",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <Form.Check
                                    onChange={(e) => setSuspend(e.target.checked)}
                                    checked={suspend}
                                    style={{fontWeight: "bolder", color: (suspend ? 'red' : 'grey'), marginRight: 20}}
                                    label={"Suspended"}/>
                                <Form.Control required type={"text"}
                                              value={description}
                                              placeholder="Description"
                                              style={{width: "50%", textAlign: 'center'}}
                                              onChange={(e) => setDescription(e.target.value)}/></div>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                width: "100%",
                                alignItems: "center",
                                height: "90%"
                            }}>
                                <h1 className={"unselectable script"}>{
                                    "If"}
                                </h1>
                                {
                                    Arg(0,
                                        type, setType,
                                        option, setOption,
                                        count, setCount,
                                        workerList, setWorkerList,
                                        attributesList, setAttributesList,
                                        displayedWorkers, setDisplayedWorkers,
                                        displayedAttributes, setDisplayedAttributes,
                                        workers, attributes)
                                }
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}>
                                    <h1 style={{width: "min-content"}} className={"unselectable script"}>
                                        {"contacts"}
                                    </h1>
                                    <h1 style={{width: "min-content"}} className={"unselectable script"}>
                                        {"with"}
                                    </h1>
                                </div>
                                {
                                    Arg(1,
                                        type, setType,
                                        option, setOption,
                                        count, setCount,
                                        workerList, setWorkerList,
                                        attributesList, setAttributesList,
                                        displayedWorkers, setDisplayedWorkers,
                                        displayedAttributes, setDisplayedAttributes,
                                        workers, attributes)
                                }
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    maxWidth: "20%"
                                }}>
                                    <Form.Check checked={timeFlag} type={"checkbox"} label={"At time"}
                                                className={"unselectable script"}
                                                style={{justifyContent: "flex-start"}}
                                                onChange={(e) => setTimeFlag(e.target.checked)}/>
                                    From
                                    <Form.Control required value={time[0]} disabled={!timeFlag} style={{width: "min-content"}}
                                                  type={"time"}
                                                  onChange={(e) => setTime([e.target.value, time[1]])}/>
                                    To
                                    <Form.Control required value={time[1]} disabled={!timeFlag} style={{width: "min-content"}}
                                                  type={"time"}
                                                  onChange={(e) => setTime([time[0], e.target.value])}/>
                                    <Form.Check checked={periodFlag} type={"checkbox"} label={"0nce every x mins"}
                                                className={"unselectable script"}
                                                style={{justifyContent: "flex-start"}}
                                                onChange={(e) => setPeriodFlag(e.target.checked)}/>
                                    <Form.Control disabled={!periodFlag} value={period} style={{width: "100%"}}
                                                  type="number"
                                                  placeholder="Blank or zero for single trigger"
                                                  onChange={(e) => {
                                                      if (Number(e.target.value) < 0) {
                                                          e.target.value = ''
                                                      }
                                                      setPeriod(Number(e.target.value))
                                                  }}/>
                                </div>
                                <h1 className={"unselectable script"}>
                                    {"then"}
                                </h1>
                                <div style={{display: "flex", alignItems: "center"}}>
                                    {DropDown(setResult, result, ['Do not send signal', 'Send signal'])}
                                </div>
                            </div>
                            <div style={{display: "flex"}}>
                                {
                                    days.map((elem, idx) => {
                                        return <Button onClick={(e) => {
                                            let temp = [...daysFlag]
                                            temp[idx] = !temp[idx]
                                            setDaysFlag(temp)
                                        }} style={{backgroundColor: (daysFlag[idx] ? 'green' : 'grey')}}>{elem}</Button>
                                    })
                                }
                            </div>
                        </Form>
                    </div>
                </div>
            );
    }
}

