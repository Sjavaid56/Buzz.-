import React, { Component } from 'react';
import "./Posts/CurrentRoom.css"
import back from "./back.png"

export default class CurrentRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className = "Current-room">
                <header className = "Current-room__header">
                    {/* Replace placeholder with props */}
                    {/* <div className = "Current-room__Info"> */}
                        <button className = "Current-room__back"><img src = {back}></img></button>
                        <p className = "Current-room__title">Berdena's</p>
                    {/* </div> */}
                </header>
                <main>

                Showing the current room - renders CREATE POST, mapped POSTS and mapped COMMENTS
                </main>
            </div>
        )
    }
}