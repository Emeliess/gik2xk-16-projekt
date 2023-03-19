const router = require("express").Router();
const userService = require("../services/userService");

/*Get userId och cartID */
router.get("/:userId/carts/:cartId", (req, res) => {
  const userId = req.params.userId;
  const cartId = req.params.cartId;
  userService.getProductFromCart(userId, cartId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*----------------GET--------------------------- */
router.get("/", (req, res) => {
  userService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

/*----------------CREATE / POST----------------- */
router.post("/", (req, res) => {
  const body = req.body;
  userService.create(body).then((result) => {
    res.status(result.status).json(result.data);
  });
});
/*----------------UPDATE / PUT------------------ */
router.put("/", (req, res) => {
  const body = req.body;
  const id = body.id;
  userService.update(body, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
/*----------------DELETE / DESTROY-------------- */

router.delete("/", (req, res) => {
  const id = req.body.id;
  userService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
