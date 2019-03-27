import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Map from '../GoogleMaps/GoogleMaps'
import AvailableRooms from "../Room/AvailableRooms/AvailableRooms"
import CurrentRoom from '../Room/CurrentRoom/CurrentRoom';
import './dashboard.css';

const socket = socketIOClient();

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className='dashboard-container'>

                <div className='hive-container'>
                    <CurrentRoom />
                </div>

                <div className='map-container'>
                    <Map />
                </div>


            </div>
        )
    }
}
