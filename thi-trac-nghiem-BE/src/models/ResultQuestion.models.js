const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";
const ResultQuestionModel = sequelize.define('resultQuestionModel', {
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
    answer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'answers', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
}, {
    tableName: 'result_question'
});
/**
 * create table
 * User
    .sync()

 */
module.exports = ResultQuestionModel;