import { pool } from "../../config/bd/conection.db.js";
import bcrypt from "bcryptjs";

const createComment = async ({ publication_id, user_id, comment }) => {
  const SQLquery = {
    text: "INSERT INTO comments ( publication_id, user_id, comment ) VALUES ($1, $2, $3) RETURNING *",
    values: [Number(publication_id), Number(user_id), comment],
  };
  if (user_id && publication_id) {
    const comment = await pool.query(SQLquery);
    return comment.rows[0];
  } else {
    throw new Error("el user id o publication id deben estar presentes");
  }
};

const commentById = async (comment_id) => {
  const SQLquery = {
    text: "SELECT * FROM comments WHERE comment_id = $1",
    values: [Number(comment_id)],
  };
  const comment = await pool.query(SQLquery);
  return comment.rows[0];
};

const commentDelete = async (comment_id) => {
  const SQLquery = {
    text: "DELETE FROM comments WHERE comment_id = $1",
    values: [comment_id],
  };
  const comment = await pool.query(SQLquery);
  return comment.rows[0];
};

const commentUpdate = async (comment_id, newData) => {
  const { publication_id, user_id, comment } = newData;

  if (!comment_id) {
    throw new Error("comment_id es requerido");
  }

  const oldUserData = await commentById(comment_id);
  if (!oldUserData) {
    throw new Error("Comentario no encontrado");
  }

  const newComment = comment ? comment : oldUserData.comment;

  const SQLquery = {
    text: "UPDATE comments SET publication_id = $1, user_id = $2, comment = $3 WHERE comment_id = $4 RETURNING *",
    values: [publication_id, user_id, newComment, comment_id],
  };

  try {
    const result = await pool.query(SQLquery);

    if (result.rowCount === 0) {
      return { message: "No se encontró el comentario para actualizar" };
    }

    return {
      message: "Comentario actualizado con éxito",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error en la actualización del comentario:", error);
    throw new Error("Error al actualizar el comentario");
  }
};

const getCommentsByPublication = async (publication_id) => {
  const SQLquery = {
    text: `
      SELECT comments.comment_id, comments.comment, comments.created_at, 
      users.user_id, users.name
      FROM comments
      JOIN users ON comments.user_id = users.user_id
      WHERE comments.publication_id = $1
    `,
    values: [Number(publication_id)],
  };

  try {
    const result = await pool.query(SQLquery);
    return result.rows;
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    throw new Error("Error al obtener los comentarios");
  }
};


export { createComment, commentById, commentDelete, commentUpdate, getCommentsByPublication };
