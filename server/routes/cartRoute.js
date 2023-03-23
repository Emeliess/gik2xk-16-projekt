const router = require("express").Router();
const productService = require("../services/productService");
const db = require("../models");
const Sequelize = require("sequelize");

router.get("/", (req, res) => {
  db.cart
    .findAll({
      attributes: [
        "productId",
        [Sequelize.fn("count", Sequelize.col("productId")), "count"],
      ],
      group: ["productId"],
    })
    .then((result) => {
      res.send(result);
    });
});

//-----LÄGG TILL PRODUKT I VARUKORG
router.post("/", async (req, res) => {
  const id = req.body;
  const idKeys = Object.keys(id);
  const idValue = idKeys[0];
  productService.addToCart(idValue).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----GET ALL PRODUCTS
router.get("/", (req, res) => {
  productService.getCart().then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
