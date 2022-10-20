const path = require("path");
const router = require("express").Router();
const store = require("../db/storage");

//read db.json file and return all saved notes as JSON
router.get("/api/notes", async (req, res) => {
  console.log('Hello');
  try {
      const findAll = await Item.findAll()
      // console.log("Test");
      // console.log(findAll);
      res.status(200).json(findAll);
  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }
});

// receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"))
});