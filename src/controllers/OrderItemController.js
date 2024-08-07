const Database = require('../database/connection');

class OrderItemController extends Database {
    async addItem(product_id, amount, order_id) {
        try {

            const product = await this.database.query('SELECT * FROM products WHERE id = $1', [product_id]);
            if (product.rowCount === 0) {
                throw new Error('Produto não encontrado');
            }
            const price = product.rows[0].price;
            const query = `
                INSERT INTO orders_itens (product_id, amount, price, order_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const orderItem = await this.database.query(query, [product_id, amount, price, order_id]);
            return orderItem;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async create(req, res) {
        const { product_id, amount, client_id, order_id } = req.body;

        if (!product_id || !amount || !client_id) {
            return res.status(400).json({ message: 'Dados incompletos' });
        }

        try {
            const clientResult = await this.database.query('SELECT * FROM clients WHERE id = $1', [client_id]);
            if (clientResult.rowCount === 0) {
                return res.status(400).json({ message: 'Cliente não encontrado' });
            }


            let newOrderId = order_id;
            if (order_id === 0) {
                const verifica = await this.database.query('SELECT * FROM orders WHERE client_id = $1 AND status = $2', [client_id, "Em andamento"]);
                if (verifica.rowCount > 0) {
                    return res.status(400).json({ message: 'Cliente já possui um pedido em andamento' });
                }
                const orderQuery = `INSERT INTO orders (client_id, status) VALUES ($1, $2) RETURNING id;`;
                const orderResult = await this.database.query(orderQuery, [client_id, "Em andamento"]);
                newOrderId = orderResult.rows[0].id;
            }
            const verificaOrder = await this.database.query('SELECT * FROM orders WHERE client_id = $1 and id=$2', [client_id, newOrderId]);
            if (verificaOrder.rowCount === 0) {
                return res.status(400).json({ message: 'Pedido não encontrado' });
            }

            const orderItem = await this.addItem(product_id, amount, newOrderId);
            return res.status(201).json(orderItem.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new OrderItemController();
