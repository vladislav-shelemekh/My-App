const products = {
  view: "treetable",
  columns: [
    { id: "id", header: "", width: 50 },
    {
      id: "title",
      header: "Title",
      template: "{common.treetable()} #title#",
      width: 200,
    },
    { id: "price", header: "Price", width: 200 },
  ],
  select: true,
  url: "./data/products.js",
};

export default products;