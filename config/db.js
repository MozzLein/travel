const { Sequelize } = require('sequelize');

// Konfigurasi koneksi ke database
const sequelize = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    database: "db_tugas",
    username: "root",
    password: "",
    logging: false
});
sequelize.sync()
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });
module.exports = sequelize
