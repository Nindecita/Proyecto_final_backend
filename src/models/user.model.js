import { pool } from "../../config/bd/conection.db.js";
import bcrypt from "bcryptjs";

const createUser = async ({
  email,
  password,
  name,
  lastName,
  nick_name,
  image,
}) => {
  const hashedPassword = bcrypt.hashSync(password);
  const SQLquery = {
    text: "INSERT INTO users (email, password, name, last_name, nick_name, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    values: [email, hashedPassword, name, lastName, nick_name, image],
  };
  const user = await pool.query(SQLquery);
  return user.rows[0];
};

const byEmail = async (email) => {
  const SQLquery = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };
  const user = await pool.query(SQLquery);

  return user.rows[0];
};

const userById = async (user_id) => {
  const SQLquery = {
    text: "SELECT * FROM users WHERE user_id = $1",
    values: [Number(user_id)],
  };
  const user = await pool.query(SQLquery);

  return user.rows[0];
};

const userDelete = async (user_id) => {
  const SQLquery = {
    text: "DELETE FROM users WHERE user_id = $1",
    values: [user_id],
  };
  const user = await pool.query(SQLquery);
  return user.rows[0];
};

const userUpdate = async (user_id, newData) => {
  const { email, name, last_name, nick_name, image } = newData;

  const oldUserData = await userById(user_id);
  const newEmail = email ? email : oldUserData.email;
  const newName = name ? name : oldUserData.name;
  const newLast_name = last_name ? last_name : oldUserData.last_name;
  const newNick_name = nick_name ? nick_name : oldUserData.nick_name;
  const newImage = image ? image : oldUserData.image;

  const SQLquery = {
    text: "UPDATE users SET email = $1, name = $2, last_name = $3, nick_name = $4, image = $5 WHERE user_id = $6 RETURNING *",
    values: [newEmail, newName, newLast_name, newNick_name, newImage, user_id],
  };
  const user = await pool.query(SQLquery);
  return user.rows[0];
};

const getPurchases = async (userId) => {
  const SQLquery = {
    text: `
      SELECT 
          o.order_id AS "Order_id",
          p.title AS "Producto",
          p.description AS "Descripción",
          od.price AS "Precio",
          od.quantity AS "Cantidad",
          CONCAT(u.name, ' ', u.last_name) AS "Vendedor",
          u.email AS "Email"
      FROM order_details od
      JOIN orders o 
          ON od.order_id = o.order_id
      JOIN publications p 
          ON od.publication_id = p.publication_id
      JOIN users u 
          ON p.user_id = u.user_id
      WHERE o.user_id = $1
      ORDER BY o.order_id;
    `,
    values: [userId],
  };

  const result = await pool.query(SQLquery);
  return result.rows;
};

const getSales = async (userId) => {
  const SQLquery = {
    text: `
      SELECT
        o.order_id AS "order_id",
        p.title AS "producto",
        p.description AS "descripción", 
        p.price,
        CONCAT(u.name, ' ', u.last_name) AS "comprador",
        u.email AS "email"
      FROM publications p
      JOIN order_details od
        ON od.publication_id = p.publication_id
      JOIN orders o
        ON o.order_id = od.order_id
      JOIN users u
        ON o.user_id = u.user_id
      WHERE p.user_id = $1
      AND p.sold = true
      ORDER BY o.order_id;
    `,
    values: [userId],
  };

  const result = await pool.query(SQLquery);
  return result.rows;
};

export {
  createUser,
  byEmail,
  userById,
  userDelete,
  userUpdate,
  getPurchases,
  getSales,
};
