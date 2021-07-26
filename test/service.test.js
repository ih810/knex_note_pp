const NoteService = require('../Service/NoteService');
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname + '/testData/test.json');


describe('Note Service with a properfile', () => {
    beforeEach((done) => {
        fs.readFile(file, (err) => {
            if (err) {
                console.log(err)
                this.noteService = new NoteService(file);

            }
            this.noteService = new NoteService(file);
            done();
        });
    });
    test('list work with empty list?', ()=>{
        return this.noteService.list("u1")
        .then((data) => {
            expect(data).toEqual(["note1", "note2"])
        })
    })
    test('add work?', ()=>{
        return this.noteService.add("note3", "u1")
        .then(()=> this.noteService.list("u1"))
        .then((data)=>{
            expect(data).toEqual(["note1", "note2", "note3"])
        })
    })
    test('edit work?', ()=>{
        return this.noteService.edit("3", "note3 edit", "u1")
        .then(()=> this.noteService.list("u1"))
        .then((data)=>{
            expect(data).toEqual(["note1", "note2", "note3 edit"])
        })
    })
    test('delete work?', ()=>{
        return this.noteService.delete("3", "u1")
        .then(()=>this.noteService.list("u1"))
        .then((data)=>{
            expect(data).toEqual(["note1", "note2"])
        })
    })
});