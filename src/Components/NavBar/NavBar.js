import React, {Component} from "react"
import "./NavBar.css"
import bee from "../../images/assets/logo/buzz-logo-charcoal-nobg.png"
import map from "../../images/MapIcon.png"
import profile from "../../images/Profile.png"

export default class NavBar extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        // toggleProfileRespFn = {this.toggleProfileResp} togglecurrentHiveRespFn = {this.togglecurrentHiveResp} toggleAllRoomsRespFn = {this.toggleAllRoomsResp}
        return(
            <div className = "NavBar-parent">
                <div className = "NavBar-parent__Hives">
                    <button onClick = {this.props.toggleAllRoomsRespFn } className = "NavBar-parent__Hives--button1"><img className = "NavBar-parent__Hives--logo" src = {bee}></img></button>
                </div>
                <div className = "NavBar-parent__Map">
                    <button onClick = {this.props.toggleMap} className = "NavBar-parent__Hives--button1"><img className = "NavBar-parent__Hives--logo" src = {map}></img></button>
                </div>
                <div className = "NavBar-parent__Profile">
                    <button onClick = {this.props.toggleProfileRespFn} className = "NavBar-parent__Hives--button1"><img className = "NavBar-parent__Hives--logo" src = {profile}></img></button>
                </div>
            </div>
        )
    }
}