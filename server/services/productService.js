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
    const newRating = await db.rating.create(rating);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
/*ADD TO CART */
async function addToCart(id, row) {}

/*----------------GET ALL-------------- */
async function getAll() {
  try {
    const allProduct = await db.product.findAll();
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
