const categories = new webix.DataCollection({
    url: "./data/categories.js"
  });

const users = new webix.DataCollection({
    url: "./data/users.js"
  });

export {categories, users};