import React, { Component } from 'react';
import './createPost.css';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div className='create-post__container'>
                {/* <p>get buzzing!</p> */}

                <input placeholder='get buzzing!' />

                <div className='create-post__buttonContainer'>
                    <button>
                        Add Photo
                    </button>
                    <button>
                        Emojis
                    </button>
                    <button>
                        Post
                    </button>
                </div>
                {/* This will need to correspond to a button in the header on the page with an onClick function which will then animate this component coming out/sliding out/whatever */}
            </div>
        )
    }
}
