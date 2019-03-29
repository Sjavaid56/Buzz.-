import React, { Component } from 'react';
import { Link } from "react-router-dom";
import back from "./back.png"
import Axios from 'axios';
import Post from "./Posts/Posts"
import Comment from "./Comments/Comments"
import CreatePost from './Posts/CreatePost';
import pencilIcon from '../../../images/icons8-edit.svg';
import cancelIcon from '../../../images/icons8-delete-24.png';
import "./CurrentRoom.css"

export default class CurrentRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            comments: [],
            createPostHidden: true,
            commentsHidden: true
        }
        props.socket.on("Newmessage", post => {
            this.setState({
                posts: post
            })
        })
    }
    //When screen loads, get all the room data for current room
    componentDidMount = () => {
        Axios.get(`/getPosts/${1}`).then(posts => {
            this.setState({
                posts: posts.data
            })
            console.log(posts.data)
        })
        //get comments that are associated with correct room and posts
        Axios.get(`/getComments/${1}`).then(comments => {
            this.setState({
                comments: comments.data
            })
            console.log(comments.data)
        })
    }

    toggleCreatePost = () => {
        this.setState({
            createPostHidden: !this.state.createPostHidden
        })
    }

    toggleComments = () => {
        this.setState({
            commentsHidden: !this.state.commentsHidden
        })
        console.log(this.state.commentsHidden)
    }

    render() {
        let mappedPosts = this.state.posts.map(post => {
            return (
                <div>
                    <Post post_id={post.post_id}
                        poster_username={post.poster_username}
                        poster_pic={post.poster_pic}
                        time_posted={post.time_posted}
                        post_content={post.post_content}
                        post_img={post.post_img}
                        upvotes={post.upvotes}
                        downvotes={post.downvotes}
                        drinks_given={post.drinks_given}
                        room_id={post.room_id}
                        toggleComments={this.toggleComments} />
                </div>
            )
        })
        let mappedComments = this.state.comments.map(comment => {
            return (
                <div>
                    <Comment comment_content={comment.comment_content}
                        comment_downvotes={comment.comment_downvotes}
                        comment_id={comment.comment_id}
                        comment_upvotes={comment.comment_upvotes}
                        commenter_img={comment.commenter_img}
                        commenter_user_name={comment.commenter_user_name}
                        post_id={comment.post_id}
                        room_id={comment.room_id} />
                </div>
            )
        })
        return (
            <div className="Current-room">
                <header className="Current-room__header">
                    {/* Replace placeholder with props */}
                    <div className="Current-room__Info">
                        <button className="Current-room__back"
                            onClick={this.props.toggleHiveView}>
                            <img src={back} />
                        </button>

                        <p className="Current-room__title">Berdena's</p>

                        <button className='Current-room__createPost'
                            onClick={this.toggleCreatePost}>
                            <img src={this.state.createPostHidden ? pencilIcon : cancelIcon} />
                        </button>
                    </div>
                    <div>
                        {this.state.createPostHidden ? null :
                            <CreatePost socket={this.props.socket} />}
                    </div>
                </header>
                <main>
                    {/* Showing the current room - renders CREATE POST, mapped POSTS and mapped COMMENTS */}
                    {/* If the screen is in mobile view, show the bottom navigation. If it isn't, it will be next to
                    map component. */}
                    <div>

                        {mappedPosts.length ? mappedPosts : null}
                    </div>
                    <div className={this.state.commentsHidden ? 'inactive' : 'active'}>

                        {mappedComments.length ? mappedComments : null}
                    </div>
                </main>
            </div>
        )
    }
}