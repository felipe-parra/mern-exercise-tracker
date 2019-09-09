import React, { Component } from "react";
import Axios from "axios";
import Exercise from "./exercise";
import NProgress from "nprogress";

// const url_api_exercise = process.env.URL_API_EXERCISE
const url_api_exercise = "http://localhost:3500/exercises/";

export default class ExerciseList extends Component {
  state = {
    exercises: []
  };

  componentDidMount() {
    Axios.get(url_api_exercise)
      .then(response => {
        NProgress.start();
        this.setState({
          exercises: response.data
        });
        NProgress.done();
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteExercise = id => {
    NProgress.start();
    Axios.delete(url_api_exercise + id).then(response => {
      NProgress.done();
      console.log(response.data);
    });
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    });
  };

  exerciseList = () => {
    return this.state.exercises.map(currentExercise => {
      return (
        <Exercise
          exercise={currentExercise}
          deleteExercise={this.deleteExercise}
          key={currentExercise._id}
        ></Exercise>
      );
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
      </div>
    );
  }
}
