import { pool } from "../../config/bd/conection.db.js";
const findCategories = async () => {
  const SQLquery = {
    text: "SELECT * FROM categories",
  };
  const publication = await pool.query(SQLquery);

  return publication.rows;
};

export { findCategories };
