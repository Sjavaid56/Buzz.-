import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateCurrentUser } from "../../redux/reducer";
import profileplaceholder from '../../images/Portrait_Placeholder.png';
import honeycomb from '../../images/15656.jpg';
import './userprofile.css';
import back from "../Room/CurrentRoom/back.png"

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        let { email, profile_name, picture, user_name } = this.props.currentUser
        console.log(this.props.currentUser)
        return (
            <div className='profile-parent'>

                <div className='profile-header'>

                    <div className="profile-parent__button-holder">
                        <button onClick={this.props.toggleProfileFn} className="profile-parent__back"><img src={back} /></button>
                    </div>
                    <img src={picture || profileplaceholder} alt='profile img'
                        className='profile-header__picture' />
                    <div className='profile-tabs'>
                        <button>Profile</button>
                        <button>Honey</button>
                    </div>
                </div>


                <div className='profile-tabs__info'>

                    <div className='profile-tabs__infoProfile'>
                        {/* <h2>Profile</h2> */}

                        <h6>Username:</h6>
                        <p>@{user_name || 'No username on file!'}</p>

                        <h6>Full Name:</h6>
                        <p>{profile_name}</p>

                        <h6>Email</h6>
                        <p>{email}</p>

                        <h2>Payment</h2>
                        <h6>Payment method on file</h6>
                        <button>Add Card</button>
                    </div>

                    <div className='profile-tabs__drinks'
                    >
                        <h2>Drinks</h2>
                        <p>map through user's drinks here</p>
                    </div>

                </div>

                {/* Customize Stripe's input fields then conditionally render button based on if user has added card before or not - and possibly display the user's drinks */}
                {/* if(card on file) {<button> add card</button>} else {<button>replace card</button>} */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps, { updateCurrentUser })(UserProfile);