import React, { Component } from 'react'
import { connect } from "react-redux";
import { CurrentUser } from "../../redux/reducer";
import './finishRegistration.css'
import {Link} from "react-router-dom"
import Dashboard from "../../routes"
import StripeCheckout from 'react-stripe-checkout';
import Axios from "axios"
import StripeCheckout from 'react-stripe-checkout';
 class FinishRegistration extends Component {
    constructor(props){
        super(props)
        this.state= {
            user: [],
            username: "",
            picture: ""

        }
    }

    componentDidMount(){
        Axios.get('/getUserSession').then(res => {
            this.setState({
                user: res.data.user_id,
                picture: res.data.picture

            })
        })

    }

    // onToken = (token) => {
    //     // console.log('onToken', token)
    //     Axios.post('/api/stripe', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: token.id
    //     }).then(json => {
    //          alert(json.data.message)
    //         console.log('json', json)
    //       }).catch
    //     }


    handleUsername(){
        const {username, user} = this.state
        console.log("user:", user)
        Axios.put(`/getusername/${user}/${username}`).then(res => {
        })
    }
    handleChange(e){
        this.setState({username: e.target.value})
        }
    

  render() {
   const  {picture} = this.state

    console.log(this.state.picture)

    return (

        
        <div className='FinishReg-parent'>
         <div className='profile-header'> </div> 
    


          <h3 className="h3">You're almost there....</h3>
          <img src='https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=2364333683593240&height=50&width=50&ext=1556863656&hash=AeTOzd1VGZJca_ec' className="profile-photo" /> 

         <p1 className="username-text"> Let's give you a username first!</p1>
         <input type="text" id="text" placeholder="Username" name="text_name" class="mytext" onChange={e => this.handleChange(e)} />
        <Link to="/dashboard">
        <button class="button-submit" onClick ={() => this.handleUsername()}>submit</button>
        </Link> 

         <h2 className="card-text"> Optional: Add a payment method!</h2>
         <h3> <StripeCheckout
          token={this.onToken}
           // PUBLISHABLE KEY
          stripeKey="pk_test_4S8gCnMZqqRJyrGjvtfMBgoS"
           />
         </h3>
         
        </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser
    }
} 

export default connect(mapStateToProps,null)(FinishRegistration)
