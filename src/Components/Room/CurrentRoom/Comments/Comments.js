import React, { Component } from 'react';
import "./Comments.css"
import up from "../up.png"
import down from "../down.png"
// import axios from "axios"

export default class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    //For upvote and downvote functionality, Get comment_id to change and make a db request
    //to add or subtract one. Also, emit that action to all users.
    //Have not instantiated socket yet so can't emit yet.
    upvote = (comment_id) => {
        let body = {
            comment_id,
            room_id: this.props.room_id
        }
        this.props.socket.emit("CommentUpvote", body)
    }
    downvote = (comment_id) => {
        let body = {
            comment_id,
            room_id: this.props.room_id
        }
        this.props.socket.emit("CommentDownvote", body)
    }

    render() {
        return (
            <div className="comment-parent">
                <div className="comment-parent__header">

                    {/* Change all data to equal props from Posts */}
                    <div className="comment-parent__user-info">
                        <img className="comment-parent__profile-picture" src={this.props.commenter_img} alt='commenter profile img' />

                        <p className="comment-parent__user-name">@{this.props.commenter_user_name}</p>
                    </div>

                    <div className='comment-parent__timestamp'>
                        <p className='comment-parent__timeInfo'>{this.props.c_date}</p>
                        <p className='comment-parent__timeInfo'>{this.props.c_time}</p>
                    </div>

                </div>

                <div className="comment-parent__content">
                    {this.props.comment_content}
                </div>

                <div className="comment-parent__footer">
                    <button onClick={() => { this.upvote(this.props.comment_id) }} className="comment-parent__vote"><img src={up} alt='up arrow'></img></button>
                    <p>{this.props.comment_upvotes}</p>

                    <button onClick={() => { this.downvote(this.props.comment_id) }} className="comment-parent__vote"><img src={down} alt='down arrow'></img></button>
                    <p>{this.props.comment_downvotes}</p>
                </div>
            </div>
        )
    }
}