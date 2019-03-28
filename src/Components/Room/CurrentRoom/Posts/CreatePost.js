import React, { Component } from 'react';
import './createPost.css';
import Axios from 'axios';
import {connect} from 'react-redux'



class CreatePost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message:""
        }
        props.socket.on("Newmessage", post =>{
            console.log("New post: ", post)
        })
    }
    handleChange = (value) =>{
        this.setState({
            message:value
        })
    }
    sendPost = () =>{
        //UPDATED TO SEND NEW POST WITH ACTUAL USER INFORMATION, NEED TO GET USERNAME THOUGH
        //Need to have current room info to send to specific room
        //Below is placeholder information until specific data is accessible
        let body = {
            post_content:this.state.message,
            poster_username:this.props.currentUser.profile_name,
            poster_pic:this.props.currentUser.picture,
            upvotes:0,
            downvotes:0,
            drinks_given:0,
            room_id:1
        }
        console.log("Sending body: ", body)
        Axios.post("/newPost", body).then(response =>{
            console.log("New message: ", response.data)
        })
        console.log(this.props.socket)
        this.props.socket.emit("NewPost", body)
    }

    render() {
        console.log("Props in create post: " , this.props)
        console.log("hi")
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
const mapStateToProps = (state) =>{
    return{
        currentUser:state.currentUser
    }
}
export default connect(mapStateToProps,null)(CreatePost)
