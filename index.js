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
              select:true,
              on:{
                onAfterSelect:function(id){ 
                  $$(id).show();
              }},
              
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
        { cells:[ 
            { id:"Dashboard", cols:[
                {
                    view: "datatable",
                    id: "film_list",
                    //data: small_film_set,
                    //autoConfig: true,
                    url:"data.js",
                    select:true,
                    hover:"myhover",
                    columns: [
                      { id:"rank", header:"", adjust:true },
                      { id:"title", header:[ "Film title", { content:"textFilter"} ], sort:"string", adjust:true},
                      { id:"year", header:[ "Released", { content:"textFilter"} ], adjust:true },
                      { id:"votes", header:[ "Votes", { content:"textFilter"} ], adjust:true },
                      { id:"del", header:"", template:"{common.trashIcon()}"}
                    ],
                    onClick: {
                        "wxi-trash":function(e, id){
                          this.remove(id);
                            return false;
                        }
                    },
                    on:{
                        onAfterSelect:valuesToForm
                      },
                   
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
                            click: addFilm
                          },
                          {
                            view: "button",
                            id: "clrButton",
                            value: "Clear",
                            click: clearForm
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
                  }
            ]},
            { id:"Users", rows: [
              { view:"toolbar",
                cols: [
                {view:"text", id:"list_input"},
                {
                  view: "button",
                  id: "asc",
                  value: "Sort asc",
                  css: "webix_primary",
                  autowidth:true,
                  click: ascSort
                },
                {
                  view: "button",
                  id: "desc",
                  value: "Sort desc",
                  autowidth:true,
                  css: "webix_primary",
                  click: descSort
                }
              ]},
              { view: "list",
                id:"userList",
                url:"users.js",
                select:true,
                template:"#name# from #country# <i class='webix_icon wxi wxi-close close'></i>",
                onClick: {
                  "wxi-close":function(e, id){
                    this.remove(id);
                      return false;}
                },
                on: {
                  onAfterLoad: highlter
                }    
              },
              {view:"chart",
              type:"bar",
              value:"#age#",
              label:"#age#",
              barWidth:35,
              radius:0,
              gradient:"falling",
              url:"users.js"
            }
            ]},
            { id:"Products", rows: [
              { view: "treetable",
                cols: [
                  { id:"id",	header:""},
                  { id:"title",	header:"Title", template:"{common.treetable()} #title#" },
                  { id:"price",	header:"Price"	}
              ], 
              select:true,
              url: "products.js",
              }
            ]},
            { id:"Admin", template:"Admin"}
        ]},
       
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
  if (film_item.id) {
    $$("film_list").updateItem(film_item.id, film_item);
  } else {
    if (form.validate()) {
        $$("film_list").add(film_item);
        webix.message("The validation is successful");
      }
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
      $$("film_list").unselectAll();
    });
}

function valuesToForm(id){
    var values = $$("film_list").getItem(id);
    form.setValues(values);
}

$$("list_input").attachEvent("onTimedKeyPress",function(){
  const value = this.getValue().toLowerCase();
  $$("userList").filter(function(obj){
    return obj.name.toLowerCase().indexOf(value) !== -1;
  });
});

function ascSort(){
  $$("userList").sort("#name#","asc","string");
}

function descSort(){
  $$("userList").sort("#name#","desc","string");
    
};


function highlter() {
  $$("userList").data.each(function(item) {
    if (item.id < 6) {
      $$("userList").addCss(item.id, "back");
      console.log(item);
      // item.addRowCss(item.id, "back");
    }
  }); 
}