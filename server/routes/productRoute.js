const router = require("express").Router();
const productService = require("../services/productService");
const db = require("../models");

//-----ADD RATING TO PRODUCT
router.post("/:id/addRating", (req, res) => {
  const rating = req.body.rating;
  const id = req.params.id;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----GET RATINGS
router.get("/:id/ratings/", (req, res) => {
  const productId = req.params.id;
  console.log(productId);
  db.rating
    .findAll({
      where: {
        productId: productId,
      },
    })
    .then((result) => {
      res.send(result);
    });
});

//-----FIND PRODUCT ID
router.get("/:id/", (req, res) => {
  const id = req.params.id;
  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----GET ALL PRODUCTS
router.get("/", (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----CREATE
router.post("/", (req, res) => {
  const body = req.body;
  productService.create(body).then((result) => {
    res.status(result.status).json(result.data);
  });
});
//-----UPDATE
router.put("/", (req, res) => {
  const body = req.body;
  const id = body.id;
  productService.update(body, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----DELETE
router.delete("/:id", (req, res) => {
  db.product
    .destroy({
      where: { id: req.params.id },
    })
    .then((result) => {
      res.json(`Antal produkter raderade: ${result}`);
    });
});

module.exports = router;
