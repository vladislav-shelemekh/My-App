import idStorage from "./idStorage.js";

const popup = {
  view: "popup",
  id: idStorage.popup,
  body: {
    view: "list",
    autoheight: true,
    scroll: false,
    data: ["Settings", "Log Out"],
  },
};

export default popup;
