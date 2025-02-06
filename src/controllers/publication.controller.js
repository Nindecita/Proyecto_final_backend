import {
  createPublication,
  publicationById,
  allFind,
  publicationDelete,
  publicationUpdate,
  userById,
} from "../models/publication.model.js";

const newPublication = async (req, res) => {
  try {
    const publication = await createPublication(req.body);
    return res.status(200).json(publication);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

const findPublicationById = async (req, res) => {
  try {
    const { publication_id } = req.params;
    const publication = await publicationById(publication_id);
    const data = publication
      ? publication
      : { message: "La publicación no existe" };
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const findUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const publication = await userById(user_id);
    const data = publication
      ? publication
      : { message: "Aun no tienes publicaciones creadas en la app" };
    return res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    
    res.status(500).json({ error: error });
  }
};

const findAll = async (req, res) => {
  try {
    const publication = await allFind();
    const data = publication
      ? publication
      : { message: "No hay publicacionespara mostrar" };
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deletePublication = async (req, res) => {
  try {
    const { publication_id } = req.params;
    const publication = await publicationDelete(publication_id);
    return res.status(204).json(publication);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updatePublication = async (req, res) => {
  try {
    const { publication_id } = req.params;
    const newData = req.body;
    const publication = await publicationUpdate(publication_id, newData);
    return res.status(200).json(publication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export {
  newPublication,
  findPublicationById,
  findUserById,
  findAll,
  deletePublication,
  updatePublication,
};
