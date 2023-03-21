const router = require("express").Router();
const userService = require("../services/userService");

//-----HITTA USER_ID OCH VISA VARUKORG MED INNEHÅLL
router.get("/:id/", (req, res) => {
  const id = req.params.id;
  userService.getById(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----GET ALL
router.get("/", (req, res) => {
  userService.getAll().then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----CREATE
router.post("/", (req, res) => {
  const body = req.body;
  userService.create(body).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----UPDATE
router.put("/", (req, res) => {
  const body = req.body;
  const id = body.id;
  userService.update(body, id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

//-----DELETE
router.delete("/", (req, res) => {
  const id = req.body.id;
  userService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;

/* router.get("/:userId/cartContent/", (req, res) => {
  const userId = req.params.userId;
  userService.getCartContent(userId).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

/*Get carts */
/* router.get("/carts/", (req, res) => {
  userService.getCarts().then((result) => {
    res.status(result.status).json(result.data);
  });
}); */

//Get cart for user ID
/* router.get("/:userId/cart/", (req, res) => {
  const userId = req.params.userId;
  userService.getCart(userId).then((result) => {
    res.status(result.status).json(result.data);
  });
}); */
