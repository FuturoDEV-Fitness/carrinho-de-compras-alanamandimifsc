const Database = require('../database/connection');

class ProductController extends Database {
    async create(req, res) {
        const { name, amount, color, voltage, description, category_id } = req.body;

        if (!name || !category_id) {
            return res.status(400).json({ message: 'Nome e categoria são obrigatórios' })
        }

        try {
            const { rowCount } = await this.database.query('SELECT * FROM categories WHERE id = $1', [category_id]);
            if (rowCount === 0) {
                return res.status(400).json({ message: 'Categoria não existe' })
            }
            const query = `INSERT INTO products (name, amount, color, voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6) returning *`;
            const product = await this.database.query(query, [
                name,
                amount || null,
                color || null,
                voltage || null,
                description || null,
                category_id
            ]); return res.status(201).json(product.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

    }
}
module.exports = new ProductController();