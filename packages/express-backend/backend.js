import express from "express";

// Data
const users = {
  users_list: [
    { id: "xyz789", name: "Charlie", job: "Janitor" },
    { id: "abc123", name: "Mac", job: "Bouncer" },
    { id: "ppp222", name: "Mac", job: "Professor" },
    { id: "yat999", name: "Dee", job: "Aspiring actress" },
    { id: "zap555", name: "Dennis", job: "Bartender" }
  ]
};

// Helper functions
const findUserByName = (name) => {
  return users.users_list.filter((user) => user.name === name);
};

const findUserById = (id) => {
  return users.users_list.find((user) => user.id === id);
};

const addUser = (user) => {
  users.users_list.push(user);
  return user;
};

const deleteUserById = (id) => {
  const index = users.users_list.findIndex((user) => user.id === id);

  if (index === -1) {
    return undefined;
  }

  const deletedUser = users.users_list[index];
  users.users_list.splice(index, 1);
  return deletedUser;
};

const findUsersByNameAndJob = (name, job) => {
  return users.users_list.filter(
    (user) => user.name === name && user.job === job
  );
};

const app = express();
const port = 8000;

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get all users, or filter by name, or filter by name + job
app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name !== undefined && job !== undefined) {
    const result = findUsersByNameAndJob(name, job);
    res.send({ users_list: result });
  } else if (name !== undefined) {
    const result = findUserByName(name);
    res.send({ users_list: result });
  } else {
    res.send(users);
  }
});

// Get one user by id
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const result = findUserById(id);

  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

// Add a new user
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

// Delete one user by id
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const deletedUser = deleteUserById(id);

  if (deletedUser === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(deletedUser);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});