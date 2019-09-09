import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NProgress from "nprogress";

// const url_api_exercise = process.env.URL_API_EXERCISE
const url_api_exercise = "http://localhost:3500/exercises/";
// const url_api_user = process.env.URL_API_USER
const url_api_user = "http://localhost:3500/users/";

export default class EditExercise extends Component {
  state = {
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: []
  };

  componentDidMount() {
    NProgress.start();
    axios
      .get(url_api_exercise + this.props.match.params.id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date)
        });
        NProgress.done();
      })
      .catch(error => {
        console.log(error);
      });
    axios
      .get(url_api_user)
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username)
          });
        }
      })
      .catch(error => {
        console.log(error);
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
    NProgress.start();
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    };
    console.log(exercise);

    axios
      .patch(
        url_api_exercise + "update/" + this.props.match.params.id,
        exercise
      )
      .then(res => {
        NProgress.done();
        console.log(res.data);
      });
    window.location = "/";
  };
  render() {
    return (
      <div className="container p-4">
        <h3>Edit Exercise</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
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
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input
              type="text"
              name="duration"
              id="duration"
              className="form-control"
              required
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
              value="Edit Exercise Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
