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
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

//passport setup
const passportFunctions = require('./passport');
const expressSession = require('express-session');
app.use(
  expressSession({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
)
app.use(passportFunctions.initialize());
app.use(passportFunctions.session());

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    console.log(req.cookies);
    console.log(req.session.passport.user, 'passport User');
    console.log(req.user, 'USER');
      return next();
  }
  res.redirect("/login")
}

//passport router setup
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post(
  "/signup",
  passportFunctions.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/error",
  })
);

app.post(
  "/login",
  passportFunctions.authenticate("local-login", {
    successRedirect: "/index",
    failureRedirect: "/error",
  })
);

app.get(
  "/auth/gmail",
  passportFunctions.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/auth/gmail/callback",
  passportFunctions.authenticate("google", {
    successRedirect: "/index",
    failureRedirect: "/error",
  })
);

app.get(
  "/auth/facebook",
  passportFunctions.authenticate("facebook", {
    scope: ["email"],
  })
);

app.get(
  "/auth/facebook/callback",
  passportFunctions.authenticate("facebook", {
    successRedirect: "/index",
    failureRedirect: "/error",
  })
);

app.get("/index", isLoggedIn, (request, response) => {
  console.log(request)
  console.log(response)
  response.render("index");
});

app.get("/", (request, response) => {
  response.render("home");
});

app.get("/error", (request, response) => {
  response.render("error");
});

app.get("/logout", (request, response) => {
  request.logout();
  response.render("login");
});

// note service and router setup
const NoteService = require("./Service/noteService");
const noteService = new NoteService(knex);
const NoteRouter = require("./Router/NoteRouter");
const noteRouter = new NoteRouter(noteService).router();
app.use("/api/index", noteRouter);

//port setup
app.listen(8080, () => {
  console.log(`port 8080`);
});

module.exports = app