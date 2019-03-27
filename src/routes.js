import React, {Component} from "react"
import {Switch, Route} from "react-router-dom"
import Landing from "./Components/Landing/landing"
import LoginRegister from "./Components/LoginRegister/loginregister"
import Dashboard from "./Components/Dashboard/dashboard"
import userProfile from "./Components/UserProfile/UserProfile"
import Tutorial from "./Components/Tutorial/Tutorial"
import Comment from "./Components/Room/CurrentRoom/Comments/Comments";
import DrinkSender from "./Components/Modals/DrinkSender";


export default(
    <Switch>
        <Route exact path = "/" component = {Landing}/>
        <Route path = "/loginRegister" component = {LoginRegister}/>
        <Route path = "/dashboard" component = {Dashboard}/>
        <Route path = "/profile" component = {userProfile}/>
        <Route path = "/tutorial" component = {Tutorial}/>
        <Route path = "/comment" component = {Comment}/>
        <Route path = "/sweettest" component = {DrinkSender}/>
    </Switch>
)
