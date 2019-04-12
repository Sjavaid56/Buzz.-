import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import Map from '../GoogleMaps/GoogleMaps'
import AvailableRooms from "../Room/AvailableRooms/AvailableRooms"
import CurrentRoom from '../Room/CurrentRoom/CurrentRoom';
import './dashboard.css';
import Axios from 'axios';
import { connect } from "react-redux"
import { updateCurrentUser } from "../../redux/reducer"
import Profile from "../UserProfile/UserProfile"
import NavBar from "../NavBar/NavBar"

const socket = socketIOClient();

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentHive: false,
            width: window.innerWidth,
            showProfile: false,
            showCurrent: false,
            //Responsive toggles
            isResponsive: true,
            ProfileResp: false,
            currentHiveResp: false,
            AllRoomsResp: false
        }

    }
    //Get user data on mount
    componentDidMount = () => {
        Axios.get("/api/user-data").then(userData => {
            console.log("USER DATA: ", userData)
            this.props.updateCurrentUser(userData.data)
        })
    }
    componentWillMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }
    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    //Desktop toggles
    toggleHiveView = () => {
        this.setState({
            currentHive: !this.state.currentHive
        })
    }
    toggleProfile = () => {
        console.log(this.state.showProfile)
        this.setState({
            showProfile: !this.state.showProfile
        })
    }

    //Responsive Toggles
    toggleProfileResp = () => {
        // this.toggleMap()
        this.setState({
            ProfileResp: !this.state.ProfileResp,
            isResponsive: true,
            currentHiveResp: false,
            AllRoomsResp: false
        })
        console.log("PROFILE", this.state)
    }

    togglecurrentHiveResp = () => {
        this.setState({
            currentHiveResp: !this.state.currentHiveResp,
            isResponsive: true,
            ProfileResp: false,
            AllRoomsResp: false
        })
        console.log("CURRENT ROOM", this.state)
    }
    toggleAllRoomsResp = () => {
        this.setState({
            AllRoomsResp: !this.state.AllRoomsResp,
            isResponsive: true,
            ProfileResp: false,
            currentHiveResp: false

        })
        console.log("ALL ROOMS", this.state)
    }
    toggleMap = () => {
        this.setState({
            isResponsive: true,
            ProfileResp: false,
            currentHiveResp: false,
            AllRoomsResp: false
        })
        console.log('MAP', this.state)
    }

    render() {
        console.log(this.props.currentUser)
         let dashView
        if (this.state.width >= 500) {
            dashView = (
                <div>
                    <div className='dashboard-container'>
                        <div className='hive-container'>
                            {
                                this.state.currentHive ?
                                    <CurrentRoom socket={socket} toggleHiveView={this.toggleHiveView} />
                                    :
                                    (this.state.showProfile ? <Profile toggleProfileFn={this.toggleProfile} /> : <AvailableRooms socket={socket} toggleHiveView={this.toggleHiveView} toggleProfileFn={this.toggleProfile} />)
                            }
                        </div>

                        <div className='map-container'>
                            <Map />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            if (this.state.isResponsive) {
                if (this.state.ProfileResp) {
                    dashView = (
                        <div className='map-container__responsive'>
                            <Profile />
                            <NavBar toggleMap={this.toggleMap} toggleProfileRespFn={this.toggleProfileResp} togglecurrentHiveRespFn={this.togglecurrentHiveResp} toggleAllRoomsRespFn={this.toggleAllRoomsResp} />
                        </div>
                    )
                }
                else if (this.state.currentHiveResp) {
                    dashView = (
                        <div className='map-container__responsive'>
                            <CurrentRoom socket={socket} />
                            <NavBar toggleMap={this.toggleMap} toggleProfileRespFn={this.toggleProfileResp} togglecurrentHiveRespFn={this.togglecurrentHiveResp} toggleAllRoomsRespFn={this.toggleAllRoomsResp} />
                        </div>
                    )
                }
                else if (this.state.AllRoomsResp) {
                    // if(this.state.currentHive){
                    dashView = (
                        <div className='map-container__responsive'>

                            {
                                this.state.currentHive ?
                                    (
                                        <div className='hive-container'>
                                            <CurrentRoom socket={socket} toggleHiveView={this.toggleHiveView} />
                                            <NavBar toggleMap={this.toggleMap} toggleProfileRespFn={this.toggleProfileResp} togglecurrentHiveRespFn={this.togglecurrentHiveResp} toggleAllRoomsRespFn={this.toggleAllRoomsResp} />
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            <AvailableRooms socket={socket} toggleHiveView={this.toggleHiveView} toggleProfileFn={this.toggleProfile} />
                                            <NavBar toggleMap={this.toggleMap} toggleProfileRespFn={this.toggleProfileResp} togglecurrentHiveRespFn={this.togglecurrentHiveResp} toggleAllRoomsRespFn={this.toggleAllRoomsResp} />
                                        </div>
                                    )
                            }

                        </div>
                    )

                    // )
                    // }
                    // else{
                    //     dashView = (<div className='map-container__responsive'>
                    //         <AvailableRooms/>
                    //         <NavBar toggleMap = {this.toggleMap} toggleProfileRespFn = {this.toggleProfileResp} togglecurrentHiveRespFn = {this.togglecurrentHiveResp} toggleAllRoomsRespFn = {this.toggleAllRoomsResp}/>
                    //     </div>)
                    // }
                }
                else {
                    dashView = (
                        <div className='map-container__responsive'>
                            <Map />
                            <NavBar toggleMap={this.toggleMap} toggleProfileRespFn={this.toggleProfileResp} togglecurrentHiveRespFn={this.togglecurrentHiveResp} toggleAllRoomsRespFn={this.toggleAllRoomsResp} />
                        </div>
                    )
                }
            }

        }
        return (
            <div>
                {dashView}
            </div>
        )
    }
}
export default connect(null, { updateCurrentUser })(Dashboard)
