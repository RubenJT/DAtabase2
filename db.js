const mysql = require('mariadb');

const config = {
    host: 'localhost',
    port: 3306,
    database: 'backend',
    user: 'root',
    password: 'Tamalesdefrijol15#',
    connectionLimit:10
}
    const connection = mysql.createPool(config);

    module.exports = connection;