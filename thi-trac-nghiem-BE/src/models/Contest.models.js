const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";
const ContestModel = sequelize.define('contestModel', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    subject_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'subjects', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    contest_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    open_contest: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    close_contest: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    contest_time: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'contests'
});
/**
 * create table
 * User
    .sync()

 */
module.exports = ContestModel;