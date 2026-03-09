# Order API - Node.js & MongoDB

API desenvolvida como parte do desafio técnico para gerenciamento de pedidos, realizando o mapeamento de campos (Português -> Inglês) e integração com MongoDB Atlas.

## 🚀 Tecnologias Utilizadas
* Node.js
* Express
* MongoDB Atlas (Mongoose)
* Dotenv (Variáveis de ambiente)

## 🛠️ Endpoints
* **POST `/order`**: Cria um novo pedido (Recebe JSON em português e salva mapeado em inglês).
* **GET `/order/list`**: Lista todos os pedidos cadastrados.
* **GET `/order/:id`**: Busca um pedido específico pelo `orderId`.
* **PUT `/order/:id`**: Atualiza dados de um pedido.
* **DELETE `/order/:id`**: Remove um pedido do sistema.

## 📦 Como rodar o projeto
1. Clone o repositório.
2. Execute `npm install`.
3. Configure o arquivo `.env` com sua `MONGO_URI`.
4. Rode com `node index.js`.
