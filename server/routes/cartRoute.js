const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

/*----------------CONSTRAINTS--------------------*/
/* const constraints = {
  eMail: {
    email: {
      message: "^Du måste ange en giltig mejladress",
    },
  },
}; */

/*----------------GET--------------------------- */
router.get("/", (req, res) => {
  db.cart.findAll().then((result) => {
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
    db.cart.create(body).then((result) => {
      res.send(result);
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
    db.cart
      .update(body, {
        where: { id: body.id },
      })
      .then((result) => {
        res.send(result);
      });
  }
});
/*----------------DELETE / DESTROY-------------- */
router.delete("/", (req, res) => {
  db.cart
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json(`Antal kundvagnar raderade: ${result}`);
    });
});

module.exports = router;
