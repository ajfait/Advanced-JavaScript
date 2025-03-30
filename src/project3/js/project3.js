// Create global variables
const url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const studentId = 2886897;
const apiKey = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
const contentType = "application/json";

const init = () => {
  document.querySelector("#newTask").addEventListener("click", addNewTask);
};

const addNewTask = () => {
  const taskDescription = document.querySelector("#task").value;
  console.log(taskDescription);
};

window.onload = init;
