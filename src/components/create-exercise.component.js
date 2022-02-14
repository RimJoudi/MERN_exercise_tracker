import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {

    constructor(props) {
        super(props);

        //this was undefined with the bind method will refer to 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    //a live cycle method that automatically calls at diffrent endpoints
    // so componentDidMount will be called before anything that will be displayed on the page
    componentDidMount() {
        axios.get('http:localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username 
                    })
                }
       
    }
    //method to change the username
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
  
    
    onSubmit(e) {
       e.preventDefault();

       const exercise = {
           username: this.state.username,
           description: this.state.description,
           duration: this.state.duration,
           date: this.state.date,
       }

       console.log(exercise);

       //take the person back to the home page
       window.location = '/';
       

    }

    }
    render() {
        return (
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                        required
                        className="form-contol"
                        value={this.state.username}
                        onChange={this.onChangeUsername}>
                        {   
                        //.map allow us to return something of each element in the array of users
                            this.state.users.map(function(user) {
                                return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>;
                            })
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label> Description</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                            />
                    </div>
                    <div>
                        <div className="from-group">
                            <label>Date: </label>
                            <div> 
                                <DatePicker //component to popo up a calender 
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}