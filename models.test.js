const { Restaurant, Menu, Item, sequelize } = require("./models");

describe("Restaurant", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  test("can create a restaurant", async () => {
    const restaurant = await Restaurant.create({
      name: "Padella",
      image: "image.url",
    });
    expect(restaurant.id).toBe(1);
  });

  test("can add a menu to a restaurant", async () => {
    const restaurant = await Restaurant.create({
      name: "Inamo",
      image: "image.url",
    });
    const menu = await Menu.create({ title: "Sushi Menu" });
    await restaurant.addMenu(menu);
    const menus = await restaurant.getMenus();
    expect(menus.length).toBe(1);
  });
});

describe("Menu", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  test.skip("can create a menu", async () => {
    const menu = await Menu.create({ title: "Wine Menu", image: "image.url" });
    expect(menu.id).toBe(1);
  });

  test("can add a new item to a menu", async () => {
    const menu = await Menu.create({
      title: "Starter Menu",
      image: "image.url",
    });
    const item = await Item.create({
      name: "Calamari",
      price: 11,
      image: " image.url",
    });
    await menu.addItem(item);
    const items = await menu.getItems();
    expect(items.length).toBe(1);
  });
});

describe("Item", () => {
  beforeAll(async () => {
    await sequelize.sync();
  });

  test.skip("can create a new item", async () => {
    const item = await Item.create({
      name: "Steak",
      price: 19.95,
      image: " image.url",
    });
    expect(item.id).toBe(1);
  });
});
