// import { Schema, model } from 'mongoose';

// // 1- create schema
// const categorySchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'category must have a name'],
//       unique: [true, 'Category name must be unique'],
//       minlength: [3, 'Too short name'],
//       maxlength: [32, 'Too long name'],
//     },
//     suggestions: [
//       {
//         id: { type: Schema.Types.ObjectId },
//         title: {
//           type: String,
//           required: [true, 'Suggestion must have a title.'],
//         },
//         description: {
//           type: String,
//           required: [true, 'Suggestion must have a description'],
//         },
//         date: {
//           type: Date,
//         },
//         employee: {
//           type: String,
//           required: [true, 'Employee name is required'],
//         },
//       },
//     ],
//     // references: [
//     //   {
//     //     type: Schema.Types.ObjectId,
//     //     ref: 'Reference',
//     //     required: [true, 'Reference category id is required'],
//     //   },
//     // ],
//     referenceCount: Number,
//   },
//   {
//     timestamps: true,
//   }
// );

// // 2- create model by passing the schema to a key named for one doc in collection

// export const ReferenceCategoryModel = model(
//   'ReferenceCategory',
//   categorySchema
// );


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class authorities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  authorities.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,

    },
    isActive: {
      type: DataTypes.ENUM,
      values: ['0', '1',],
      defaultValue: '1',
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['0', '1',],
      defaultValue: '0',
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    }
  },
    {
      sequelize,
      modelName: 'authorities',
    });
  return authorities;
};