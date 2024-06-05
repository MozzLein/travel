const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../../config/db")

const Packages = sequelize.define("packages", {
    id:{
        type: DataTypes.UUID, // You can use other data types for the primary key, such as STRING or INTEGER
        defaultValue: Sequelize.UUIDV4, // If using UUID, you can set a default value using Sequelize.UUIDV4
        allowNull: false,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
    }
    },
    perPersonPrice:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty : true
        }
    },
    transPrice:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty : true
        }
    },
    hotelPrice:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty : true
    }
}
})

module.exports = Packages