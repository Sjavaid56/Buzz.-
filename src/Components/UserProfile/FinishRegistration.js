import React, { Component } from 'react'
import { connect } from "react-redux";
import { CurrentUser } from "../../redux/reducer";
import './finishRegistration.css'
import StripeCheckout from 'react-stripe-checkout';
import Axios from "axios"
import { Link } from "react-router-dom"
 class FinishRegistration extends Component {
    constructor(props){
        super(props)
        this.state= {
            user: [],
            username: "",
        }
    }
    componentDidMount(){
        Axios.get('/getUserSession').then(res => {
            this.setState({
                user: res.data.user_id
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
    console.log(this.state.user)
    return (
        <div className='FinishReg-parent'>
         <div className='profile-header'> </div>
          <h3 className="h3">You're almost there....</h3>
         <p1 className="username-text">Give yourself a username</p1>
         <input type="text" id="text" placeholder="Username" name="text_name" class="mytext" onChange={e => this.handleChange(e)} />
         
         <Link to = "/dashboard"><button onClick = {() => this.handleUsername()}>submit</button></Link>
         <h2> Optional: Add a payment method (Just know, without a card on file you wont be able to recieve free drinks)</h2>
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