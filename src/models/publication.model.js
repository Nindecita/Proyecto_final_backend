import { pool } from "../../config/bd/conection.db.js";

const createPublication = async ({
  user_id,
  price,
  category_id,
  description,
  image,
  state,
  title,
}) => {
  const newState = state === "Nuevo" ? true : false
  const SQLquery = {
    text: "INSERT INTO publications (user_id, price, category_id, description, image, state, title) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    values: [
      Number(user_id),
      price,
      Number(category_id),
      description,
      image,
      newState,
      title,
    ],
  };
  if (user_id && category_id) {
    const publication = await pool.query(SQLquery);
    return publication.rows[0];
  } else {
    throw new Error("el user id o category id deben estar presentes");
  }
};

const byCategory_id = async (category_id) => {
  const SQLquery = {
    text: "SELECT * FROM publications WHERE category_id = $1",
    values: [Number(category_id)],
  };
  const publication = await pool.query(SQLquery);

  return publication.rows[0];
};

const publicationById = async (publication_id) => {
  const SQLquery = {
    text: "SELECT * FROM publications WHERE publication_id = $1",
    values: [Number(publication_id)],
  };
  const publication = await pool.query(SQLquery);

  return publication.rows[0];
};

const userById = async (user_id) => {
  const SQLquery = {
    text: "SELECT * FROM publications WHERE user_id = $1",
    values: [Number(user_id)],
  };
  const publication = await pool.query(SQLquery);

  return publication.rows;
};

const allFind = async () => {
  const SQLquery = {
    text: "SELECT * FROM publications",
  };
  const publication = await pool.query(SQLquery);

  return publication.rows;
};

const publicationDelete = async (publication_id) => {
  const SQLquery = {
    text: "DELETE FROM publications WHERE publication_id = $1",
    values: [publication_id],
  };
  const publication = await pool.query(SQLquery);
  return publication.rows[0];
};

const publicationUpdate = async (publication_id, newData) => {
  const { price, category_id, description, image, state, title } = newData;

  const oldUserData = await publicationById(publication_id);
  const newPrice = price ? price : oldUserData.price;
  const newCategory_id = category_id ? category_id : oldUserData.category_id;
  const newDescription = description ? description : oldUserData.description;
  const newImage = image ? image : oldUserData.image;
  const newState = state ? state : oldUserData.state;
  const newTitle = title ? title : oldUserData.title;

  const SQLquery = {
    text: "UPDATE publications SET price = $1, category_id = $2, description = $3, image = $4, state = $5, title = $6  WHERE publication_id = $7 RETURNING *",
    values: [
      newPrice,
      newCategory_id,
      newDescription,
      newImage,
      newState,
      newTitle,
      publication_id,
    ],
  };
  const publication = await pool.query(SQLquery);
  return publication.rows[0];
};

export {
  createPublication,
  byCategory_id,
  publicationById,
  allFind,
  publicationDelete,
  publicationUpdate,
  userById,
};
