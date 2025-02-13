import { findCategories } from "../models/category.model.js";

const getCategories = async (req, res) => {
    try {
        const categories = await findCategories();
        return res.status(200).json(categories);
      } catch (error) {
        console.log(error);
    
        res.status(500).json({ error: error });
      }
}

export {getCategories}