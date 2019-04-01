import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class FinishRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                After tutorial, finish profile here - REQUIRED add username, OPTIONAL add card

                <button>
                    <Link to='/dashboard'>
                        Finish Registration!
                    </Link>
                </button>
            </div>
        )
    }
}