import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateCurrentRoom } from '../../../redux/reducer';
import buzzBee from '../../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import axios from 'axios';
import cafe from './icons/icons8-cafe-filled-30.png';
//change this to svg or something we can use our custom color on
import './availablerooms.css';
// import CurrentRoom from '../CurrentRoom/CurrentRoom';

class AvailableRooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],

        }


    }

    //When screen loads, get all the rooms (change styling based on radius to user's geolocation) within a radius - maybe a mile - of the user's location
    componentDidMount = () => {
        axios.get('/getRooms').then(rooms => {
            this.setState({
                rooms: rooms.data
            })
        })
    }

    joinSingleRoom = (room_id) => {
        this.props.updateCurrentRoom(room_id);

        let body = {
            room_id: room_id
        }

        this.props.socket.emit('JoinedRoom', body)

        this.props.toggleHiveView();
    }

    render() {
        // console.log(this.state.currentRoomData)

        let mappedRooms = this.state.rooms.map((room) => {
            return (<div key={room.room_id} className='available-rooms'>
                <div className='rooms-header'>
                    <h1 className='rooms-header__title'>
                        {room.business_name}
                    </h1>
                    <h3 className='rooms-header__distance'>
                        800 ft
                    </h3>
                </div>

                <div className='rooms-footer'>

                    <div className='rooms-footer__icons'>
                        <img src={cafe} className='room-type__icon' />

                        <img style={{ height: 22, width: 22 }}
                            src={buzzBee} className='room-user__bee' />
                        <p>10</p>
                    </div>

                    <div className='rooms-footer__button'>
                        <button
                            onClick={() => this.joinSingleRoom(room.room_id)}>
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

                <main className='mapped-businesses'>
                    {mappedRooms}
                </main>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentRoom: state.currentRoom
    }
}

export default connect(mapStateToProps, { updateCurrentRoom })(AvailableRooms);