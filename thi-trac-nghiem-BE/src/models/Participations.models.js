const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const ParticipationsModel = sequelize.define('participationsModel', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    contest_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'contests', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },

}, {
    tableName: 'participations'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = ParticipationsModel;