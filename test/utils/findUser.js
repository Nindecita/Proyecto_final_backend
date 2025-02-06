import { pool } from "../../config/bd/conection.db";

const findUsers = async () => {
  try {
    
    const SQLquery = {
      text: "SELECT * FROM users",
    };
    const user = await pool.query(SQLquery);
  
    return user.rows[0].user_id;
  } catch (error) {
    console.log("error-------------------->", error);
    
  }
};

export { findUsers };
