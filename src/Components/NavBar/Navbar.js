import React, {Component} from "react"
import "./NavBar.css"

export default class NavBar extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div className = "NavBar-parent">
                <div>
                    <button>Hives</button>
                </div>
                <div>
                    <button>Map</button>
                </div>
                <div>
                    <button>Profile</button>
                </div>
            </div>
        )
    }
}