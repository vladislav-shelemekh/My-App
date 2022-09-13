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
      editor: "text",
    },
    {
      id: "price",
      header: "Price",
      width: 200,
      fillspace: true,
      editor: "text",
    },
  ],
  select: true,
  url: "./data/products.js",
  editable: true,
  rules: {
    title: webix.rules.isNotEmpty,
    price: webix.rules.isNumber,
  },
  on: {
    onAfterLoad: function () {
      this.openAll();
    },
  },
};

export default products;
