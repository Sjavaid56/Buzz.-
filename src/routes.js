import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./Components/Landing/Landing"
import Dashboard from "./Components/Dashboard/Dashboard"
// import userProfile from "./Components/UserProfile/UserProfile"
import FinishRegistration from './Components/UserProfile/FinishRegistration';
import Tutorial from "./Components/Tutorial/Tutorial"
import AdminDash from "./Components/AdminDashboard/AdminDashboard"

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path='/finishregistration' component={FinishRegistration} />
        <Route path='/adminDashboard' component={AdminDash} />
    </Switch>
)
