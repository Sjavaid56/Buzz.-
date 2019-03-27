import React, { Component } from 'react';

export default class Post extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    //For upvote and downvote functionality, Get post_id to change and make a db request
    //to add or subtract one. Also, emit that action to all users.
    //Have not instantiated socket yet so can't emit yet.
    upvote = (post_id) => {
        // Endpoints not made yet
        // axios.put(`/postUpVote/${post_id}`).then(newCount =>{
        //     console.log("Upvoted post")
        // })
    }
    downvote = (post_id) => {
        // Endpoints not made yet
        // axios.put(`/postDownVote/${post}`).then(newCount =>{
        //     console.log("Upvoted post")
        // })
    }

    render() {
        return (

            <div className='post-parent'>
                Render a single post
            </div>
        )
    }
}