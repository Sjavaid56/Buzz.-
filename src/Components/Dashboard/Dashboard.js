import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Map from '../GoogleMaps/GoogleMaps'
import AvailableRooms from "../Room/AvailableRooms/AvailableRooms"
import CurrentRoom from '../Room/CurrentRoom/CurrentRoom';
import './dashboard.css';
import Axios from 'axios';
import { connect } from "react-redux"
import { updateCurrentUser } from "../../redux/reducer"

const socket = socketIOClient("http://localhost:4000/");

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentHive: false
        }
    }
    //Get user data on mount
    componentDidMount = () => {
        Axios.get("/api/user-data").then(userData => {
            this.props.updateCurrentUser(userData.data)
        })
    }

    toggleHiveView = () => {
        this.setState({
            currentHive: !this.state.currentHive
        })
    }

    render() {
        console.log(this.state.currentHive)
        return (
            <div className='dashboard-container'>

                <div className='hive-container'>
                    {
                        this.state.currentHive ?
                            <CurrentRoom socket={socket} toggleHiveView={this.toggleHiveView} />
                            :
<<<<<<< HEAD
                            <AvailableRooms toggleHiveView={this.toggleHiveView} socket = {socket}/>
=======
                            <AvailableRooms socket={socket} toggleHiveView={this.toggleHiveView} />
>>>>>>> 7fe1e8882e3079e3c2938d99adb41c7b3ed64be7
                    }
                </div>

                <div className='map-container'>
                    <Map />
                </div>


            </div>
        )
    }
}
export default connect(null, { updateCurrentUser })(Dashboard)
