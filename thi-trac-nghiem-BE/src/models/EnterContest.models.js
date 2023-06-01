const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const EnterContestModel = sequelize.define('enterContestModel', {
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
    start_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    end_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    submit_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    point: {
        type: DataTypes.DOUBLE,
        allowNull: true,
    },

}, {
    tableName: 'enter_contest'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = EnterContestModel;