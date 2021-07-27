//NoteService takes knex as constructor
class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  add(note, user) {
    return this.knex("passport_users")
    .where({ username:user })
    .then((user)=>{
      return this.knex
      .insert({ content:note, user_id: user[0].id })
      .into('notes')
    })
    .catch((err)=>{
      throw new Error(err)
    })
  }

  edit(noteId, note) {
    return this.knex('notes').where('id', noteId).update({ content:note })
  }

  delete(noteId) {
    return this.knex('notes').where('id', noteId).del();
  }

  list(username) {
    return this.knex
      .select("notes.id", "notes.content")
      .from("notes")
      .innerJoin("passport_users", "notes.user_id", "passport_users.id")
      .where("passport_users.username", username)
      .orderBy("notes.id", "asc")
      .then((notes) => {
        console.log('servicenotes', notes)
        return notes;
      })
      .catch((err)=>{
        throw new Error(err)
      });
  }
}

module.exports = NoteService;
