import React, { Component } from "react";
import axios from 'axios',

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        //this was undefined with the bind method will refer to 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: ''
        }
    }



    onSubmit(e) {
        e.preventDefault();
 
        const user = {
            username: this.state.username,
           
        }
 
        console.log(user);

        //send http post request to the backend the endpoint is expecting a json object from the request body
        //this should be on the onSubmit button
        axios.post('http://localhost:5000/users/add', user) 
            .then(res=> console.log(res.data)); //after the post request 


 
        //take the person back to the home page
        this.setState({
            username: ""
        })
            
        

    render() {
        return (
            <div>
                <p> You are on the Create User component</p>
            </div>
        )
    }
}