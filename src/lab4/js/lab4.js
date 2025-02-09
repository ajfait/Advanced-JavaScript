/**
 * Calls the dotNotation and addEventListener functions when the buttons are clicked
 */
const init = () => {
  document
    .querySelectorAll(".dotNotation")
    .forEach(function (buttonDotNotation) {
      buttonDotNotation.onclick = function () {
        dotNotation(buttonDotNotation);
      };
    });

  document
    .querySelectorAll(".addEventListener")
    .forEach(function (buttonAddEventListener) {
      buttonAddEventListener.addEventListener("click", w3c);
    });
};

/**
 * Logs inline button values to the console using onClick
 *
 * @param {*} control
 */
const inline = (control) => {
  console.log(control.innerHTML);
};

/**
 * Logs dotNotation button values to the console
 *
 * @param {*} button
 */
const dotNotation = (button) => {
  console.log(button.innerHTML);
};

/**
 * Logs addEventListener button values to the console
 *
 * @param {*} event
 */
const w3c = (event) => {
  console.log(event.currentTarget.innerHTML);
};

/**
 * Calls the init() method on page load
 */
window.onload = init;
