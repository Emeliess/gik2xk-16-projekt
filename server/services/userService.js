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
      message: "^Du måste ange en giltig mejladress",
    },
  },
};
/*-----------------------------------------------*/
async function getAll() {
  try {
    const allUser = await db.user.findAll();
    /*Om allt blev bra returnera allUser.*/
    return createResponseSuccess(allUser);
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
    const newUser = await db.user.create(body);
    return createResponseSuccess(newUser);
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
    await db.user.update(body, {
      where: { id },
    });
    return createResponseMessage(200, "Användaren uppdaterades");
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
    await db.user.destroy({
      where: { id },
    });
    return createResponseMessage(200, "Användaren raderades");
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = { getAll, create, update, destroy };
