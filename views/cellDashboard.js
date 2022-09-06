const id = {
  film_form: "form1",
  film_list: "list1",
};

const filmTable = {
  view: "datatable",
  id: id.film_list,
  url: "./data/data.js",
  select: true,
  hover: "myhover",
  columns: [
    { id: "rank", header: "", adjust: true },
    {
      id: "title",
      header: ["Film title", { content: "textFilter" }],
      sort: "string",
      adjust: true,
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
  on:{
    onAfterSelect: valuesToForm
  },
};

const filmForm = {
  view: "form",
  id: id.film_form,
  gravity: 0.3,
  paddingX: 30,
  elements: [
    { template: "Edit Films", type: "section" },
    {
      view: "text",
      name: "title",
      id: "inp_title",
      label: "Title",
      invalidMessage: "Enter a tittle",
    },
    {
      view: "text",
      name: "year",
      id: "inp_year",
      label: "Year",
      invalidMessage: "Enter a year between 1970 and 2022",
    },
    {
      view: "text",
      name: "rating",
      id: "inp_rating",
      label: "Rating",
      invalidMessage: 'Enter a rating more than "0"',
    },
    {
      view: "text",
      name: "votes",
      id: "inp_votes",
      label: "Votes",
      invalidMessage: "Enter votes less than 100000",
    },
    {
      margin: 10,
      cols: [
        {
          view: "button",
          id: "addButton",
          value: "Add new",
          css: "webix_primary",
          on: {
            onItemClick: function () {
              const film_item = $$(id.film_form).getValues();
              if (film_item.id) {
                $$(id.film_list).updateItem(film_item.id, film_item);
              } else {
                if ($$(id.film_form).validate()) {
                  $$(id.film_list).add(film_item);
                  webix.message("The validation is successful");
                }
              }
            },
          },
        },
        {
          view: "button",
          id: "clrButton",
          value: "Clear",
          on: {
            onItemClick: function clearForm() {
              webix
                .confirm({
                  title: "Form will be cleared",
                  text: "Do you still want to continue?",
                })
                .then(function () {
                  $$(id.film_form).clear();
                  $$(id.film_form).clearValidation();
                  $$(id.film_list).unselectAll();
                });
            },
          },
        },
      ],
    },
    {},
  ],
  rules: {
    title: webix.rules.isNotEmpty,
    year: function (value) {
      return value > 1970 && value <= new Date().getFullYear();
    },
    votes: function (value) {
      return value < 100000;
    },
    rating: function (value) {
      return webix.rules.isNotEmpty && value != 0;
    },
  },
};

function valuesToForm(film){
    const values = $$(id.film_list).getItem(film);
    $$(id.film_form).setValues(values);
}

export { filmTable, filmForm, id };


