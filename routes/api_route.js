const storage = require("../db/storage");
const router = require("express").Router();

//read db.json file and return all saved notes as JSON
router.get("/notes", async (req, res) => {
  storage.getNote().then((note) => {
    return res.json(note)
  }).catch((err) => res.status(500).json(err))
});

// receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
router.post("/notes", (req, res) => {
  storage.addNote(req.body).then((note) => res.json(note))
  .catch((err) => res.status(500).json(err));
});

module.exports = router;