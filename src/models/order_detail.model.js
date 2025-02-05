import { pool } from "../../config/bd/conection.db.js";
import bcrypt from "bcryptjs";

const createOrderDetail = async ({
  order_id,
  publication_id,
  price,
  quantity,
}) => {
  const SQLquery = {
    text: "INSERT INTO order_details ( order_id, publication_id, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *",
    values: [Number(order_id), Number(publication_id), price, quantity],
  };
  if (order_id && publication_id) {
    const orderDetail = await pool.query(SQLquery);
    return orderDetail.rows[0];
  } else {
    throw new Error("el order id o publication id deben estar presentes");
  }
};

const byPublicationById = async (publication_id) => {
  const SQLquery = {
    text: "SELECT * FROM order_details WHERE publication_id = $1",
    values: [Number(publication_id)],
  };
  const orderDetail = await pool.query(SQLquery);

  return orderDetail.rows[0];
};

const orderDetailById = async (order_detail_id) => {
  const SQLquery = {
    text: "SELECT * FROM order_details WHERE order_detail_id = $1",
    values: [Number(order_detail_id)],
  };
  const orderDetail = await pool.query(SQLquery);

  return orderDetail.rows[0];
};

const orderDetailDelete = async (order_detail_id) => {
  const SQLquery = {
    text: "DELETE FROM order_details WHERE order_detail_id = $1",
    values: [order_detail_id],
  };
  const orderDetail = await pool.query(SQLquery);
  return orderDetail.rows[0];
};

const orderDetailUpdate = async (order_detail_id, newData) => {
  const { price, quantity } = newData;

  if (!order_detail_id) {
    throw new Error("order detail id es requerido");
  }

  const oldUserData = await orderDetailById(order_detail_id);
  if (!oldUserData) {
    throw new Error(" no encontrado");
  }

  const newPrice = price ? price : oldUserData.price;
  const newQuantity = quantity ? quantity : oldUserData.quantity;

  const SQLquery = {
    text: "UPDATE order_details SET price = $1, quantity = $2 WHERE order_detail_id = $3 RETURNING *",
    values: [newPrice, newQuantity, Number(order_detail_id)],
  };

  try {
    const result = await pool.query(SQLquery);

    if (result.rowCount === 0) {
      return { message: "No se encontró un order detail para actualizar" };
    }
    return result.rows[0];
  } catch (error) {
    console.error("Error en la actualización del precio:", error);
    throw new Error("Error al actualizar la cantidad");
  }
};

export {
  createOrderDetail,
  byPublicationById,
  orderDetailById,
  orderDetailDelete,
  orderDetailUpdate,
};
