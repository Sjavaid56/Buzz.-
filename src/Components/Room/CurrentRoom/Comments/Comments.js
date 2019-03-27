import React, { Component } from 'react';
import "./Comments.css"
import up from "./up.png"
import down from "./down.png"
import axios from "axios"

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    //For upvote and downvote functionality, Get comment_id to change and make a db request
    //to add or subtract one. Also, emit that action to all users.
    //Have not instantiated socket yet so can't emit yet.
    upvote = (comment_id) =>{
        // Endpoints not made yet
        // axios.put(`/commentUpVote/${comment_id}`).then(newCount =>{
        //     console.log("Upvoted post")
        // })
    }
    downvote = (comment_id) =>{
        // Endpoints not made yet
        // axios.put(`/commentDownVote/${comment_id}`).then(newCount =>{
        //     console.log("Upvoted post")
        // })
    }

    render() {
        return (
            <div className = "comment-parent">
                <div className = "comment-parent__header">
                    {/* Change all data to equal props from Posts */}
                    <div className = "comment-parent__user-info">
                    <img className = "comment-parent__profile-picture" src = "https://avatars0.githubusercontent.com/u/42726824?s=460&v=4"/> 
                    <p className = "comment-parent__user-name">@JimmyJohn444</p>
                    </div>
                    <p>3.29.19</p>
                    <p>3:05pm</p>
                </div>

                <div className = "comment-parent__content">
                Render styling for a comment under an associated post
                </div>

                <div className = "comment-parent__footer">
                    <p>3</p>
                    <button className = "comment-parent__vote"><img src = {up}></img></button>
                    <p>0</p>
                    <button className = "comment-parent__vote"><img src = {down}></img></button>
                </div>
            </div>
        )
    }
}