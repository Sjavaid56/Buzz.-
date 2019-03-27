import React, {Component} from "react"
import swal from "sweetalert"

export default class DrinkSender extends Component{
    constructor(){
        super()
        this.state = {

        }
    }
    showModal = () =>{
        swal({
            title:"Send a Drink!",
            text:"Are you sure you'd like to send this person a drink?",
            icon:"success",
            buttons:true,
            dangerMode:true
        })
    }

    render(){
        return(
            <div>
                <button onClick = {this.showModal}>Click to see modal</button>
            </div>
        )
    }
}
