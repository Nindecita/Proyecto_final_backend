import { pool } from "../../config/bd/conection.db.js";
import bcrypt from "bcryptjs";

const createOrder = async ({ user_id, state }) => {
  const SQLquery = {
    text: "INSERT INTO orders (user_id, state) VALUES ($1, $2) RETURNING *",
    values: [Number(user_id), state],
  };

  const order = await pool.query(SQLquery);
  return order.rows[0];
};

const orderById = async (order_id) => {
  const SQLquery = {
    text: "SELECT * FROM orders WHERE order_id = $1",
    values: [Number(order_id)],
  };
  const order = await pool.query(SQLquery);

  return order.rows[0];
};

const orderDelete = async (order_id) => {
  const SQLquery = {
    text: "DELETE FROM orders WHERE order_id = $1",
    values: [order_id],
  };
  const order = await pool.query(SQLquery);
  return order.rows[0];
};

const orderUpdate = async (order_id) => {
  const oldUserData = await orderById(order_id);
  const newState = oldUserData.state ? false : true;

  const SQLquery = {
    text: "UPDATE orders SET state = $1 WHERE order_id = $2 RETURNING *",
    values: [newState, order_id],
  };
  const order = await pool.query(SQLquery);
  return order.rows[0];
};

export { createOrder, orderById, orderDelete, orderUpdate };
