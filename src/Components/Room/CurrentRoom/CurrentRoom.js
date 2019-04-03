import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import back from "./back.png"
import Axios from 'axios';
import Post from "./Posts/Posts"
import Comment from "./Comments/Comments"
import CreatePost from './Posts/CreatePost';
import pencilIcon from '../../../images/icons8-edit.svg';
import cancelIcon from '../../../images/icons8-delete-24.png';
import beeIcon from '../../../images/assets/logo/buzz-logo-yellow-nobg.png';
import "./CurrentRoom.css"
import { connect } from "react-redux"
import { updateCurrentRoom } from '../../../redux/reducer';


class CurrentRoom extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            comments: [],
            createPostHidden: true,
            isClicked: [],
            commentMessage: "",
            currentRoomData: [],
            deals: ""
        }
        props.socket.on("Newmessage", post => {
            this.setState({
                posts: post
            })
            console.log("RECIEVED ALL POSTS FOR THIS ROOM,", post)
        })
        props.socket.on("AllComments", comments => {
            this.setState({
                comments: comments
            })
        })
        props.socket.on('SendRoomData', roomData => {
            this.setState({
                currentRoomData: roomData
            })
            console.log('this is the room data!', roomData)
        })
        props.socket.on('NewUpvote', allPosts => {
            this.setState({
                posts: allPosts
            })
            console.log("New upvote!", allPosts)
        })
        props.socket.on("NewDownvote", allPosts => {
            this.setState({
                posts: allPosts
            })
        })
        props.socket.on("NewCommentUpvote", allComments => {
            this.setState({
                comments: allComments
            })
            console.log("New comment upvote!")
        })
        props.socket.on("NewCommentDownvote", allComments => {
            this.setState({
                comments: allComments
            })
            console.log("New comment downvote!!")
        })
    }
    //When screen loads, get all the room data for current room
    componentDidMount = () => {
        const { room_id } = this.props.currentRoom;

        Axios.get(`/getPosts/${room_id}`).then(posts => {
            this.setState({
                posts: posts.data
            })
            console.log(posts.data)
        })
        //get comments that are associated with correct room and posts
        Axios.get(`/getComments/${room_id}`).then(comments => {
            this.setState({
                comments: comments.data
            })
            console.log(comments.data)
        })
        Axios.get(`/getDrinkDeals/${room_id}`).then(deals => {
            this.setState({
                deals: deals.data
            })
            console.log("Deals: ", deals.data)
        })
    }

    toggleCreatePost = () => {
        this.setState({
            createPostHidden: !this.state.createPostHidden
        })
    }

    handleClick = (i) => {
        let isClicked = this.state.isClicked.concat();
        isClicked[i] = !isClicked[i]
        console.log(isClicked[i])
        this.setState({
            isClicked
        })
    }

    handleCommentChange = (value) => {
        this.setState({
            commentMessage: value
        })
    }

    newComment = (post_id) => {
        let body = {
            comment_message: this.state.commentMessage,
            post_id: post_id,
            commenter_user_name: this.props.currentUser.profile_name,
            commenter_img: this.props.currentUser.picture,
            comment_upvotes: 0,
            comment_downvotes: 0,
            //CHANGE TO BE RIGHT ROOM
            room_id: this.props.currentRoom.room_id
        }
        this.props.socket.emit("NewComment", body)
        this.setState({
            commentMessage: ""
        })
    }

    leaveARoom = (room_id) => {
        let body = { room_id: room_id }
        this.props.socket.emit('ExitedRoom', body)

        this.props.toggleHiveView();
    }

    render() {
        console.log("PROPS IN CURRENT ROOM: ", this.props)
        let mappedPosts = this.state.posts.map((post, i) => {
            console.log('Post data! Look at me!', this.state.posts)
            console.log('Comment data! Look at me!', this.state.comments)
            let mappedComments = this.state.comments.map(comment => {
                if (comment.post_id == post.post_id) {
                    return (
                        <div >
                            <Comment {...comment} socket={this.props.socket} room_id={this.props.currentRoom.room_id} />
                        </div>
                    )
                }
            })
            return (
                <div >
                    <Post {...post}
                        toggleComments={() => this.handleClick(i)} socket={this.props.socket} deals={this.state.deals} room_id={this.props.currentRoom.room_id} />
                    <div className={this.state.isClicked[i] ? 'comments-active' : 'comments-inactive'}>
                        <div >
                            {mappedComments}
                        </div>
                        <div className="leaveComment-parent" >
                            <input onChange={(e) => { this.handleCommentChange(e.target.value) }} className="leaveComment-parent__input" placeholder="Enter Comment here!">
                            </input>
                            <button onClick={() => { this.newComment(post.post_id) }} className="leaveComment-parent__button">buzz</button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className="Current-room">
                <header className="Current-room__header">
                    {/* Replace placeholder with props */}
                    <div className="Current-room__Info">
                        <button className="Current-room__back"
                            onClick={() =>
                                this.leaveARoom(this.props.currentRoom.room_id)
                            }>
                            <img src={back} />
                        </button>

                        <p className="Current-room__title">{this.props.currentRoom.business_name}</p>

                        <button className='Current-room__createPost'
                            onClick={this.toggleCreatePost}>
                            <img src={this.state.createPostHidden ? pencilIcon : cancelIcon} />
                        </button>
                    </div>
                    <div className={this.state.createPostHidden ? "Current-room__createPost--hidden" : "Current-room__createPost--show"}>
                        {this.state.createPostHidden ? null :
                            <div >
                                <CreatePost socket={this.props.socket} />
                            </div>
                        }
                    </div>
                </header>
                <main className="Current-room__main">
                    {/* Showing the current room - renders CREATE POST, mapped POSTS and mapped COMMENTS */}
                    {/* If the screen is in mobile view, show the bottom navigation. If it isn't, it will be next to
                    map component. */}
                    <div>
                        {
                            mappedPosts.length ?
                                mappedPosts
                                :
                                <div style={{ textAlign: 'center', margin: 60, fontSize: 22, lineHeight: 1.2 }}>
                                    <h4 style={{ marginBottom: 30, textShadow: '1px 1px 3.5px #000000' }}>
                                        No posts in this hive yet... be the first to buzz about something!
                                    </h4>
                                    <img height='100' width='100' src={beeIcon} alt='buzz bee logo in yellow' />
                                </div>
                        }
                    </div>
                </main>
            </div >
        )
    }
}
const MapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
        currentRoom: state.currentRoom
    }
}
export default connect(MapStateToProps, { updateCurrentRoom })(CurrentRoom)