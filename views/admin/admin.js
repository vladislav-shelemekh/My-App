import idStorage from "../idStorage.js";
import { categories } from "../collections.js";

const categoriesTable = {
  view: "datatable",
  id: idStorage.adminTable,
  select: true,
  hover: "myhover",
  columns: [
    {
      id: "value",
      header: "Category",
      fillspace: true,
      editor: "text",
    },
  ],

  editaction: "dblclick",
  editable: true,
};

const categoriesForm = {
  view: "form",
  id: idStorage.adminForm,
  gravity: 0.3,
  paddingX: 30,
  elements: [
    { template: "Edit Categories", type: "section" },
    {
      view: "text",
      name: "value",
      label: "Category",
      invalidMessage: "Enter a category",
    },
    {
      margin: 10,
      cols: [
        {
          view: "button",
          value: "Save",
          css: "webix_primary",
          click: function () {
            const form = $$(idStorage.adminForm);
            const item_data = form.getValues();
            if (!item_data.id) {
              categories.add(item_data);
            }
          },
        },
        {
          view: "button",
          value: "Remove",
          click: function () {
            const sel = $$(idStorage.adminTable).getSelectedId();
            if (sel) categories.remove(sel);
          },
        },
        {
          view: "button",
          value: "Clear",
          on: {
            onItemClick: function clearForm() {
              webix
                .confirm({
                  title: "Form will be cleared",
                  text: "Do you still want to continue?",
                })
                .then(function () {
                  const form = $$(idStorage.adminForm);
                  form.clear();
                  form.clearValidation();
                  $$(idStorage.adminTable).unselectAll();
                });
            },
          },
        },
      ],
    },
    {},
  ],
};

export { categoriesTable, categoriesForm };
