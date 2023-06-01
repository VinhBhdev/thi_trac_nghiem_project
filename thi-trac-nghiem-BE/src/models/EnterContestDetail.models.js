const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const EnterContestDetailModel = sequelize.define('enterContestDetailModel', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    enter_contest_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'enter_contest', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    choose_answer: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_correct: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    tableName: 'enter_contest_detail'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = EnterContestDetailModel;