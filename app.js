//inbuilt setup
const fs = require("fs");
const path = require("path");

//express setup
const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

//knex setup
require('dotenv').config();
const knexConfig = require ('./knexfile').development;
const knex = require('knex')(knexConfig);

//handlebar config
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//basic Auth setup
const basicAuth = require("express-basic-auth");
const AuthChallenger = require("./utils/auth");
app.use(
  basicAuth({
    authorizer: AuthChallenger,
    authorizeAsync: true,
    challenge: true,
    realm: "Note Taking Application",
  })
);

//service and router setup
const NoteService = require("./Service/noteService");
const noteService = new NoteService(knex);
const NoteRouter = require("./Router/NoteRouter");
const noteRouter = new NoteRouter(noteService).router();
app.use("/api/notes", noteRouter);

//index setup
app.get('/', async(req, res)=>{
  res.render('index');
})

//Port setup
app.listen(8080, () => {
  console.log(`port 8080`);
});


module.exports = app