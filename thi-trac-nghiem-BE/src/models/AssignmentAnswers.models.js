const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const AssignmentAnswersModel = sequelize.define('assignmentAnswersModel', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    assignment_question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'assignment_questions', // 'fathers' refers to table name
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
    tableName: 'assignment_answers'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = AssignmentAnswersModel;