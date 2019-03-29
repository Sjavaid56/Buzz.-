import React, { Component } from 'react';
import profileplaceholder from '../../images/Portrait_Placeholder.png';
import './userprofile.css';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        // console.log(this.props)
        return (
            <div className='profile-parent'>
                <div className='profile-header'>
                    <img src={profileplaceholder}
                        className='profile-header__picture' />
                </div>

                <div className='profile-tabs'>
                    <button>Profile</button>
                    <button>Drinks</button>
                </div>

                <div className='profile-tabs__info'>

                    <div className='profile-tabs__infoProfile'>
                        <h2>Profile</h2>

                        <p>Username:</p>
                        <p>@whatever</p>

                        <p>Full Name:</p>
                        <p>Bobby Berk</p>

                        <p>Email</p>
                        <p>useremail@email.com</p>

                        <h2>Payment</h2>
                        <p>Payment method on file</p>
                        <button>Add Card</button>
                    </div>

                    <div id="Drinks" className='profile-tabs__infoDrinks'
                    >
                        <h2>Drinks</h2>
                        <p>map through user's drinks here</p>
                    </div>


                </div>

                <div>
                    Render user's profile - information, payment information - customize Stripe's input fields then conditionally render button based on if user has added card before or not - and possibly display the user's drinks
                    {/* if(card on file) {<button> add card</button>} else {<button>replace card</button>} */}
                </div>
            </div>
        )
    }
}