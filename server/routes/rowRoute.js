const router = require("express").Router();
const db = require("../models");

router.get("/", (req, res) => {
  db.row.findAll().then((result) => {
    res.send(result);
  });
});

module.exports = router;
