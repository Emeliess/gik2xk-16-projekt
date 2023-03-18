const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

/*----------------CONSTRAINTS--------------------*/
const constraints = {
  imageUrl: {
    url: {
      message: "^Sökvägen är felaktig",
    },
  },
};

/*----------------GET--------------------------- */
router.get("/", (req, res) => {
  db.product.findAll().then((result) => {
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
    db.product.create(body).then((result) => {
      res.send("Produkt skapad");
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
    db.product
      .update(body, {
        where: { id: body.id },
      })
      .then((result) => {
        res.send("Produkten har uppdaterats");
      });
  }
});
/*----------------DELETE / DESTROY-------------- */
router.delete("/", (req, res) => {
  db.product
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json(`Antal produkter raderade: ${result}`);
    });
});

module.exports = router;
