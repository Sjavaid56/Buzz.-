import React, { Component } from 'react';
import { Link } from "react-router-dom"
import ReactSwipe from 'react-swipe';
import "./Tutorial.css"
import buzzMap from "../../images/assets/buzzAvailable.png"
import buzzSendDrink from "../../images/assets/buzzSendDrink.png"
import buzzMyDrinks from "../../images/assets/buzzMyDrinks.png"
import back from "../../Components/Room/CurrentRoom/back.png"

export default class Tutorial extends Component {
    constructor(props) {
        super(props);

        this.state = {
            
        }
    }

    render() {
        let reactSwipeEl;
        return (
            <div className = "tutorial-parent">

            <div className ="_button" >
                          
            </div>

        <button className = "nav-button" onClick={() => reactSwipeEl.prev()}><img src={back}></img></button>
        <div className = "tutorial-parent__carousel-parent">
            <ReactSwipe
                className="carousel"
                swipeOptions={{ continuous: false }}
                ref={el => (reactSwipeEl = el)}
            >
                <div className = "Slide-Container"><img className = "Slide-image" src = {buzzMap}></img> <div className = "Caption-container"><p>Gain Access to all the chat rooms within 500 feet of your location!</p></div></div>
                <div className = "Slide-Container"><img className = "Slide-image" src = {buzzSendDrink}></img> <div className = "Caption-container"><p>Did someone post something that you think deserves some honey? Send them something from the chat's pre-defined menu of drinks!</p></div></div>
                <div className = "Slide-Container"><img className = "Slide-image" src = {buzzMyDrinks}></img> <div className = "Caption-container"><p>If someone sends you a drink, you'll recieve a notification and a voucher for your drink that is able to be redeemed only once.</p></div></div>
            </ReactSwipe>
        </div>
        <button className = "nav-button" onClick={() => reactSwipeEl.next()}><img className = "forward" src={back}></img></button>
        <div>
            
        </div>
            
    
                
        <div>
            
        </div>
        <button>
            <Link to='/finishregistration'>
                Got it!
            </Link>
        </button>
            </div>
        )
    }
}