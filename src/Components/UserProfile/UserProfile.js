import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios'
import { updateCurrentUser } from "../../redux/reducer";
import profileplaceholder from '../../images/Portrait_Placeholder.png';
import honeycomb from '../../images/15656.jpg';
import './userprofile.css';
import back from "../Room/CurrentRoom/back.png"
import drinkImg from "../../images/drink.png"

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProfile: true,
            user: this.props.currentUser,
            userDrinks:[],
            code:false
        }
    }
    componentDidMount = () =>{
        axios.get(`getUserDrinks/${this.props.currentUser.user_id}`).then(drinks =>{
            this.setState({
                userDrinks:drinks.data
            })
            console.log("Got drinks for user: ", drinks.data)
        })
    }

    toggleProfile = () => {
        this.setState({
            showProfile: true
        })
    }

    toggleDrinks = () => {
        this.setState({
            showProfile: false
        })
    }

    //logout
    logout = () => {
        axios.post('/logout').then(() => {
            this.setState({ user: null });
            window.location = `/`;
        }).catch(err => console.log(err));
    };
    toggleCode = () =>{
        this.setState({
            code:!this.state.code
        })
    }   

    render() {
        let { email, profile_name, picture, user_name } = this.props.currentUser
        let mappedDrinks = this.state.userDrinks.map((drink, index) =>{
            return(
                <button className = "dealParent-container__item" onClick = {this.toggleCode}>
                    <img src = {drinkImg}></img>
                    {/* <h2>{drink.drink_description}</h2> */}
                    <h2>{drink.drink_description}</h2>
                </button>
            )
        })
        let mappedCodes = this.state.userDrinks.map(drinkElement =>{
            return(
                <div>
                    <h1>{drinkElement.coupon_code}</h1>
                </div>
            )
        })
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
                        <button onClick={this.toggleProfile}>Profile</button>
                        <button onClick={this.toggleDrinks}>Honey</button>
                    </div>
                </div>

                <div className='profile-tabs__info'>
                    {this.state.showProfile ?
                        <div className='profile-tabs__infoProfile'>
                            {/* <h2>Profile</h2> */}

                            <h6>Username:</h6>
                            <p>@{user_name || 'No username on file!'}</p>

                            <h6>Full Name:</h6>
                            <p>{profile_name}</p>

                            <h6>Email:</h6>
                            <p>{email}</p>

                            <h6>Payment</h6>
                            <p>If payment method on file display 'payment method on file, button says 'update'? else Add Card</p>
                            <button>Add Card</button>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                        :
                        <div className='profile-tabs__drinks'>
                            {this.state.code? <h2>{mappedCodes}</h2> : <h2>{mappedDrinks}</h2>}
                        </div>
                    }


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