import idStorage from "../idStorage.js";
import countries from "/data/countries.js";
import randomizer from "../helpers.js";

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
          const name = "Геннадий";
          const age = randomizer(1, 50);
          const random = randomizer(0, 8);
          const country = countries[random].value;
          const user = { name, age, country };

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

export { userSearch, userList, userChart };
