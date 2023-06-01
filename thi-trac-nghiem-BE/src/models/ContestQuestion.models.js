const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";
const ContestQuestionModel = sequelize.define('ContestQuestionModel', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    contest_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'contests', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'questions', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
}, {
    tableName: 'contest_question'
});
/**
 * create table
 * User
    .sync()

 */
module.exports = ContestQuestionModel;