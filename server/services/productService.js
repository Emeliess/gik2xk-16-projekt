const db = require("../models");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");
/*----------------CONSTRAINTS--------------------*/
const constraints = {
  imageUrl: {
    url: {
      message: "^Bildadressen är felaktig",
    },
  },
};
/*-----------------------------------------------*/
/*GET BY ID */
async function getById(id) {
  try {
    const allProduct = await db.product.findOne({
      where: { id },
    });
    /*Om allt blev bra returnera allProduct.*/
    return createResponseSuccess(allProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
/*ADD RATING */
async function addRating(id, rating) {
  if (!id) {
    return createResponseError(422, "id är obligatoriskt");
  }
  try {
    rating.productId = id;
    await db.rating.create(rating);
    const productWithNewRating = await db.product.findOne({
      where: { id },
      include: [db.rating],
    });
    return createResponseSuccess(productWithNewRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

/*ADD TO CART */
async function addToCart(userId, productId, row) {
  if (!userId) {
    return createResponseError(422, "UserId är obligatoriskt");
  }
  try {
    row.productId = productId;
    const cart = await db.cart.findOne({
      where: { userId },
    });
    row.cartId = cart.id;
    console.log(cart.id);
    await db.row.create(row);
    const newCart = await db.cart.findOne({
      where: { id: cart.id },
      include: [db.cartRow],
    });
    return createResponseSuccess(newCart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

/*----------------GET ALL-------------- */
async function getAll() {
  try {
    const allProduct = await db.product.findAll({
      include: [db.rating],
    });
    /*Om allt blev bra returnera allProduct.*/
    return createResponseSuccess(allProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
/*----------------CREATE----------------- */
async function create(body) {
  const invalidData = validate(body, constraints);
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    const newProduct = await db.product.create(body);
    return createResponseSuccess(newProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
/*----------------UPDATE------------------ */
async function update(body, id) {
  const invalidData = validate(body, constraints);
  if (!id) {
    return createResponseError(422, "id är obligatoriskt");
  }
  if (invalidData) {
    return createResponseError(422, invalidData);
  }
  try {
    await db.product.update(body, {
      where: { id },
    });
    return createResponseMessage(200, "Produkten uppdaterades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
/*----------------DESTROY-------------- */
async function destroy(id) {
  if (!id) {
    return createResponseError(422, "id är obligatoriskt");
  }
  try {
    await db.product.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Produkten raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

function _formatProduct(product) {
  const cleanProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    imageUrl: product.imageUrl,
    sumRating: {
      rating: product.rating.rating,
    },
  };
  if (product.rating) {
    cleanProduct.rating = [];
  }
}

module.exports = {
  getById,
  addToCart,
  addRating,
  getAll,
  create,
  update,
  destroy,
};
