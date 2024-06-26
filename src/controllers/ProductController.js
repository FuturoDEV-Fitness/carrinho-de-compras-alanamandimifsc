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

    async index(req, res) {
        try {
            const products = await this.database.query('SELECT * FROM products');
            if (products.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhum produto cadastrado' });
            }
            return res.status(200).json(products.rows);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async indexComplete(req, res) {
        try {
            const products = await this.database.query('SELECT p.id, p.name, p.amount, p.color, p.voltage, p.description, c.name as categoria FROM products p join categories c on p.category_id = c.id where p.id = $1', [req.params.id]);
            if (products.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhum produto cadastrado com esse ID' });
            }
            return res.status(200).json(products.rows[0]);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ProductController();