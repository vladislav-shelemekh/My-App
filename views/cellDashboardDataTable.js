import idStorage from "./idStorage.js";

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
      id: "year",
      header: ["Released", { content: "textFilter" }],
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
  on: {
    onAfterSelect: function (film) {
      const values = $$(idStorage.filmTable).getItem(film);
      $$(idStorage.filmForm).setValues(values);
    },
  },
};

export default filmTable;
