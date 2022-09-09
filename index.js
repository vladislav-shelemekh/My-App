import popup from "./views/pop-up.js";
import { userSearch, userList, userChart } from "./views/users/users.js";
import products from "./views/products/products.js";
import { filmTable, tabBar } from "./views/dashboard/dataTable.js";
import filmForm from "./views/dashboard/form.js";
import idStorage from "./views/idStorage.js";

const main = {
  rows: [
    {
      view: "toolbar",
      css: "webix_dark",
      paddingX: 17,
      elements: [
        { view: "label", label: "My App" },
        {},
        {
          view: "button",
          label: "Profile",
          type: "icon",
          icon: "wxi-user",
          autowidth: true,
          css: "webix_transparent",
          popup: idStorage.popup,
        },
      ],
    },

    {
      cols: [
        {
          css: "listBackgr webix_transparent ",
          rows: [
            {
              view: "list",
              width: 200,
              autoheight: true,
              scroll: false,
              border: false,
              select: true,
              on: {
                onAfterSelect: function (id) {
                  $$(id).show();
                },
              },

              css: "listBackgr",
              data: [
                idStorage.dashboard,
                idStorage.users,
                idStorage.products,
                idStorage.admin,
              ],
            },
            {},
            {
              view: "label",
              label: "<i class='webix_icon wxi wxi-check'></i>Connected",
              align: "center",
              css: "greentext",
            },
          ],
        },
        { view: "resizer" },
        {
          cells: [
            {
              id: idStorage.dashboard,
              cols: [{ rows: [tabBar, filmTable] }, filmForm],
            },
            { id: idStorage.users, rows: [userSearch, userList, userChart] },
            { id: idStorage.products, rows: [products] },
            { id: idStorage.admin, template: "Admin" },
          ],
        },
      ],
    },

    {
      view: "template",
      autoheight: true,
      content: "footer_text",
      css: "footer",
    },
  ],
};

webix.ui(main);
webix.ui(popup);

$$(idStorage.filmForm).bind($$(idStorage.filmTable));

$$(idStorage.userChart).sync($$(idStorage.userList), function () {
  $$(idStorage.userChart).group({
    by: "country",
    map: {
      age: ["age", "count"],
    },
  });
});

$$(idStorage.filmTable).registerFilter(
  $$(idStorage.tabBar),
  {
    columnId: "year",
    compare: function (value, filter, item) {
      if (filter == 1) return value;
      else if (filter == 2) return value < 1990;
      else if (filter == 3) return value >= 1990 && value < 2007;
      else if (filter == 4) return value >= 2007;
    },
  },
  {
    getValue: function (node) {
      return node.getValue();
    },
    setValue: function (node, value) {
      node.setValue(value);
    },
  }
);
