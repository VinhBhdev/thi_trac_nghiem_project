const { DataTypes } = require('sequelize');
import sequelize from "../configs/connection_database";

const User = sequelize.define('user', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    citizen_id: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    first_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email_verified_at: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    birthday: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    class: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    university_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    tableName: 'users'
});

/**
 * create table
 * User
    .sync()

 */
module.exports = User;