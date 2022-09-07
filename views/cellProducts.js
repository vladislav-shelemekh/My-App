const products = {
  view: "treetable",
  id: "tree",
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
      $$("tree").openAll();
    },
  },
};

export default products;
