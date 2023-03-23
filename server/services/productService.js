const db = require("../models");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");

//-----CONSTRAINTS
const constraints = {
  imageUrl: {
    url: {
      message: "^Bildadressen är felaktig",
    },
  },
};

//-----HITTA PRODUKT_ID OCH INKLUDERA MEDELVÄRDE AV BETYG
const sequelize = require("sequelize");
async function getById(id) {
  try {
    const allProduct = await db.product.findOne({
      where: { id },
      include: [
        {
          model: db.rating,
          attributes: [
            [sequelize.fn("AVG", sequelize.col("rating")), "AverageRating"],
          ],
        },
      ],
    });
    return createResponseSuccess(allProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----LÄGGA TILL BETYG PÅ PRODUKT
async function addRating(id, ratingValue) {
  if (!id) {
    return createResponseError(422, "id är obligatoriskt");
  }
  try {
    const ratingObject = { productId: id, rating: ratingValue };
    const newRating = await db.rating.create(ratingObject);
    return createResponseSuccess(newRating);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----LÄGG TILL PRODUKT I VARUKORG
async function addToCart(productId) {
  try {
    await db.cart.create({
      productId,
    });
    return createResponseMessage(200, "Produkten lades till i varukorgen");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----GET ALL PRODUCTS
async function getAll() {
  try {
    const allProduct = await db.product.findAll();
    return createResponseSuccess(allProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----GET ALL PRODUCTS
async function getCart() {
  try {
    const cart = await db.cart.findAll();
    return createResponseSuccess(cart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----GET CART CONTENT
async function getCart() {
  try {
    const allProduct = await db.cart.findAll();
    return createResponseSuccess(allProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----CREATE
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

//-----UPDATE
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

//-----DELETE
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

module.exports = {
  getById,
  addRating,
  addToCart,
  getAll,
  getCart,
  create,
  update,
  destroy,
};
