const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const SubjectModel = sequelize.define('subjectModel', {
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
    subject_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    subject_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'subjects'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = SubjectModel;