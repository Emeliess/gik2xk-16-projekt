const router = require("express").Router();
const productService = require("../services/productService");
const db = require("../models");
const { async } = require("validate.js");

//-----LÄGGA TILL BETYG PÅ PRODUKT
router.post("/:id/addRating", (req, res) => {
  const rating = req.body;
  const id = req.params.id;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get("/:id/ratings", async (req, res) => {
  const id = req.params.id;
  const result = await productService.getRatings(id);
  res.status(result.status).json(result.data);
})

//-----LÄGG TILL PRODUKT I VARUKORG
router.post("/addToCart/:userId", async (req, res) => {
  const { userId } = req.params;
  const { productId, amount } = req.body;
  productService.addToCart(productId, userId, amount).then((result) => {
    res.status(result.status).json(result.data);
  });
  /*   const result = await productService.addToCart(productId, userId, amount);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(400).json(result);
  } */
});

//-----HITTA PRODUKT_ID
router.get("/:id/", (req, res) => {
  const id = req.params.id;
  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----GET ALL
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

/* router.put("/:id/update", (req, res) => {
  const product = req.body;
  const id = req.params.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

/* router.post("/:id/user/:userId/addToCart", (req, res) => {
  const userId = req.params.userId; 
  const productId = req.params.id;
  const amount = req.body;
  productService.addToCart(userId, productId, amount).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */
