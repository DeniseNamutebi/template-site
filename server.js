const express = require("express");
const Handlebars = require("handlebars");
const expressHandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const { Restaurant, sequelize, Menu, Item } = require("./models");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handlebars = expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.use(express.static("public"));
app.engine("handlebars", handlebars);
app.set("view engine", "handlebars");

app.get("/", async (request, response) => {
  const restaurants = await Restaurant.findAll({
    include: [{ model: Menu, as: "menus" }],
  });
  console.log(restaurants);
  response.render("restaurants", { restaurants });
});

app.get("/restaurants/:id", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  const menus = await restaurant.getMenus({
    include: ["items"],
  });
  res.render("restaurant", { restaurant, menus });
});

app.post("/restaurants", async (req, res) => {
  await Restaurant.create(req.body);
  res.redirect("/");
});

app.get("/restaurants/:id/edit", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  res.render("edit", { restaurant });
});

app.get(
  "/restaurants/:restaurant_id/menus/:menu_id/editp",
  async (req, res) => {
    console.log(req.params);
    const menu = await Menu.findByPk(req.params.menu_id);
    res.render("editp", { menu, restaurant_id: req.params.restaurant_id });
  }
);

app.post(
  "/restaurants/:restaurant_id/menus/:menu_id/editp",
  async (req, res) => {
    const menu = await Menu.findByPk(req.params.menu_id);
    await menu.update(req.body);
    res.redirect(`/restaurants/${req.params.restaurant_id}`);
  }
);

app.post("/restaurants/:id/edit", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  restaurant.update(req.body);
  res.redirect(`/restaurants/${restaurant.id}`);
});

app.get("/restaurants/:id/edit/delete", async (req, res) => {
  const restaurant = await Restaurant.findByPk(req.params.id);
  await restaurant.destroy();
  res.redirect("/");
});

app.listen(3000, async () => {
  await sequelize.sync();
  console.log("web server running on port 3000");
});
