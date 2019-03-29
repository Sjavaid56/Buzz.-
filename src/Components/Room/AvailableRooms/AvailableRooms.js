import React, { Component } from 'react';
import buzzBee from '../../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import axios from 'axios';
import cafe from './icons/icons8-cafe-filled-30.png';
//change this to svg or something we can use our custom color on
import './availablerooms.css';
import axios from "axios"

export default class AvailableRooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            currentRoomData: []
        }

        props.socket.on('SendRoomData', roomData => {
            this.setState({
                currentRoomData: roomData
            })
        })
    }

    //When screen loads, get all the rooms (change styling based on radius to user's geolocation) within a radius - maybe a mile - of the user's location
    componentDidMount = () => {
<<<<<<< HEAD
        axios.get("/getRooms").then(rooms => {
=======
        axios.get('/getRooms').then(rooms => {
>>>>>>> 7fe1e8882e3079e3c2938d99adb41c7b3ed64be7
            this.setState({
                rooms: rooms.data
            })
        })
    }

<<<<<<< HEAD
    render() {
        let mappedRooms = this.state.rooms.map((room, index) => {
=======
    joinSingleRoom = (room_id) => {
        let body = {
            business_name: this.state.rooms.business_name,
            business_type: this.state.rooms.business_type,
            latitude: this.state.rooms.latitude,
            longitude: this.state.rooms.longitude,
            number_of_users: this.state.rooms.number_of_users
        }

        this.props.socket.emit('JoinedRoom', body)

    }

    render() {
        console.log(this.state.currentRoomData)

        let mappedRooms = this.state.rooms.map((room) => {
>>>>>>> 7fe1e8882e3079e3c2938d99adb41c7b3ed64be7
            return (<div className='available-rooms'>
                <div className='rooms-header'>
                    <h1 className='rooms-header__title'>
                        {room.business_name}
                    </h1>
                    <h3 className='rooms-header__distance'>
                        800 ft
<<<<<<< HEAD
                </h3>
=======
                    </h3>
>>>>>>> 7fe1e8882e3079e3c2938d99adb41c7b3ed64be7
                </div>

                <div className='rooms-footer'>

                    <div className='rooms-footer__icons'>
                        <img src={cafe} className='room-type__icon' />

                        <img style={{ height: 22, width: 22 }}
                            src={buzzBee} className='room-user__bee' />
<<<<<<< HEAD
                        <p>{room.number_of_users}</p>
=======
                        <p>10</p>
>>>>>>> 7fe1e8882e3079e3c2938d99adb41c7b3ed64be7
                    </div>

                    <div className='rooms-footer__button'>
                        <button
                            onClick={this.props.toggleHiveView}>
                            join
                    </button>
                    </div>

                </div>
            </div>
            )
        })

        console.log(this.state.rooms);
        return (
            <div className='available-container'>
                <div className='available-header'>
                    <h1>buzz.</h1>
                </div>

<<<<<<< HEAD
                <main className = "available-container__mappedRooms">
=======
                <main className='mapped-businesses'>
>>>>>>> 7fe1e8882e3079e3c2938d99adb41c7b3ed64be7
                    {mappedRooms}
                </main>

            </div>
        )
    }
}