const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const Course = sequelize.define('course', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    image_link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    course_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'courses'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = Course;