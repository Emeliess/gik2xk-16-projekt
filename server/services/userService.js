const db = require("../models");
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require("../helpers/responseHelper");
const validate = require("validate.js");
/*----------------CONSTRAINTS--------------------*/
const constraints = {
  eMail: {
    email: {
      message: "^Ange en giltig mejladress",
    },
  },
};

//-----HITTA USER_ID OCH VISA VARUKORG MED INNEHÅLL
async function getById(id) {
  try {
    const oneUser = await db.user.findOne({
      where: { id },
      include: [
        {
          model: db.cart,
          include: [db.row],
        },
      ],
    });
    return createResponseSuccess(oneUser);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

//-----GET ALL
async function getAll() {
  try {
    const allUser = await db.user.findAll();
    /*Om allt blev bra returnera allUser.*/
    return createResponseSuccess(allUser);
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
    const newUser = await db.user.create(body);
    return createResponseSuccess(newUser);
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
    await db.user.update(body, {
      where: { id },
    });
    return createResponseMessage(200, "Användaren uppdaterades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
//-----DESTROY
async function destroy(id) {
  if (!id) {
    return createResponseError(422, "id är obligatoriskt");
  }
  try {
    await db.user.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Användaren raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  destroy,
};

/*GET CART ( ANVÄNDS EJ )*/
/* async function getCart(userId) {
  try {
    //const cart = await db.cart.findPk(userId);
    //let cart = await db.cart.id({ where: { userId } });
    //console.log(`value in getCart for userId is ${userId} `);
    const cartId = await db.cart.findOne({
      where: { userId },
      //include: [db.cart],
      attributes: ["id"],
    });
    //console.log(`value in getCart for cartId is ${cartId} `);
    //Om allt blev bra returnera allUser.
    return createResponseSuccess(cartId);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */

/*GET CART CONTENT FOR USER*/
/* async function getCartContent(userId) {
  try {
    const id = await getCart(userId);
    const content = await db.row.findOne({
      where: { id },
      attributes: ["productId"],
    });
    return createResponseSuccess(content);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */

/*GET ALL CARTS*/
/* async function getCarts(userId) {
  try {
    const carts = await db.cart.findAll();
    return createResponseSuccess(carts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
} */
