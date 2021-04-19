import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import ManEdit from "./Pages/ManEdit";
import RuleEdit from "./Pages/RuleEdit";
import NotFound from "./Pages/NotFound";
import List from "./Pages/List";
import Login from "./Pages/Login";
import AttributeEdit from "./Pages/AttributeEdit";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/:id" component={List}/> {/*remove for 404*/}
            <Route exact path="/Workers/:man" component={ManEdit}/>
            <Route exact path="/Admins/:man" component={ManEdit}/>
            <Route exact path="/Rules/:rule" component={RuleEdit}/>
            <Route exact path="/Attributes/:attribute" component={AttributeEdit}/>
            <Route exact path="/Access_denied" component={NotFound}/>
            <Redirect from="/" to="/Attributes"/>
            <Redirect from="*" to="/"/>
        </Switch>
    );
}
