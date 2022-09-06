
const userSearch = {
  view: "toolbar",
  cols: [
    { view: "text", id: "list_input" },
    {
      view: "button",
      id: "asc",
      value: "Sort asc",
      css: "webix_primary",
      autowidth: true,
      click: ascSort,
    },
    {
      view: "button",
      id: "desc",
      value: "Sort desc",
      autowidth: true,
      css: "webix_primary",
      click: descSort,
    },
  ],
};

const userList = {
  view: "list",
  id: "userList",
  url: "./data/users.js",
  select: true,
  template:
    "#name# from #country# <i class='webix_icon wxi wxi-close close'></i>",
  onClick: {
    "wxi-close": function (e, id) {
      this.remove(id);
      return false;
    },
  },
  on: {
    onAfterLoad: highlter,
  },
};

const userChart = {
  view: "chart",
  type: "bar",
  value: "#age#",
  label: "#age#",
  barWidth: 35,
  radius: 0,
  gradient: "falling",
  url: "./data/users.js",
};

function ascSort() {
  $$("userList").sort("#name#", "asc", "string");
}

function descSort() {
  $$("userList").sort("#name#", "desc", "string");
}

function highlter() {
  $$("userList").data.each(function (item) {
    if (item.id < 6) {
      $$("userList").addCss(item.id, "back");
    }
  });
}

export { userSearch, userList, userChart};
