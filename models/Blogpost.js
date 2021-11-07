const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blogpost extends Model {}

Blogpost.init(
    {
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false
    },
},{
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blogpost',
}
);


module.exports= Blogpost