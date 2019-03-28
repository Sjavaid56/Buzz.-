import React, { Component } from 'react';
import './createPost.css';
import Axios from 'axios';

export default class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message:""
        }
    }
    handleChange = (value) =>{
        this.setState({
            message:value
        })
    }
    sendPost = () =>{
        //Need to have current user to send username, poster_pic
        //Need to have current room info to send to specific room
        //Below is placeholder information until specific data is accessible
        let body = {
            post_content:this.state.message,
            poster_username:"Test User",
            poster_pic:"https://tinyurl.com/y4qvnf77",
            upvotes:0,
            downvotes:0,
            drinks_given:0,
            room_id:1
        }
        Axios.post("/newPost", body).then(response =>{
            console.log("New message: ", response.data)
        })
    }

    render() {
        return (
            <div className='create-post__container'>
                {/* <p>get buzzing!</p> */}

                <input onChange = {(e) =>{this.handleChange(e.target.value)}} placeholder='get buzzing!' />

                <div className='create-post__buttonContainer'>
                    <button>
                        Add Photo
                    </button>
                    <button>
                        Emojis
                    </button>
                    <button onClick = {this.sendPost}>
                        Post
                    </button>
                </div>
                {/* This will need to correspond to a button in the header on the page with an onClick function which will then animate this component coming out/sliding out/whatever */}
            </div>
        )
    }
}
