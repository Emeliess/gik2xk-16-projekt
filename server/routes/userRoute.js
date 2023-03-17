const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

/*----------------CONSTRAINTS--------------------*/
const constraints = {
  eMail: {
    email: {
      message: "^Du måste ange en giltig mejladress",
    },
  },
};

/*----------------GET--------------------------- */
router.get("/", (req, res) => {
  db.user.findAll().then((result) => {
    res.send(result);
  });
});

/*----------------CREATE / POST----------------- */
router.post("/", (req, res) => {
  const body = req.body;
  const invalidData = validate(body, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    db.user.create(body).then((result) => {
      res.send("Användare har skapats");
    });
  }
});
/*----------------UPDATE / PUT------------------ */
router.put("/", (req, res) => {
  const body = req.body;
  const invalidData = validate(body, constraints);
  const id = body.id;
  if (invalidData || !id) {
    res.status(400).json(invalidData || "id är obligatoriskt");
  } else {
    db.user
      .update(body, {
        where: { id: body.id },
      })
      .then((result) => {
        res.send("Användare har uppdaterats");
      });
  }
});
/*----------------DELETE / DESTROY-------------- */

router.delete("/", (req, res) => {
  const body = req.body;
  db.user
    .destroy({
      where: { id: body.id },
    })
    .then((result) => {
      res.json(`Antal användare raderade ${result}`);
    });
});

module.exports = router;
