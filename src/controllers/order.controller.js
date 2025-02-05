import {
  createOrder,
  orderById,
  orderDelete,
  orderUpdate,
} from "../models/order.model.js"

const newOrder = async (req, res) => {
  try {
    const order = await createOrder(req.body);

    return res.status(200).json(order);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error });
  }
};

const findOrderById = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await orderById(order_id);
    const data = order ? order : { message: "la orden no existe" };
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await orderDelete(order_id);
    return res.status(204).json(order);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { order_id } = req.params;
    const order = await orderUpdate(order_id);
    return res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export { newOrder, findOrderById, deleteOrder, updateOrder };
