//This module handles all the routing of the landing page
//Since the note taking app opearte on only one page,
//We dont need another router js to handle other pages.

const express = require("express");

//using a class to handle the instance of accessing the page
class NoteRouter {
  constructor(noteService) {
    this.noteService = noteService;
  }

  router() {
    let router = express.Router();

    router.get("/", this.get.bind(this));

    router.post("/", this.post.bind(this));

    router.put("/:id", this.put.bind(this));

    router.delete("/:id", this.delete.bind(this));

    return router;
  }
  
  get(req, res){
    return this.noteService
    .list(req.session.passport.user.username)
    .then((data) => {
      console.log('svc post data', data)
      res.json(data);
    })
    .catch((err) => res.status(500).json(err));
  }

  post(req, res){
    console.log(req.session)
    console.log(req.session.passport.user.username)
    return this.noteService
    .add(req.body.note, req.session.passport.user.username)
    .then(() => this.noteService.list(req.session.passport.user.username))
    .then((data) => {
      console.log('svc post data', data)
      res.json(data);
    })
    .catch((err) => res.status(500).json(err));
  }
  
  put(req, res) {
    return this.noteService
      .edit(req.params.id, req.body.note, req.session.passport.user.username) // The noteService fires the update command, this will update our note (and our JSON file)
      .then(() => this.noteService.list(req.session.passport.user.username)) // Then we fire list note from the same noteService which returns the array of notes for that user.
      .then((data) => res.json(data)) // Then we respond to the request with all of our notes in the JSON format back to our clients browser.
      .catch((err) => res.status(500).json(err));
  }

  delete(req, res){
    return this.noteService
      .delete(req.params.id, req.session.passport.user.username)
      .then(() => this.noteService.list(req.session.passport.user.username))
      .then((data)=>{
          res.json((data))
      })
      .catch((err) => res.status(500).json(err));
  }
}

module.exports = NoteRouter;