import Search from "./assets/magnify.svg";
import Background from "./assets/background.jpg";

function format() {
  const search = document.querySelector("#search");
  const background = document.querySelector(".background");

  search.src = Search;
  background.src = Background;
}

export default format;
