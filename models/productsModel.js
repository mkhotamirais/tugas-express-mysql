const { DataTypes } = require("sequelize");
const db = require("../config/database.js");

const Products = db.define(
  "Products",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    image_url: DataTypes.TEXT,
  },
  {
    freezeTableName: true,
  }
);

module.exports = Products;

(async () => {
  await db.sync();
})();
