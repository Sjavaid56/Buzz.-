import React, { Component } from 'react';
import { Link } from "react-router-dom"
import axios from 'axios';

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    componentDidMount() {
        axios.get('/api/user-data').then(response => {
            console.log(response.data)
        })
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
            <div>
                Landing! Animations! Videos! Cool Stuff!
            </div>
        )
    }
}
