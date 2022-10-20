const fs = require("fs");
const { UUID } = require("sequelize");
const util = require("util");

const uuidv1 = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read(){
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note){
    return writeFileAsync('db/db.json', JSON.stringify(note))
  }

  getNote(){
    return this.read().then((note) => {
      let parsedNote;

      try{
        parsedNote = [].concat(JSON.parse(note))
      } catch(err){
        parsedNote = []
      }

      return parsedNote;
    })
  }

  addNote(){
    const { title, text } = note;
    if(!title || !text){
      throw new Error("Required fields left blank")
    }

    const newNote = { title, text, id: uuidv1()};
    return this.getNote().then((note) => [...note, newNote])
    .then((updatedNote) => this.write(updatedNote))
    .then(() => newNote)
  }

  removeNote(id) {
    return this.getNotes().then((note) => note.filter((note) => note.id !== id))
    .then((filterNote) => this.write(filterNote));
  }
}

module.exports = new Store();