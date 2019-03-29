import React, { Component } from 'react';
import buzzBee from '../../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import cafe from './icons/icons8-cafe-filled-30.png'; //change this to svg or something we can use our custom color on
import './availablerooms.css';

export default class AvailableRooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    //When screen loads, get all the rooms (change styling based on radius to user's geolocation) within a radius - maybe a mile - of the user's location
    componentDidMount = () => {
        // axios.get().then(rooms => {
        //     this.setState({
        //         rooms: rooms.data
        //     })
        // })
    }

    render() {


        return (
            <div className='available-container'>
                <div className='available-header'>
                    <h1>buzz.</h1>
                </div>

                <main className='available-rooms'>

                    <div className='rooms-header'>
                        <h1 className='rooms-header__title'>
                            Berdena's
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
                                onClick={this.props.toggleHiveView}>
                                join
                            </button>
                        </div>

                    </div>
                </main>

            </div>
        )
    }
}