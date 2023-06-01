const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";
import QuestionModel from "../models/Question.models"
const AnswerModel = sequelize.define('answerModel', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'questions', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    answer_text: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    answer_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'answers'
});
/**
 * create table
 * User
    .sync()

 */
module.exports = AnswerModel;