import React, { Component } from 'react'
import { connect } from "react-redux";
import { CurrentUser } from "../../redux/reducer";
import './finishRegistration.css'
import {Link} from "react-router-dom"
import Dashboard from "../../routes"
import StripeCheckout from 'react-stripe-checkout';
import Axios from "axios"
import logo from "../../images/assets/logo/buzz-bee-charcoal.svg"
 class FinishRegistration extends Component {
    constructor(props){
        super(props)
        this.state= {
            user: [],
            username: "",
            picture: "",
            card: false 

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
    onToken = (token) => {
        console.log('onToken', token); 
        Axios.post('/stripe', {
          method: "POST",
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: token.id
        }).then( ()=> {
          this.setState({
            Card: true
          })
        })
      }


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
                <img src={this.state.picture} className="profile-photo" />

                <p1 className="username-text"> Let's give you a username first!</p1>
                <input placeholder="Username" className="mytext" onChange={e => this.handleChange(e)} />
                <Link to="/dashboard">
                    <button class="button-submit" onClick={() => this.handleUsername()}>submit</button>
                </Link>

                {/* <h2 className="card-text"> Add a payment, dont worry you can always do it later.</h2> */}
                
                 {/* <StripeCheckout className="Stripe"
                  description="buzz."
                  image = {logo}
                  token={this.onToken}
                  stripeKey="pk_test_WaVHnhGJpp0M8KlijP56wMeL"
                  label="Set up payment information"
                  style ={{"background-color":"red"}}
                  /> */}
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
