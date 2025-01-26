function validateUsername() {
  "use strict";

  let username = document.getElementById("username").value;

  if (username == "") {
    alert("Enter a valid username");
    return false;
  } else {
    console.log(username);
    clearInput();
    alert("The username you entered is: " + username);
    return true;
  }
}

function clearInput() {
  "use strict";

  document.getElementById("username").value = "";
}
