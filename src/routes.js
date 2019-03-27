import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import Landing from "./Components/Landing/Landing"
import LoginRegister from "./Components/LoginRegister/LoginRegister"
import Dashboard from "./Components/Dashboard/Dashboard"
import userProfile from "./Components/UserProfile/UserProfile"
import Tutorial from "./Components/Tutorial/Tutorial"
import Comment from "./Components/Room/CurrentRoom/Comments/Comments";
import DrinkSender from "./Components/Modals/DrinkSender";
import CurrentRoom from "./Components/Room/CurrentRoom/CurrentRoom"

export default(
    <Switch>
        <Route exact path = "/" component = {Landing}/>
        <Route path = "/loginRegister" component = {LoginRegister}/>
        <Route path = "/dashboard" component = {Dashboard}/>
        <Route path = "/profile" component = {userProfile}/>
        <Route path = "/tutorial" component = {Tutorial}/>
        {/* All below lines are for test purposes */}
        <Route path = "/comment" component = {Comment}/>
        <Route path = "/sweettest" component = {DrinkSender}/>
        <Route path = "/sweettest" component = {DrinkSender}/>
        <Route path = "/currentHive" component = {CurrentRoom}/>
    </Switch>
)
