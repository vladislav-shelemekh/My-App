import popup from "./views/pop-up.js";
import { userSearch, userList, userChart} from "./views/cellUsers.js";
import products from "./views/cellProducts.js";
import { filmTable, filmForm} from "./views/cellDashboard.js";

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
          popup: "my_popup",
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
              id: "mylist",
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
              data: ["Dashboard", "Users", "Products", "Admin"],
            },
            {},
            {
              view: "label",
              id: "connect",
              label: "<i class='webix_icon wxi wxi-check'></i>Connected",
              align: "center",
              css: "greentext",
            },
          ],
        },
        { view: "resizer" },
        {
          cells: [
            { id: "Dashboard", cols: [filmTable, filmForm] },
            { id: "Users", rows: [userSearch, userList, userChart] },
            { id: "Products", rows: [products] },
            { id: "Admin", template: "Admin" },
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

$$("list_input").attachEvent("onTimedKeyPress",function(){
  const value = this.getValue().toLowerCase();
  $$("userList").filter(function(obj){
    return obj.name.toLowerCase().indexOf(value) !== -1;
  });
});
