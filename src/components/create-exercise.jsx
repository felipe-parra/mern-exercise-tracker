import React, { Component } from "react";
import axios from "axios";
import toastr from "toastr";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// const url_exercise = process.env.URL_API_EXERCISE
const url_exercise = "http://localhost:3500/exercises";
const url_user = "http://localhost:3500/users";

export default class CreateExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  };

  componentDidMount() {
    axios
      .get(url_user)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
            username: response.data[0].username
          });
          toastr.success("Successfully loaded!");
        }
      })
      .catch(error => {
        return toastr.error("Something was wrong!");
      });
  }

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };
  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  onChangeDuration = e => {
    this.setState({
      duration: e.target.value
    });
  };
  onChangeDate = date => {
    this.setState({
      date: date
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };

    console.log(exercise);

    axios
      .post(url_exercise + "/add", exercise)
      .then(res => console.log(res.data))
      .catch(error => {
        return toastr.error("Don't saved! " + error);
      });
    window.location = "/";
  };

  render() {
    return (
      <div className="container p-4">
        <h3>Create New Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              name="username"
              id="username"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(user => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              name="description"
              id="description"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes)</label>
            <input
              type="text"
              name="duration"
              id="duration"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            />
          </div>

          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              ></DatePicker>
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
