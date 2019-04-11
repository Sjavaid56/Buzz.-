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
            count:1,
            showFinish:false
        }
    }
    
    

    render() {
        let reactSwipeEl;

        let handleNext = () =>{
            if(this.state.count < 3){
                this.setState({
                    count:this.state.count += 1
                })
            }
            if(this.state.count === 3){
                this.setState({
                    showFinish:true
                })
            }
            reactSwipeEl.next()
            
        }
        let handlePrevious = () =>{
            if(this.state.count !=0){
                this.setState({
                    count:this.state.count -=1
                })
            }
                
                this.setState({
                    showFinish:false
                })
            reactSwipeEl.prev()
        }
        console.log("Count:" , this.state.count)
        console.log("Finished? ", this.state.showFinish)
        
        return (
            <div className = "tutorial-parent">


                    <button className = "nav-button" onClick={() => handlePrevious() }><img src={back}></img></button>
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
                    {
                        this.state.count === 3? <Link to='/finishregistration'>
                    <button className = "nav-button" onClick={() =>handleNext() }><img className = "forward" src={back}></img></button>
                        </Link> 
                        :
                        <button className = "nav-button" onClick={() =>handleNext() }><img className = "forward" src={back}></img></button>
                    }
        
        <div>
            
        </div>
            </div>
        )
    }
}