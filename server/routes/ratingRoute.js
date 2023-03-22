//-----DENNA ROUTE ANVÄNDS EJ. ENBART FÖR TEST

const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
const productService = require("../services/productService");
const sequelize = require("sequelize");

const constraints = {
  rating: {
    numericality: {
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 10,
      message: "^Ange ett betyg från 1-10",
    },
  },
};

router.get("/", (req, res) => {
  db.rating.findAll().then((result) => {
    res.send(result);
  });
});

/* router.get("/getRating/", (req, res) => {
  const productId = req.body;
  console.log(productId);
  db.rating
    .findAll({
      where: {
        productId: productId,
      },
      attributes: ["rating"],
    })
    .then((result) => {
      res.send(result);
    });
}); */

router.post("/", (req, res) => {
  const rating = req.body.rating;
  const id = req.body.productId;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get("/averageRating/", (req, res) => {
  db.rating
    .findAll({
      attributes: [[sequelize.fn("AVG", sequelize.col("rating")), "avgRating"]],
    })
    .then((result) => {
      const avgRating = result[0].dataValues.avgRating;
      res.send({ avgRating });
    })
    .catch((error) => {
      res.status(error.status).json(error.message);
    });
});

/*
router.get("/:id", (req, res) => {
  let id = req.params.id;
  db.rating.findAll({ where: { productId : id }}).then((result) => {
    res.send(result);
  });
});

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

router.delete("/", (req, res) => {
  db.rating
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json(`Antal betyg raderade: ${result}`);
    });
});
*/
module.exports = router;
