const Database = require('../database/connection');

class OrderItemController extends Database {
    async addItem(product_id, amount, price, order_id) {
        console.log(product_id, amount, price, order_id);
        try {
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
        const { product_id, amount, price, client_id, order_id } = req.body;

        if (!product_id || !amount || !price || !client_id) {
            return res.status(400).json({ message: 'Dados incompletos' });
        }

        try {
            const clientResult = await this.database.query('SELECT * FROM clients WHERE id = $1', [client_id]);
            if (clientResult.rowCount === 0) {
                return res.status(400).json({ message: 'Cliente não encontrado' });
            }

            let newOrderId = order_id;
            if (order_id === 0) {
                console.log('entrou');
                const orderQuery = `INSERT INTO orders (client_id) VALUES ($1) RETURNING id;`;
                const orderResult = await this.database.query(orderQuery, [client_id]);
                newOrderId = orderResult.rows[0].id;
            }
            console.log(newOrderId);

            const orderItem = await this.addItem(product_id, amount, price, newOrderId);
            console.log(orderItem);
            return res.status(201).json(orderItem.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new OrderItemController();
