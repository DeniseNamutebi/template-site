const { Sequelize, Model, DataTypes } = require("sequelize");
const path = require("path");
const sequelize =
  process.env.NODE_ENV === "test"
    ? new Sequelize("sqlite::memory:", null, null, { dialect: "sqlite" })
    : new Sequelize({
        dialect: "sqlite",
        storage: path.join(__dirname, "data.db"),
      });

class Restaurant extends Model {}
Restaurant.init(
  {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { sequelize, modelName: "restausrant" }
);

class Menu extends Model {}
Menu.init(
  {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
  },
  { sequelize, modelName: "menu" }
);

class Item extends Model {}
Item.init(
  {
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    image: DataTypes.STRING,
  },
  { sequelize, modelName: "item" }
);

Restaurant.hasMany(Menu, { as: "menus" });
Menu.belongsTo(Restaurant);
Menu.hasMany(Item, { as: "items" });
Item.belongsTo(Menu);

module.exports = {
  Restaurant,
  Menu,
  Item,
  sequelize,
};
