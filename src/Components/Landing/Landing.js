import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import BuzzBeeCharcoal from '../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import BuzzBeeYellow from '../../images/assets/logo/buzz-logo-yellow-nobg.png'
// import screengrab from '../../images/iPhone/screengrab-iphone1.png';
import screengrab2 from '../../images/iPhone/screengrab-iphone-2.png';
import placeholderImg from '../../images/Portrait_Placeholder.png';
import socialVideo from '../../images/Lunch - 2339_Trim.mp4';
import liLogo from '../../images/icons8-linkedin-104.png';
import ghLogo from '../../images/icons8-github-filled-100.png';
import './landing.css';
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
            <div className='landing-container'>

                <div className='landing-top'>
                    <div className='landing-top__right'>
                        <div className='landing-top__rightLogo'>
                            <h1>buzz.</h1>
                            <img className='buzz-bee' src={BuzzBeeYellow} alt='bee logo in yellow' />
                        </div>
                        <p style={{ padding: '35px 0' }}>Meet and chat with other people at your location. The possibilities are endless. Click below to start buzzing now.</p>
                        <button onClick={this.login}>Login/Register</button>
                    </div>
                    <img src={screengrab2} className='screenshotBuzz' />
                </div>

                <div className='landing-middle'>
                    <div className='landing-middle__left'>
                        <video autoPlay loop muted playsInline>
                            <source src={socialVideo} type='video/mp4' />
                        </video>
                    </div>
                    <div className='landing-middle__right'>
                        <h1>What is buzz?</h1>
                        <p>Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis. Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis. Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis.</p>
                    </div>
                </div>

                <div className='landing-bottom'>
                    <h1>About Our Team</h1>
                    <div className='landing-bottom__about'>
                        <div className='landing-bottom__aboutSection'>
                            <img src="https://media.licdn.com/dms/image/C5603AQGZf9jlQAIqWw/profile-displayphoto-shrink_800_800/0?e=1560384000&v=beta&t=XGBXOmc4B8mZhygkMnrcpRx9FdZFwG8y4YP9XiR-ejU" />
                            <h2>Brittany French</h2>
                            <p>Ad eu esse eiusmod officia quis eiusmod consectetur ipsum sunt irure labore cillum cupidatat.</p>
                            <div className='landing-bottom__logos'>
                                <a href='www.linkedin.com/in/brittanyfrench' >
                                    <img src={liLogo} alt='linkedin logo in black' />
                                </a>
                                <a href='github.com/frenchie048' >
                                    <img src={ghLogo} alt='github logo in black' />
                                </a>
                            </div>
                        </div>
                        <div className='landing-bottom__aboutSection'>
                            <img src="https://media.licdn.com/dms/image/C4D03AQFE3ikNPGC8XA/profile-displayphoto-shrink_200_200/0?e=1560384000&v=beta&t=NjpOpDxg8nxSiQJomJHfMoScUxl5WPpGKRvC1vMMzgQ" />
                            <h2>Zach Hirschman</h2>
                            <p>Ad eu esse eiusmod officia quis eiusmod consectetur ipsum sunt irure labore cillum cupidatat.</p>
                            <div className='landing-bottom__logos'>
                                <a href='https://www.linkedin.com/in/zach-hirschman/' >
                                    <img src={liLogo} alt='linkedin logo in black' />
                                </a>
                                <a href='https://github.com/zachhirschman' >
                                    <img src={ghLogo} alt='github logo in black' />
                                </a>
                            </div>
                        </div>
                        <div className='landing-bottom__aboutSection'>
                            <img src="https://media.licdn.com/dms/image/C5603AQHQRGJfxTsKyA/profile-displayphoto-shrink_800_800/0?e=1560384000&v=beta&t=824DSTY-imzBt-UgrSK0ZD0fBhfUKQyP-fSiKf17hlM" />
                            <h2>Shawn Javaid</h2>
                            <p>Ad eu esse eiusmod officia quis eiusmod consectetur ipsum sunt irure labore cillum cupidatat.</p>
                            <div className='landing-bottom__logos'>
                                <a href='https://www.linkedin.com/in/shaian-javaid/' >
                                    <img src={liLogo} alt='linkedin logo in black' />
                                </a>
                                <a href='https://github.com/Sjavaid56'>
                                    <img src={ghLogo} alt='github logo in black' />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
