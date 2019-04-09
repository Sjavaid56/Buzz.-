import React, {Component} from "react"
import "./AdminMain.css"
import CurrentRoom from "../Room/CurrentRoom/CurrentRoom"

export default class AdminMain extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        console.log("Props in admin main: ", this.props)
        return(
            <div className = "AdminMain-Parent">
                Main page
                <CurrentRoom socket = {this.props.socket}/>
            </div>
        )
    }
}