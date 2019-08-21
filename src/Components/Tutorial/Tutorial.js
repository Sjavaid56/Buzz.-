import React, { Component } from 'react';
import { Link } from "react-router-dom"
import ReactSwipe from 'react-swipe';
import "./Tutorial.css"
import buzzMap from "../../images/iPhone/screengrab-iphone-2.png"
import buzzSendDrink from "../../images/iPhone/send-honey-iphone.png"
import buzzMyDrinks from "../../images/iPhone/profile-2-iphone.png"
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
            if(this.state.count != 0){
                this.setState({
                    count:this.state.count -=1
                })
            }
                
                this.setState({
                    showFinish:false
                })
            reactSwipeEl.prev()
        }
        let caption;
        if(this.state.count == 1){
            caption = (
                <p>Gain Access to all the chat rooms within 500 feet of your location!</p>
            )
        }
        else if(this.state.count == 2){
            caption = (
                <p>Did someone post something that you think deserves some honey? Send them something from the chat's pre-defined menu of drinks!</p>
            )
        }
        else if(this.state.count == 3){
            caption = (
                <p>If someone sends you a drink, you'll recieve a notification and a voucher for your drink that is able to be redeemed only once.</p>
            )  
        }
        else{
            caption = ( 
                <p>Gain Access to all the chat rooms within 800 feet of your location!</p>)
        }
        console.log("Count:" , this.state.count)
        console.log("Finished? ", this.state.showFinish)
        
        return (
            <div className = "tutorial-parent">
                <div className = "Slider-parent">
                    <button className = "nav-button" onClick={() => handlePrevious() }><img src={back}></img></button>
                        <div className = "tutorial-parent__carousel-parent">
                            <ReactSwipe
                                className="carousel"
                                swipeOptions={{ continuous: false }}
                                ref={el => (reactSwipeEl = el)}
                            >
                                <div className = "Slide-Container"><img className = "Slide-image" src = {buzzMap}></img> </div>
                                <div className = "Slide-Container"><img className = "Slide-image" src = {buzzSendDrink}></img> </div>
                                <div className = "Slide-Container"><img className = "Slide-image" src = {buzzMyDrinks}></img></div>
                            </ReactSwipe>
                        </div>

                    {
                        this.state.count === 3? <Link to='/finishregistration'>
                    <button className = "nav-button" onClick={() =>handleNext() }><img className = "forward" src={back}></img></button>
                        </Link> 
                        :
                    <button className = "nav-button" onClick={() =>handleNext() }><img className = "forward" src={back}></img></button>
                    }
                        </div>

                        <div className = "text-container">
                        {caption}
                        </div>
                        
                    <div>
                </div>
            </div>
        )
    }
}

