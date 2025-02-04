const init = () => {
  let form = document.createElement("form");

  let div = document.createElement("div");
  div.setAttribute("class", "form-group");

  let input = document.createElement("input");
  input.setAttribute("class", "form-control");
  input.setAttribute("type", "text");
  input.setAttribute("id", "username");

  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.innerHTML = "Click Me";
};
