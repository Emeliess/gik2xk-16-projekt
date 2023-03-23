const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
const productService = require("../services/productService");
const sequelize = require("sequelize");

router.get("/", (req, res) => {
  db.rating.findAll().then((result) => {
    res.send(result);
  });
});

//-----GET ALL
router.post("/", (req, res) => {
  const rating = req.body.rating;
  const id = req.body.productId;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----AVERAGE RATING
/* router.get("/averageRating/", (req, res) => {
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
 */
module.exports = router;
