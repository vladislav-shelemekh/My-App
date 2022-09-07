import idStorage from "../idStorage.js";

const userSearch = {
  view: "toolbar",
  cols: [
    {
      view: "text",
      id: idStorage.userFilter,
      on: {
        onTimedKeyPress: function () {
          const value = this.getValue().toLowerCase();
          $$(idStorage.userList).filter(function (obj) {
            return obj.name.toLowerCase().indexOf(value) !== -1;
          });
        },
      },
    },
    {
      view: "button",
      value: "Sort asc",
      css: "webix_primary",
      autowidth: true,
      click: ascSort,
    },
    {
      view: "button",
      value: "Sort desc",
      autowidth: true,
      css: "webix_primary",
      click: descSort,
    },
  ],
};

const userList = {
  view: "list",
  id: idStorage.userList,
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
  barWidth: 35,
  radius: 0,
  gradient: "falling",
  url: "./data/users.js",
  xAxis: "#age#",
  yAxis: {
    start: 0,
    step: 10,
    end: 70,
  },
};

function ascSort() {
  $$(idStorage.userList).sort("#name#", "asc", "string");
}

function descSort() {
  $$(idStorage.userList).sort("#name#", "desc", "string");
}

function highlter() {
  $$(idStorage.userList).data.each(function (item) {
    if (item.id < 6) {
      $$(idStorage.userList).addCss(item.id, "back select");
    }
  });
}

export { userSearch, userList, userChart };
