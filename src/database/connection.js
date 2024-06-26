const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'labecommerce',
            password: 'postgres',
            port: 5432,
        });
    }
}

module.exports = Database;