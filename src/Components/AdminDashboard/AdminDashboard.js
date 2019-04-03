import React, {Component} from "react"
import Axios from "axios";

export default class AdminDashbaord extends Component{
    constructor(){
        super()
        this.state ={
            adminPostData:[]
        }
    }
    componentDidMount = () =>{
        setTimeout(() => {
            Axios.get("/getAdminPosts").then(allAdminPosts =>{
                console.log("Got admin posts: ", allAdminPosts.data)
                this.setState({
                    adminPostData:allAdminPosts.data
                })
            })
        }, 2000);
    }
    render(){
        return(
            <div>
                ADMIN DASHBOARD
            </div>
        )
    }
}