const router = require("express").Router();
const Exercise = require("../models/exercise.model");

router.get("/", (req, res, next) => {
  Exercise.find()
    .then(exercises => {
      res.json(exercises);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Exercise.findById(id)
    .then(exercise => {
      res.json(exercise);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Exercise.findByIdAndDelete(id)
    .then(exercise => {
      res.json("Exercise deleted from user: " + exercise.username);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/add", (req, res) => {
  const { username, description } = req.body;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  });
  newExercise
    .save()
    .then(() => {
      res.json("Exercise added!");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.patch("/update/:id", (req, res, next) => {
  const { id } = req.params;
  Exercise.findByIdAndUpdate(id, req.body, { new: true })
    .then(exercise => {
      res.json("User updated for " + exercise.username);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
