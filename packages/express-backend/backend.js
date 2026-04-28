import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import {
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  addUser,
  deleteUserById,
} from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/users_db")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// ==================== ROUTES ====================

// GET all / filter
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) {
    findUserByNameAndJob(name, job)
      .then(data => res.send({ users_list: data }))
      .catch(err => res.status(500).send(err));

  } else if (name) {
    findUserByName(name)
      .then(data => res.send({ users_list: data }))
      .catch(err => res.status(500).send(err));

  } else if (job) {
    findUserByJob(job)
      .then(data => res.send({ users_list: data }))
      .catch(err => res.status(500).send(err));

  } else {
    getUsers()
      .then(data => res.send({ users_list: data }))
      .catch(err => res.status(500).send(err));
  }
});

// GET by id
app.get("/users/:id", (req, res) => {
  findUserById(req.params.id)
    .then(user => user ? res.send(user) : res.status(404).send("Not found"))
    .catch(err => res.status(500).send(err));
});

// POST
app.post("/users", (req, res) => {
  addUser(req.body)
    .then(user => res.status(201).send(user))
    .catch(err => res.status(500).send(err));
});

//  DELETE
app.delete("/users/:id", (req, res) => {
  deleteUserById(req.params.id)
    .then(user => user ? res.send(user) : res.status(404).send("Not found"))
    .catch(err => res.status(500).send(err));
});

app.listen(port, () => {
  console.log("Server running on 8000");
});