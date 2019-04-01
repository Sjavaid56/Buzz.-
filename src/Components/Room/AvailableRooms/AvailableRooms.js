import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateCurrentRoom } from '../../../redux/reducer';
import buzzBee from '../../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import axios from 'axios';
import cafe from './icons/icons8-cafe-filled-30.png';
//change this to svg or something we can use our custom color on
import './availablerooms.css';
// import CurrentRoom from '../CurrentRoom/CurrentRoom';
import NavBar from "../../NavBar/NavBar"
import swal from '@sweetalert/with-react'
import drink from "../../../images/drink.png"

class AvailableRooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            width:window.innerWidth
        }
        this.props.socket.on("NewDrinkSent", body =>{
            if(body.recipient_id === this.props.currentUser.user_id){
                console.log("body on new drink", body)
                this.newDrinkAlert(body.sender_name, body.drink_description)
            }
        })

    }

    //When screen loads, get all the rooms (change styling based on radius to user's geolocation) within a radius - maybe a mile - of the user's location
    componentDidMount = () => {
        let distance = (lat1, lon1, lat2, lon2, unit)  => {
            var radlat1 = Math.PI * lat1/180
            var radlat2 = Math.PI * lat2/180
            var radlon1 = Math.PI * lon1/180
            var radlon2 = Math.PI * lon2/180
            var theta = lon1-lon2
            var radtheta = Math.PI * theta/180
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist)
            dist = dist * 180/Math.PI
            dist = dist * 60 * 1.1515
            if (unit=='K') { dist = dist * 1.609344 }
            if (unit=='N') { dist = dist * 0.8684 }
            return dist
        }
        
        axios.get('/getRooms').then(rooms => {
            // this.setState({
            //     rooms: rooms.data
            // })
            setTimeout(() =>{
                let availableRooms = rooms.data.filter((value) =>{
                    return distance(this.props.currentLocation.latitude,this.props.currentLocation.longitude,value.latitude,value.longitude, "K") <= 0.5
                })
                this.setState({
                    rooms:availableRooms
                })
            },500)
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

    newDrinkAlert = (name, drink_description) =>{
        if(name == null){
            name = "Someone"
        }
        swal({
            buttons:true,
            icon:drink,
            className:"SendDrink",
            title:`${name} sent you a ${drink_description}!`
        })
    }


    joinSingleRoom = (room_id, business_name) => {
        this.props.updateCurrentRoom({ room_id, business_name });

        let body = {
            room_id: room_id,
        }

        this.props.socket.emit('JoinedRoom', body)

        this.props.toggleHiveView();
    }
     

    render() {


        let mappedRooms = this.state.rooms.map((room) => {
            
            return (
                <div key={room.room_id} className='available-rooms'>
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
                            <p>{room.number_of_users}</p>
                        </div>
    
                        <div className='rooms-footer__button'>
                            <button
                                onClick={() => this.joinSingleRoom(room.room_id, room.business_name)}>
                                join
                        </button>
                        </div>
    
                    </div>
                </div>
                )
            
        })

        return (
            <div className='available-container'>
                <div className='available-header'>
                    {
                        this.state.width >= 500? 
                        <button className="available-container__profileView" onClick={this.props.toggleProfileFn}>
                            <img src={this.props.currentUser.picture}></img>
                        </button>
                        :
                        null
                    }
                    <h1 className='available-header__title'>buzz.</h1>
                </div>

                <main className='mapped-businesses'>
                    {mappedRooms}

                </main>

            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currentRoom: state.currentRoom,
        currentUser: state.currentUser,
        currentLocation: state.currentLocation
    }
}

export default connect(mapStateToProps, { updateCurrentRoom })(AvailableRooms);