const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const AssignmentQustionsModel = sequelize.define('assignmentQustionsModel', {
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
    question_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'questions', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
        }
    },
    is_correct: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    tableName: 'assignment_questions'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = AssignmentQustionsModel;