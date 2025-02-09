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
      buttonAddEventListener.addEventListener("click", addEventListener);
    });
};

const inline = (control) => {
  console.log(control.innerHTML);
};

const dotNotation = (button) => {
  console.log(button.innerHTML);
};

const addEventListener = (event) => {
  console.log(event.currentTarget.innerHTML);
};

window.onload = init;
