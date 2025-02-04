/*
 * Initializes the page by creating a form with an input field and a button.
 * When the button is clicked, the displayMessage function is called to
 * display the user's input.
 */
const init = () => {
  // Creates form element
  let form = document.createElement("form");

  // Creates div container for form elements and sets class
  let div = document.createElement("div");
  div.setAttribute("class", "form-group");

  // Creates input field for username and sets class, type, and id
  let input = document.createElement("input");
  input.setAttribute("class", "form-control");
  input.setAttribute("type", "text");
  input.setAttribute("id", "username");

  // Creates button element and sets type, id, and innerHTML
  let button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("id", "display");
  button.innerHTML = "Click Me";

  // Appends input and button to the div
  div.appendChild(input);
  div.appendChild(button);
  // Appends div to the form
  form.appendChild(div);
  // Appends form to the body
  document.body.appendChild(form);

  // Adds event listener to the button to trigger displayMessage when clicked
  document.querySelector("#display").addEventListener("click", displayMessage);
};

/*
 * Displays a message on the page with the value of the username input field.
 * The message is appended as a new paragraph element below the form.
 */
const displayMessage = () => {
  // Creates a paragraph element to display the message
  let message = document.createElement("p");
  message.innerHTML =
    "Your username is: " + document.querySelector("#username").value + ".";

  // Appends message to the body of the page
  document.body.appendChild(message);
};

window.onload = init;
