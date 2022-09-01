webix.ui({
    rows:[
        { 
        view:"toolbar",
        css:"webix_dark",
        paddingX:17,
        elements:[
            { view:"label", label:"My App" },
            {},
            { 
                view:"button", 
                label:"Profile", 
                type:"icon", 
                icon:"wxi-user", 
                autowidth:true, 
                css:"webix_transparent" 
            }
            ]  
        },
        { cols:[
            { css:"listBackgr webix_transparent ", rows: [
                {
                    view:"list",
                    id:"mylist",
                    width:200,
                    autoheight:true,
                    scroll:false,
                    border:false,
                    css:"listBackgr",
                    data:[ "Dashboard", "Users", "Products", "Location" ]
                },
                {},
                { 
                    view:"label", 
                    id:"connect",
                    label: "<i class='webix_icon wxi wxi-check'></i>Connected",
                    align:"center",
                    css:"greentext"
                }
            ]},
            { view:"resizer" },
            {
                view:"datatable",
                id:"film_list",
                data:small_film_set,
                autoConfig:true
            },
            {
                view:"form",
                id:"film_form",        
                gravity:0.3,
                paddingX:30,
                elements:[
                    { template:"Edit Films", type:"section" },
                    { view:"text", name:"title", id:"inp_title", label:"Title" },
                    { view:"text", name:"year", id:"inp_year", label:"Year" },
                    { view:"text", name:"rating", id:"inp_rating", label:"Rating" },
                    { view:"text", name:"votes", id:"inp_votes", label:"Votes" },
                    { margin:10, cols:[
                        { view:"button", id:"addButton", value:"Add new", css:"webix_primary", click:addFilm },
                        { view:"button", id:"clrButton", value:"Clear", click:clearForm }
                    ]},
                    {}     
                ]
            }    
        ]
    },

    {
        view:"template",  
        autoheight:true,
        content:"footer_text",
        css:"footer"
    }
        
]});

function addFilm(){
    const film_item = $$("film_form").getValues();
    $$("film_list").add(film_item);
  }

function clearForm(){
    $$("film_form").clear();
  }
