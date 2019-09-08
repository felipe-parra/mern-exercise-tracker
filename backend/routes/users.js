const router = require("express").Router();
const User = require("../models/user.model");

router.get("/", (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.get("/:id", (req, res, next) => {
  User.findById()
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.post("/add", (req, res, next) => {
  User.create({ ...req.body })
    .then(() => {
      res.json("User added!");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.patch("/update/:id", (req, res, next) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { next: true })
    .then(user => {
      res.json(`User: ${user.username} was updated successfully!`);
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => {
      res.json("User deleted successfully!");
    })
    .catch(err => {
      res.status(400).json("Error: " + err);
    });
});

module.exports = router;
