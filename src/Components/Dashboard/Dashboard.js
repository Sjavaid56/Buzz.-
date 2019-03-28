import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Map from '../GoogleMaps/GoogleMaps'
import AvailableRooms from "../Room/AvailableRooms/AvailableRooms"
import CurrentRoom from '../Room/CurrentRoom/CurrentRoom';
import './dashboard.css';
import Axios from 'axios';
import {connect} from "react-redux"
import { updateCurrentUser } from "../../redux/reducer"

const socket = socketIOClient();

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    //Get user data on mount
    componentDidMount = () =>{
        Axios.get("/api/user-data").then(userData =>{
            this.props.updateCurrentUser(userData.data)
        })
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
export default connect(null, {updateCurrentUser})(Dashboard)
