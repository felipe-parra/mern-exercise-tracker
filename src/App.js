import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NavBar from "./components/Navbar";
import ExerciseList from "./components/exercise-list";
import EditExercise from "./components/edit-exercise";
import CreateExercise from "./components/create-exercise";
import CreateUser from "./components/create-user";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/" exact component={ExerciseList}></Route>
      <Route path="/edit/:id" component={EditExercise}></Route>
      <Route path="/create" component={CreateExercise}></Route>
      <Route path="/user" component={CreateUser}></Route>
    </Router>
  );
}

export default App;
