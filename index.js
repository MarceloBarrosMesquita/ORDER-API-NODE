const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado ao MongoDB Atlas!"))
  .catch(err => console.error("❌ Erro ao conectar:", err));

const OrderSchema = new mongoose.Schema({
  orderId: String,
  value: Number,
  creationDate: Date,
  items: [{ productId: Number, quantity: Number, price: Number }]
});

const Order = mongoose.model('Order', OrderSchema);

// 1. CRIAR (POST) - Mapping Obrigatório
app.post('/order', async (req, res) => {
  try {
    const input = req.body;
    const mappedOrder = {
      orderId: input.numeroPedido.split('-')[0],
      value: input.valorTotal,
      creationDate: new Date(input.dataCriacao),
      items: input.items.map(item => ({
        productId: Number(item.idItem),
        quantity: item.quantidadeItem,
        price: item.valorItem
      }))
    };
    const newOrder = new Order(mappedOrder);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar", details: error.message });
  }
});

// 2. LISTAR TODOS (GET) - Opcional
app.get('/order/list', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// 3. OBTER POR ID (GET) - Obrigatório
app.get('/order/:id', async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id });
  order ? res.json(order) : res.status(404).json({ message: "Não encontrado" });
});

// 4. ATUALIZAR (PUT) - Opcional
app.put('/order/:id', async (req, res) => {
  try {
    const updated = await Order.findOneAndUpdate(
      { orderId: req.params.id }, 
      req.body, // Aqui você passaria os campos mapeados para atualizar
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar" });
  }
});

// 5. DELETAR (DELETE) - Opcional
app.delete('/order/:id', async (req, res) => {
  await Order.findOneAndDelete({ orderId: req.params.id });
  res.status(204).send(); // 204 significa "Sucesso, mas sem conteúdo para retornar"
});

app.listen(3000, () => console.log("🚀 Servidor rodando em http://localhost:3000"));