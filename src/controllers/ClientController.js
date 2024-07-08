const Database = require('../database/connection');

class ClientsController extends Database {
    async create(req, res) {
        const { name, email, cpf, contact } = req.body;

        try {
            const query = `INSERT INTO clients (name, email, cpf, contact) VALUES ($1, $2, $3, $4) returning *`;
            const cliente = await this.database.query(query, [name, email, cpf, contact]);
            return res.status(201).json(cliente.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

    }
    async read(req, res) {
        try {
            const clientes = await this.database.query('SELECT * FROM clients');
            return res.status(200).json(clientes.rows);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}
module.exports = new ClientsController();