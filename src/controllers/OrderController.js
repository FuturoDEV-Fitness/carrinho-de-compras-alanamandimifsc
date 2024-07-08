const Database = require('../database/connection');

class OrderController extends Database {
    async create(req, res) {
        const { client_id, address, observations, id } = req.body;
        if (!client_id || !address || !observations || !id) {
            return res.status(400).json({ message: 'Dados incompletos' });
        }

        try {
            const query_orders = `SELECT * FROM orders_itens WHERE order_id = $1`;
            const orders = await this.database.query(query_orders, [id]);
            if (orders.rowCount === 0) {
                return res.status(400).json({ message: 'Pedido não encontrado' });
            }

            let price = 0;
            for (let i = 0; i < orders.rows.length; i++) {
                price += orders.rows[i].amount * orders.rows[i].price;
            }


            const query = `
                UPDATE orders
                SET adress = $1, observations = $2, total = $3
                WHERE id = $4 AND client_id = $5
                RETURNING *;
            `;
            const order = await this.database.query(query, [address, observations, price, id, client_id]);
            return res.status(201).json(order.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new OrderController();
