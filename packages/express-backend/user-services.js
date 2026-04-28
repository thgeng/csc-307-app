import mongoose from "mongoose";

// schema
const UserSchema = new mongoose.Schema({
  name: String,
  job: String,
});

// model
const User = mongoose.model("User", UserSchema);

// CRUD functions
export function getUsers() {
  return User.find();
}

export function findUserById(id) {
  return User.findById(id);
}

export function findUserByName(name) {
  return User.find({ name });
}

export function findUserByJob(job) {
  return User.find({ job });
}


export function findUserByNameAndJob(name, job) {
  return User.find({ name, job });
}

export function addUser(user) {
  return new User(user).save();
}


export function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}