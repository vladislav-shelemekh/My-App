import idStorage from "../idStorage.js";

const categoriesTable = {
    view: "datatable",
    id: idStorage.adminTable,
    url: "./data/categories.js",
    select: true,
    hover: "myhover",
    columns: [
      
      {
        id: "value",
        // collection: "./data/categories.js",
        header: "Category",
        fillspace: true,
      },
    ],
    // data: [
    //   { id: "1", categoryId: 1 },
    //   { id: "2", categoryId: 2 },
    //   { id: "3", categoryId: 3 },
    //   { id: "4", categoryId: 4 },
    // ],

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
        name: "category",
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
            on: {
              onItemClick: saveItem,
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
    rules: {
      category: webix.rules.isNotEmpty
    },
  };

  function saveItem() {
    const form = $$(idStorage.adminForm);
    if (form.isDirty()) {
      if (!form.validate()) return false;
      form.save();
      form.clear();
      $$(idStorage.adminTable).unselectAll();
      webix.message("The validation is successful");
    }
  }

export  {categoriesTable, categoriesForm};