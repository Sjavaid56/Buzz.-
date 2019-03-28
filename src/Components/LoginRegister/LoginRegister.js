
import React from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon, Image } from "semantic-ui-react";
import {Link} from "react-router-dom"

import Axios from 'axios';


class LoginRegister extends React.Component {
    state = {
        username:"",
        email: "",
        password:"",
        passwordConfirmation:" ",
        errors: []
    };

    componentDidMount(){
        Axios.get('/api/user-data').then(response => {
            console.log(response.data)
        })
    }

    login = () => {
        const redirectUri = encodeURIComponent(`${window.location.origin}/auth`);
    
        window.location = `https://${
          process.env.REACT_APP_AUTH0_DOMAIN
        }/authorize?client_id=${
          process.env.REACT_APP_AUTH0_CLIENT_ID
        }&scope=openid%20email%20profile&redirect_uri=${redirectUri}&response_type=code`;
      };
    
    render() {

        const {username, email, password, passwordConfirmation, errors} = this.state 

        return (

            
            <Grid textAlign="center" verticalAlign="middle" className="app">
            <Grid.Column style={{maxwidth: 450}}> 
             <Header as ="h2" icon color = "orange" textAlign='center'>
             <Icon name="rocket" color="orange"/>
              Sign up for Chatapp
            </Header>
            <Form onSubmit={this.handleSubmit} size="large" >


            <Segment stacked>
            
            <Form.Input 
            fluid
            name="username" 
            icon="user" 
            iconPosition="left"
            placeholder="Username" 
            onChange={this.handleChange} 
            value = {username}
            type="text"/>
            
            <Form.Input fluid name="email" icon="mail" iconPosition="left"
            placeholder="Email Adress" onChange={this.handleChange} value= {email}type="email"/>
            
            <Form.Input fluid name="password" icon="lock" iconPosition="left"
            placeholder="password" onChange={this.handleChange} value={password} type="password"/>
            `
            <Form.Input fluid name="passwordConfirmation" icon="repeat" iconPosition="left"
            placeholder="Password Confirmation" onChange={this.handleChange} value={passwordConfirmation}type="password"/>

            <Button color = "black" fluid size = "large">submit</Button>
            <Button color = "blue" fluid size = "large" onClick={this.login}>Sign up using social media</Button>
            </Segment> 
            </Form>
            {errors.length > 0 && (
                <Message error> 
                <h3>Error</h3>
                {this.displayErrors(errors)}
                </Message>
            )} 
           
            
            <Message>Already a user? <Link to ="/login">Login</Link></Message>
      
            </Grid.Column>

  
            </Grid> 
            
        
        ) 
    }
}

export default LoginRegister


 
