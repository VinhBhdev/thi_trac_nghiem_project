const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const QuestionModel = sequelize.define('questionModel', {
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
    question_text: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    question_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    topic: {
        type: DataTypes.STRING,
        allowNull: true,
    }

}, {
    tableName: 'questions'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = QuestionModel;