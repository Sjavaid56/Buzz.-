import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { updateCurrentUser } from "../../redux/reducer";
import profileplaceholder from '../../images/Portrait_Placeholder.png';
import cancel from '../../images/icons8-delete-24.png';
import './userprofile.css';
import back from "../Room/CurrentRoom/back.png";
import drinkImg from "../../images/drink.png";
import warning from "../../images/warning.png";
import edit from '../../images/icons8-edit-24.png';
import anon from "../../images/Portrait_Placeholder.png"



class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showProfile: true,
            user: this.props.currentUser,
            userDrinks: [],
            code: false,
            redeemCode: [],
            input: false
        }
    }
    componentDidMount = () => {
        axios.get(`getUserDrinks/${this.props.currentUser.user_id}`).then(drinks => {
            this.setState({
                userDrinks: drinks.data
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
    toggleAnonymous = () => {
        console.log(this.props.currentUser)

    }

    //logout
    logout = () => {
        axios.post('/logout').then(() => {
            this.setState({ user: null });
            window.location = `/`;
        }).catch(err => console.log(err));
    };
    toggleCode = (drink) => {
        this.setState({
            code: !this.state.code
        })
        this.showCode(drink)
    }
    showCode = (drink) => {
        this.setState({
            redeemCode: [drink]
        })
    }
    deleteCode = (id) => {
        this.setState({
            redeemCode: []
        })
        axios.delete(`/deleteDrink/${id}/${this.props.currentUser.user_id}`).then(response => {
            this.setState({
                userDrinks: response.data
            })
        })
    }

    //edit username functionality
    editUsername = () => {
        console.log('edit username clicked')
        this.setState({
            input: !this.state.input
        })
    }

    submitUsername = () => {
        this.setState({
            input: !this.state.input
        })
    }

    render() {
        let { email, profile_name, picture, user_name } = this.props.currentUser
        let mappedDrinks = this.state.userDrinks.map((drink, index) => {
            return (
                <button className="dealParent-container__item" onClick={() => this.toggleCode(drink)}>
                    <img src={drinkImg}></img>
                    <p>{drink.drink_description}</p>
                </button>
            )
        })

        let currentCodeToShow = this.state.redeemCode.map(code => {
            console.log("CODE IN MAP", code)
            return (
                <div className="code-parent">

                    <div className="code-parent__button-container">
                        <button className="cancel-button" onClick={() => this.deleteCode(code.drink_id)}><img src={cancel}></img></button>
                    </div>

                    <div className="code-parent__content">
                        <div className="code-parent__content--img">
                            <img src={drinkImg}></img>
                        </div>

                        <p>
                            Show this coupon to your bartender to collect your drink.
                            </p>

                        <div className="warning">
                            <img src={warning}></img>
                            <p>Careful, after you exit you can't get this code back!</p>
                        </div>

                        <div className="code-parent__container">
                            <h1>
                                {code.coupon_code}
                            </h1>
                        </div>

                    </div>

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

                    {/* <div className = "goAnonToggle">
                        <p>Go incognito</p>
                        <label className="switch">
                            <input type="checkbox"
                            onClick = {(e) =>{this.toggleAnonymous()}}/>
                            <span className="slider round"></span>
                        </label>
                        </div> */}


                    <div className='profile-tabs'>
                        <button onClick={this.toggleProfile}>Profile</button>
                        <button onClick={this.toggleDrinks}>Honey</button>
                    </div>
                </div>

                <div className='profile-tabs__info'>
                    {this.state.showProfile ?
                        <div className='profile-tabs__infoProfile'>
                            {/* <h2>Profile</h2> */}

                            <h6>Username: <img src={edit} height={18} onClick={this.editUsername} /></h6>
                            {
                                this.state.input
                                    ?
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='profile-tabs__editUsername'>
                                        <input />
                                        <button onClick={this.submitUsername}>Submit</button>
                                    </div>
                                    :
                                    <p>@{user_name || 'No username on file'}</p>
                            }

                            <h6>Full Name:</h6>
                            <p>{profile_name}</p>

                            <h6>Email:</h6>
                            <p>{email}</p>

                            <h6>Payment</h6>
                            {/* <p>If payment method on file display 'payment method on file, button says 'update'? else Add Card</p> */}
                            <div className='profile-tabs__buttons'>
                                <button style={{ marginBottom: 30, marginTop: 5 }}>Add Card</button>
                                <button onClick={this.logout}>Logout</button>
                            </div>
                        </div>
                        :
                        <div className='profile-tabs__drinks'>

                            {this.state.redeemCode.length ? <div className="current-code-parent"><h2>{currentCodeToShow}</h2></div> : <h2>{mappedDrinks}</h2>}
                            {
                                this.state.redeemCode.length ?
                                    <div className="current-code-parent"><h2>{currentCodeToShow}</h2></div>
                                    :
                                    (mappedDrinks.length ? <h2>{mappedDrinks}</h2>
                                        :
                                        <div className="No_drinks-parent">
                                            You don't have any honey yet, when someone sends you some it will show up here!
                                    </div>
                                    )
                            }
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
