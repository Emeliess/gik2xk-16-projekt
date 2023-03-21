const db = require("../models");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");
const userService = require("../services/userService");

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
            [
              sequelize.fn("AVG", sequelize.col("rating")),
              "AverageRating",
            ],
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

//-----LÄGG TILL PRODUKT I VARUKORG
async function addToCart(productId, userId, amount) {
  try {
    // Kolla om användaren redan har en cart
    let cartId;
    let cart = await db.cart.findOne({
      where: { userId },
    });
    if (!cart) {
      // Om användaren inte har någon cart, skapa en ny cart
      cart = await db.cart.create({ userId });
      cartId = cart[db.cart.primaryKeyAttribute];
    }
    cart = await db.cart.findOne({
      where: { userId },
    });
    cartId = cart[db.cart.primaryKeyAttribute];
    // Skapa en ny cart row med angiven amount cart och produkt
    const row = await db.row.create({
      amount,
      cartId,
      productId,
    });
    return createResponseMessage(200, "Produkten lades till i varukorgen");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----GET ALL
async function getAll() {
  try {
    const allProduct = await db.product.findAll();
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

/* function _formatProduct(product) {
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
} */

module.exports = {
  getById,
  addRating,
  addToCart,
  getAll,
  create,
  update,
  destroy,
};

//Hitta productID och inkludera ratings
/* async function getById(id) {
  try {
    const allProduct = await db.product.findOne({
      where: { id },
      include: [db.rating],
    });
    return createResponseSuccess(allProduct);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
 */

/* async function addToCart(userId, productId, row) {
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
} */
