import idStorage from "../idStorage.js";

webix.protoUI(
  {
    name: "editlist",
  },
  webix.EditAbility,
  webix.ui.list
);

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
      click: sortAsc,
    },
    {
      view: "button",
      value: "Sort desc",
      autowidth: true,
      css: "webix_primary",
      click: sortDesc,
    },
    {
      view: "button",
      value: "Add new",
      autowidth: true,
      css: "webix_primary",
      on: {
        onItemClick: function () {
          const randomizer = function randomInteger(min, max) {
            let rand = min - 0.5 + Math.random() * (max - min + 1);
            return Math.round(rand);
          };

          const random = randomizer(0, 5);
          const user = data[random];

          $$(idStorage.userList).add(user);
        },
      },
    },
  ],
};

const userList = {
  view: "editlist",
  id: idStorage.userList,
  url: "./data/users.js",
  select: true,
  editable: true,
  editor: "text",
  editValue: "name",
  rules: {
    name: webix.rules.isNotEmpty,
  },
  template:
    "#name#, #age#, from #country# <i class='webix_icon wxi wxi-close close'></i>",
  onClick: {
    "wxi-close": function (e, id) {
      this.remove(id);
      return false;
    },
  },
  scheme: {
    $init: function (obj) {
      if (obj.age < 26) obj.$css = "highlight";
    },
    $change: function (obj) {
      if (obj.age < 26) obj.$css = "highlight";
    },
  },
};

const userChart = {
  view: "chart",
  type: "bar",
  id: idStorage.userChart,
  value: "#age#",
  barWidth: 35,
  radius: 0,
  gradient: "falling",
  xAxis: "#country#",
  yAxis: {
    start: 0,
    step: 2,
    end: 16,
  },
};

function sortAsc() {
  $$(idStorage.userList).sort("#name#", "asc", "string");
}

function sortDesc() {
  $$(idStorage.userList).sort("#name#", "desc", "string");
}

const data = [
  { id: 20, name: "Геннадий", age: 30, country: "Germany" },
  { id: 21, name: "Геннадий", age: 22, country: "Canada" },
  { id: 22, name: "Геннадий", age: 27, country: "Italy" },
  { id: 23, name: "Геннадий", age: 40, country: "Spain" },
  { id: 24, name: "Геннадий", age: 28, country: "Germany" },
];

export { userSearch, userList, userChart };
