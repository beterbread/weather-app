import Search from "./assets/magnify.svg";
import Background from "./assets/background.jpg";
import Icon from "./assets/icon.png";

function format() {
  const search = document.querySelector("#search");
  const background = document.querySelector(".background");
  const head = document.querySelector("head");
  const link = document.createElement("link");

  search.src = Search;
  background.src = Background;
  link.rel = "icon";
  link.href = Icon;
  head.append(link);
}

export default format;
