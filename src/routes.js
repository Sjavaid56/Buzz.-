import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./Components/Landing/Landing"
import Dashboard from "./Components/Dashboard/Dashboard"
import userProfile from "./Components/UserProfile/UserProfile"
import FinishRegistration from './Components/UserProfile/FinishRegistration';
import Tutorial from "./Components/Tutorial/Tutorial"
import Comment from "./Components/Room/CurrentRoom/Comments/Comments";
import DrinkSender from "./Components/Modals/DrinkSender";
import CurrentRoom from "./Components/Room/CurrentRoom/CurrentRoom"
import Post from "./Components/Room/CurrentRoom/Posts/Posts";

export default (
    <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={userProfile} />
        <Route path="/tutorial" component={Tutorial} />
        <Route path='/finishregistration' component={FinishRegistration} />
        {/* All below lines are for test purposes */}
        {/* <Route path = "/comment" component = {Comment}/>
        <Route path = "/sweettest" component = {DrinkSender}/>
        <Route path = "/sweettest" component = {DrinkSender}/>
        <Route path = "/currentHive" component = {CurrentRoom}/> */}
        <Route path="/post" component={Post} />
    </Switch>
)
