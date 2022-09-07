import idStorage from "../idStorage.js";

const products = {
  view: "treetable",
  id: idStorage.productsTree,
  columns: [
    { id: "id", header: "", width: 50 },
    {
      id: "title",
      header: "Title",
      template: "{common.treetable()} #title#",
      width: 200,
    },
    { id: "price", header: "Price", width: 200, fillspace: true },
  ],
  select: true,
  url: "./data/products.js",
  on: {
    onAfterLoad: function () {
      $$(idStorage.productsTree).openAll();
    },
  },
};

export default products;
