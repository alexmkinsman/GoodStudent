const fs = require("fs");
const util = require("util");

const uui = require('uuid/v1');

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
}