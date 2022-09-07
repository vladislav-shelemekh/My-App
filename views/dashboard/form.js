import idStorage from "../idStorage.js";

const filmForm = {
  view: "form",
  id: idStorage.filmForm,
  gravity: 0.3,
  paddingX: 30,
  elements: [
    { template: "Edit Films", type: "section" },
    {
      view: "text",
      name: "title",
      label: "Title",
      invalidMessage: "Enter a tittle",
    },
    {
      view: "text",
      name: "year",
      label: "Year",
      invalidMessage: "Enter a year between 1970 and 2022",
    },
    {
      view: "text",
      name: "rating",
      label: "Rating",
      invalidMessage: 'Enter a rating more than "0"',
    },
    {
      view: "text",
      name: "votes",
      label: "Votes",
      invalidMessage: "Enter votes less than 100000",
    },
    {
      margin: 10,
      cols: [
        {
          view: "button",
          value: "Save",
          css: "webix_primary",
          on: {
            onItemClick: function () {
              const films = $$(idStorage.filmTable);
              const form = $$(idStorage.filmForm);
              const filmItem = form.getValues();

              if (form.validate()) {
                if (filmItem.id) {
                  films.updateItem(filmItem.id, filmItem);
                } else {
                  films.add(filmItem);
                }

                form.clear();
                webix.message("The validation is successful");
              }
            },
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
                  const form = $$(idStorage.filmForm);
                  form.clear();
                  form.clearValidation();
                  $$(idStorage.filmTable).unselectAll();
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

export default filmForm;
