import api from "../api/api.js";

export async function getAll() {
  const products = await api.get("/products");

  return products.data;
}

export async function getOne(id) {
  const result = await api.get("/products/" + id);

  return result.data;
}

export async function create(product) {
  const result = await api.post("/products", product);

  return result.data;
}

export async function update(product) {
  const result = await api.put("/products", product);

  return result.data;
}

export async function deleteProduct(id) {
  const result = await api.delete("/products/" + id);

  return result.data;
}

export async function getProductRating(id) {
  const result = await api.get("/ratings/" + id);

  return result.data;
}

export async function setProductRating(id, rating) {
  const result = await api.post("/ratings", { productId: id, rating: rating });

  return result.data;
}
