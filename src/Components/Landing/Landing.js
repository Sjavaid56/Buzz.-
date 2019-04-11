import React, { Component } from 'react';
// import { Link } from "react-router-dom"
import BuzzBeeCharcoal from '../../images/assets/logo/buzz-logo-charcoal-nobg.png';
import BuzzBeeYellow from '../../images/assets/logo/buzz-logo-yellow-nobg.png'
// import screengrab from '../../images/iPhone/screengrab-iphone1.png';
import screengrab2 from '../../images/iPhone/screengrab-iphone-2.png';
import placeholderImg from '../../images/Portrait_Placeholder.png';
import placeholderVideo from '../../images/Puppy-4740.mp4';
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
                    <img src={screengrab2} className='screenshotBuzz' />
                    <div className='landing-top__right'>
                        <div className='landing-top__rightLogo'>
                            <h1>buzz.</h1>
                            <img src={BuzzBeeYellow} alt='bee logo in yellow' />
                        </div>
                        <p style={{ padding: '35px 0' }}>Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis. Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis.</p>
                        <button onClick={this.login}>Login/Register</button>
                    </div>
                </div>

                <div className='landing-middle'>
                    <div className='landing-middle__left'>
                        <video autoPlay loop muted playsInline>
                            <source src={placeholderVideo} type='video/mp4' />
                        </video>
                    </div>
                    <div className='landing-middle__right'>
                        <h1>What is buzz?</h1>
                        <p>Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis. Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis. Pariatur cupidatat laboris ea fugiat incididunt aliqua esse id duis enim quis.</p>
                    </div>
                </div>

                <div className='landing-bottom'>
                    <h1>About The Founders</h1>
                    <div className='landing-bottom__about'>
                        <div className='landing-bottom__aboutSection'>
                            <img src={placeholderImg} />
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
                            <img src={placeholderImg} />
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
                            <img src={placeholderImg} />
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
