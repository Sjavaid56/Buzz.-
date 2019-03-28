import React, { Component } from 'react';
import { Link } from "react-router-dom"

export default class Tutorial extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                Carousel for Tutorial
                -explain toggle for anonymity
                -explain buying a drink

                <button>
                    <Link to='/finishregistration'>
                        Got it!
                    </Link>
                </button>
            </div>
        )
    }
}