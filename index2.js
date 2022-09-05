webix.ui({
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
                css: "listBackgr",
                data: ["Dashboard", "Users", "Products", "Location"],
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
            view: "datatable",
            id: "film_list",
            data: small_film_set,
            autoConfig: true,
          },
          {
            view: "form",
            id: "film_form",
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
                    click: addFilm,
                  },
                  {
                    view: "button",
                    id: "clrButton",
                    value: "Clear",
                    click: clearForm,
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
  });
  
  webix.ui({
    view: "popup",
    id: "my_popup",
    body: {
      view: "list",
      autoheight: true,
      scroll: false,
      data: ["Settings", "Log Out"],
    },
  });
  
  const form = $$("film_form");
  
  function addFilm() {
    const film_item = form.getValues();
    if (form.validate()) {
      $$("film_list").add(film_item);
      webix.message("The validation is successful");
    }
  }
  
  function clearForm() {
    webix
      .confirm({
        title: "Form will be cleared",
        text: "Do you still want to continue?",
      })
      .then(function () {
        form.clear();
        form.clearValidation();
      });
  }
  