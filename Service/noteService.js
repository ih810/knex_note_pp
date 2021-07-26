//This file handles all the function of the instance of notes
//There are 4 types of functions, add, edit, delete and list.
//There should be 2 other methods: read and write
//All the function revolve around read and write

//Basic Setup
const fs = require("fs");
const express = require("express");

const app = express();
app.use(express.json());

//NoteService takes file path to storage as constructor
class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  //add function resolve an array of the user's notes
  add(note, user) {
    return this.knex("users")
    .where({ user_name:user })
    .then((user)=>{
      return this.knex
      .insert({ content:note, user_id: user[0].id })
      .into('note')
    })
  }

  //edit function does not resolve any data, it edit the json instead
  edit(noteId, note) {
    return this.knex('note').where('id', noteId).update({ content:note })
  }

  //delete functino does not resolve any data
  delete(noteId) {
    return this.knex('note').where('id', noteId).del();
  }

  //list function resolve an array of user's note list
  list(username) {
    return this.knex
      .select("note.id", "note.content")
      .from("note")
      .innerJoin("users", "note.user_id", "users.id")
      .where("users.user_name", username)
      .orderBy("note.id", "asc")
      .then((notes) => {
        console.log('servicenotes', notes)
        return notes.map((note) => ({ id: note.id, content: note.content }));
      });
  }
}

module.exports = NoteService;
