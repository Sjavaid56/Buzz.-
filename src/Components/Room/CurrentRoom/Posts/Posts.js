import React, { Component } from 'react';
import up from "../up.png"
import down from "../down.png"
import comment from '../../../../images/icons8-topic-50.png';
import '../Comments/Comments.css';
import './posts.css';
import swal from '@sweetalert/with-react'
import drink from "../../../../images/drink.png"

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
    chooseDrink = (user_name, user_id) =>{
        console.log(this.props.deals)
        let mappedDeals = this.props.deals.map(deal =>{
            return(
                <div className = "dealParent-container">
                    <button onClick = {() => this.sendDrink(deal,user_name, user_id)} className = "dealParent-container__item"><img src = {drink}></img>{deal.description}</button>
                </div>
            )
        })
        swal({
            showCancelButton: false,
            showConfirmButton: false,
            content:(<div>
                {mappedDeals.length? mappedDeals:<h1>No deals yet!</h1>}
            </div>)
        })
    }
    sendDrink = (deal, user_name,user_id) =>{
        swal(
            {
            title:`Are you sure you want to send ${user_name} a ${deal.description}?`,
            text:'Your card will be charged $5.00',
            buttons:true,
            dangerMode:true
        }
        )
            .then(response =>{
                let body = {
                    coupon_code:deal.coupon_code,
                    recipient:user_name,
                    recipient_id:user_id
                }
                if(response){
                    this.props.socket.emit("SendDrink", body )
                }
                else{
                    swal(
                        {title:"Canceled purchase"}
                    )
                }
            })
        
    }

    render() {
        return (
            <div className="post-parent">
                <div className="comment-parent__header">

                    {/* Change all data to equal props from Posts */}
                    <div className="comment-parent__user-info">
                        <img className="comment-parent__profile-picture" src={this.props.poster_pic} />

                        <p className="comment-parent__user-name">@{this.props.poster_username}</p>
                    </div>

                    <div className='comment-parent__timestamp'>
                        <p className='comment-parent__timeInfo'>{this.props.date}</p>
                        <p className='comment-parent__timeInfo'>{this.props.time}</p>
                    </div>

                </div>

                <div className="comment-parent__content">
                    {this.props.post_content}
                </div>

                <div className="comment-parent__footer">

                    <button className="comment-parent__vote">
                        {/* will need to add onClick functionality to increment upvotes per the above */}
                        <img src={up} alt='up arrow'></img>
                    </button>

                    <p>{this.props.upvotes}</p>

                    <button className="comment-parent__vote">
                        {/* will need to add onClick functionality to increment downvotes per the above */}
                        <img src={down} alt='down arrow'></img>
                    </button>
                    <p>{this.props.downvotes}</p>

                    <button className='post-parent__commentToggle'
                    // onClick={this will inherit toggle functionality from CurrentRoom}
                    >
                        <img src={comment} style={{
                            height: 24,
                            width: 24
                        }}
                            onClick={this.props.toggleComments} />
                    </button>

                    <button onClick = { () =>{this.chooseDrink(this.props.poster_username, this.props.poster_id)}} className='post-parent__sendDrink'>
                        
                        send honey
                    </button>
                </div>

            </div>
        )
    }
}