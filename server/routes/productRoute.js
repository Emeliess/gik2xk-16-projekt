const router = require("express").Router();
const productService = require("../services/productService");

/*-----------------CUSTOM ROUTES-------------------------------------- */
/*GET ID */
router.get("/:id/", (req, res) => {
  const id = req.params.id;
  productService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
/*ADD TO CART */
router.post("/:id/addToCart", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.id;
  const cartRow = req.body;

  productService.addProductToCart(userId, productId, cartRow).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*ADD RATING*/
router.post("/:id/addRating", (req, res) => {
  const rating = req.body;
  const id = req.params.id;
  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get("/:id/ratings", (req, res) => {
  const id = req.params.id;

  productService.getProductRatings(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*-------------------------------------------------------------- */
/*----------------GET ALL----------------------- */
router.get("/", (req, res) => {
  productService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*----------------CREATE / POST----------------- */
router.post("/", (req, res) => {
  const body = req.body;
  productService.create(body).then((result) => {
    res.status(result.status).json(result.data);
  });
});
/*----------------UPDATE / PUT------------------ */
router.put("/", (req, res) => {
  const body = req.body;
  const id = body.id;
  productService.update(body, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put("/:id/update", (req, res) => {
  const product = req.body;
  const id = req.params.id;

  productService.update(product, id).then((result) => {
    res.status(result.status).json(result.data);
  });
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
router.delete("/:id/delete", (req, res) => {
  const id = req.params.id;
  productService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
