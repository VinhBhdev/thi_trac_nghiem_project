const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('thi-trac-nghiem', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // not show the log "Executing (default): SELECT 1+1 AS result"
    dialectOptions: { useUTC: false },
    timezone: "+07:00"
});

module.exports = sequelize;
