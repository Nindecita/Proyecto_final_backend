import {
  createUser,
  getPurchases,
  getSales,
  userById,
  userDelete,
  userUpdate,
} from "../models/user.model.js";

const newUser = async (req, res) => {
  try {
    const user = await createUser(req.body);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error });
  }
};

const findUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await userById(user_id);
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await userDelete(user_id);
    return res.status(204).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const newData = req.body;
    const user = await userUpdate(user_id, newData);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const myPurchases = async (req, res) => {
  try {
    const { user_id } = req.params;
    const purchases = await getPurchases(user_id);
    return res.status(200).json(purchases);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const mySales = async (req, res) => {
  try {
    const { user_id } = req.params;
    const sales = await getSales(user_id);
    return res.status(200).json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { newUser, findUserById, deleteUser, updateUser, myPurchases, mySales };
