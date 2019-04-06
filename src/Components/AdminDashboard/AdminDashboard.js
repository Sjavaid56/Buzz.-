import React, {Component} from "react"
import Axios from "axios";
import "./AdminDashboard.css"
import AdminNavBar from "../AdminNavBar/AdminNavBar"
import AdminMain from "../AdminMain/AdminMain"

export default class AdminDashbaord extends Component{
    constructor(){
        super()
        this.state ={
            adminPostData:[],
            adminData:[]
        }
    }
    componentDidMount = () =>{
            Axios.get("/getAdminPosts").then(allAdminPosts =>{
                console.log("Got admin posts: ", allAdminPosts.data)
                this.setState({
                    adminPostData:allAdminPosts.data
                })
            })
            Axios.get("/getUserSession").then(adminData =>{
                this.setState({
                    adminData:adminData.data
                })
            })
    }
    render(){
        return(
            <div className = "Admin-Dash-Parent">
                <AdminNavBar/>
                <AdminMain/>
            </div>
        )
    }
}