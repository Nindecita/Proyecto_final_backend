import { createComment, commentById, commentDelete, commentUpdate } from "../models/comment.model.js";

const newComment = async (req, res) => {
  try {
    const comment = await createComment(req.body);

    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error });
  }
};

const findCommentById = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const comment = await commentById(comment_id);
    const data = comment ? comment : {message: 'El comentario no existe'}
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const comment = await commentDelete(comment_id);
    return res.status(204).json(comment);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateComment = async (req, res) => {
    try {
      const { comment_id } = req.params;
      const newData = req.body; 
      const comment = await commentUpdate(comment_id, newData);
      return res.status(200).json(comment);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
export { newComment, findCommentById, deleteComment, updateComment };