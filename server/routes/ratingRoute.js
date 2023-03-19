const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

/*----------------GET--------------------------- */
router.get("/", (req, res) => {
  db.rating.findAll().then((result) => {
    res.send(result);
  });
});

/*----------------CREATE / POST----------------- */
router.post("/", (req, res) => {
  const body = req.body;
  const invalidData = validate(body);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.rating.create(body).then((result) => {
      res.send("Betyg skapad");
    });
  }
});
/*----------------UPDATE / PUT------------------ */
router.put("/", (req, res) => {
  const body = req.body;
  const invalidData = validate(body);
  const id = body.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || "id är obligatoriskt");
  } else {
    db.rating
      .update(body, {
        where: { id: body.id },
      })
      .then((result) => {
        res.send("Betyg ändrat");
      });
  }
});
/*----------------DELETE / DESTROY-------------- */
router.delete("/", (req, res) => {
  db.rating
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json(`Antal betyg raderade: ${result}`);
    });
});

module.exports = router;
