const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
const productService = require("../services/productService");

/*------------CONSTRAINTS------------- */
const constraints = {
  rating: {
    numericality: {
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 10,
      message: "^Ange ett betyg från 1-10",
    },
  },
};

router.post("/:id/addRating", (req, res) => {
  const rating = req.body;
  const id = req.params.id;

  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*----------------GET--------------------------- */
router.get("/", (req, res) => {
  db.rating.findAll().then((result) => {
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
    db.rating.create(body).then((result) => {
      res.send("Betyg skapat");
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
