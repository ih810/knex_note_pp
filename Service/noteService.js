//NoteService takes knex as constructor
class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  add(note, user) {
    return this.knex("users")
    .where({ user_name:user })
    .then((user)=>{
      return this.knex
      .insert({ content:note, user_id: user[0].id })
      .into('note')
    })
    .catch((err)=>{
      throw new Error(err)
    })
  }

  edit(noteId, note) {
    return this.knex('note').where('id', noteId).update({ content:note })
  }

  delete(noteId) {
    return this.knex('note').where('id', noteId).del();
  }

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
      })
      .catch((err)=>{
        throw new Error(err)
      });
  }
}

module.exports = NoteService;
