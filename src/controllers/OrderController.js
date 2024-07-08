const Database = require('../database/connection');

class OrderController extends Database {
    async create(req, res) {
        const { client_id, address, observations, id, status } = req.body;
        if (!client_id || !address || !id) {
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
                SET adress = $1, observations = $2, total = $3, status=$4
                WHERE id = $5  AND client_id = $6
                RETURNING *;
            `;
            const order = await this.database.query(query, [address, observations, price, status, id, client_id]);
            return res.status(201).json(order.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async read(req, res) {
        try {
            const client_id = req.params.client_id;
            const query = `
                SELECT o.id AS order_id, o.status as status, o.total, o.adress, o.observations,
                       ot.id AS item_id, ot.product_id, ot.amount, ot.price
                FROM orders o
                JOIN orders_itens ot ON o.id = ot.order_id
                WHERE o.client_id = $1
            `;
            const values = [client_id];

            const orders = await this.database.query(query, values);
            return res.status(200).json(orders.rows);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    async readOpen(req, res) {
        try {
            const query = `
                SELECT o.id AS order_id, o.status as status, o.total, o.adress, o.observations,
                       ot.id AS item_id, ot.product_id, ot.amount, ot.price
                FROM orders o
                LEFT JOIN orders_itens ot ON o.id = ot.order_id
                WHERE o.status = $1
            `;
            const values = ["Em andamento"];
            const { rows } = await this.database.query(query, values);

            const orders = rows.reduce((acc, row) => {
                const { order_id, status, total, adress, observations, item_id, product_id, amount, price } = row;
                let order = acc.find(order => order.order_id === order_id);

                if (!order) {
                    order = {
                        order_id,
                        status,
                        total,
                        adress,
                        observations,
                        items: []
                    };
                    acc.push(order);
                }

                if (item_id) {
                    order.items.push({ item_id, product_id, amount, price });
                }

                return acc;
            }, []);

            return res.status(200).json(orders);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


}

module.exports = new OrderController();
