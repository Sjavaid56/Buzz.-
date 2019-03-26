import React, { Component } from 'react';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                Render user's profile - information, payment information - customize Stripe's input fields then conditionally render button based on if user has added card before or not - and possibly display the user's drinks
                {/* if(card on file) {<button> add card</button>} else {<button>replace card</button>} */}
            </div>
        )
    }
}