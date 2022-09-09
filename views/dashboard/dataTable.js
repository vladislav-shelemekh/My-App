import idStorage from "../idStorage.js";

const tabBar = {
  view: "segmented",
  id: idStorage.tabBar,
  options: [
    { id: 1, value: "All" },
    { id: 2, value: "Old" },
    { id: 3, value: "Modern" },
    { id: 4, value: "New" },
  ],
  on: {
    onChange: function () {
      $$(idStorage.filmTable).filterByAll();
    },
  },
};

const filmTable = {
  view: "datatable",
  id: idStorage.filmTable,
  url: "./data/data.js",
  select: true,
  hover: "myhover",
  columns: [
    { id: "rank", header: "", adjust: true },
    {
      id: "title",
      header: ["Film title", { content: "textFilter" }],
      sort: "string",
      fillspace: true,
    },
    {
      id: "categoryId",
      collection: "./data/categories.js",
      header: ["Category", { content: "selectFilter" }],
      adjust: true,
    },

    {
      id: "year",

      header: "Released",
      adjust: true,
    },
    { id: "votes", header: ["Votes", { content: "textFilter" }], adjust: true },
    { id: "del", header: "", template: "{common.trashIcon()}" },
  ],
  onClick: {
    "wxi-trash": function (e, id) {
      this.remove(id);
      return false;
    },
  },
  data: [
    { id: "1", categoryId: 1 },
    { id: "2", categoryId: 2 },
    { id: "3", categoryId: 3 },
    { id: "4", categoryId: 4 },
  ],
  scheme: {
    $init: function (obj) {
      const randomizer = function randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
      };

      obj.categoryId = randomizer(1, 4);
    },
  },
};

export { filmTable, tabBar };
