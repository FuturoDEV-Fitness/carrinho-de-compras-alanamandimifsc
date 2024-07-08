const Database = require('../database/connection');

class CategoriesController extends Database {

    async read(req, res) {
        try {
            const products = await this.database.query('SELECT * FROM categories');
            if (products.rowCount === 0) {
                return res.status(404).json({ message: 'Nenhum produto cadastrado' });
            }
            return res.status(200).json(products.rows);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


}

module.exports = new CategoriesController();