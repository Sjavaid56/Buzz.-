import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import BuzzBeeCharcoal from '../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import './landing.css';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { connect } from "react-redux"
import {updateSocket} from "../../redux/reducer"

const socket = socketIOClient("http://localhost:4000/");

class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        axios.get('/api/user-data').then(response => {
            console.log(response.data)
        })
        this.props.updateSocket(socket)
    }

    login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth`);

        window.location = `https://${
            process.env.REACT_APP_AUTH0_DOMAIN
            }/authorize?client_id=${
            process.env.REACT_APP_AUTH0_CLIENT_ID
            }&scope=openid%20email%20profile&redirect_uri=${redirectUri}&response_type=code`;
    };

    render() {
        return (
            <div className='landing-container'>
                {/* <div className='landing-content'> */}
                <img src={BuzzBeeCharcoal} alt='bee logo in charcoal' />
                <h1>buzz.</h1>
                <button onClick={this.login}>Login/Register</button>
                {/* </div> */}
            </div>
        )
    }
}

export default connect( null, {updateSocket})(Landing)
