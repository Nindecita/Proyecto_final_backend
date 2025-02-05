import { createOrderDetail, orderDetailById, orderDetailDelete, orderDetailUpdate } from "../models/order_detail.model.js";

const newOrderDetail = async (req, res) => {
  try {
    const orderDetail = await createOrderDetail(req.body);

    return res.status(200).json(orderDetail);
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: error });
  }
};

const findOrderDetailById = async (req, res) => {
  try {
    const { order_detail_id } = req.params;
    const orderDetail = await orderDetailById(order_detail_id);
    const data = orderDetail ? orderDetail : {message:  'La orden de detalle no existe'}
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteOrderDetail = async (req, res) => {
  try {
    const { order_detail_id } = req.params;
    const orderDetail = await orderDetailDelete(order_detail_id);
    return res.status(204).json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateOrderDetail = async (req, res) => {
    try {
      const { order_detail_id } = req.params;
      const newData = req.body; 
      const orderDetail = await orderDetailUpdate(order_detail_id, newData);
      return res.status(200).json(orderDetail);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
export { newOrderDetail, findOrderDetailById, deleteOrderDetail, updateOrderDetail };