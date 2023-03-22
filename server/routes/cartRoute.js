//-----DENNA ROUTE ANVÄNDS EJ. ENBART FÖR TEST

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
      //const productIds = result.map((item) => item.productId);
      res.send(result);
    });
});

/* router.get("/", (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
}); */

//-----LÄGG TILL PRODUKT I VARUKORG
router.post("/", async (req, res) => {
  //const { userId } = req.params;
  //const { id } = req.body;
  const id = req.body;
  //console.log(id);
  const idKeys = Object.keys(id);
  const idValue = idKeys[0];
  //console.log(idValue);
  productService.addToCart(idValue).then((result) => {
    res.status(result.status).json(result.data);
  });
  /*   const result = await productService.addToCart(productId, userId, amount);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  } */
});

//-----GET ALL PRODUCTS
router.get("/", (req, res) => {
  productService.getCart().then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;

/* 
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

router.delete("/", (req, res) => {
  db.cart
    .destroy({
      where: { id: req.body.id },
    })
    .then((result) => {
      res.json(`Antal kundvagnar raderade: ${result}`);
    });
});
 */
