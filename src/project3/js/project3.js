// Create global variables
const url = "https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/";
const student_id = "2886897";
const api_key = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
const content_type = "application/json";

const init = () => {
  document.querySelector("#newTask").addEventListener("click", addTask);
  displayTasks();
};

const addTask = async () => {
  const taskDescription = document.querySelector("#task").value;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": content_type, "x-api-key": api_key },
      body: JSON.stringify({
        StudentId: student_id,
        Description: taskDescription,
      }),
    });
    console.log(`${taskDescription} was added to the list.`);
    document.querySelector("#task").value = "";
    displayTasks();
  } catch (error) {
    console.log(`There was a problem adding ${taskDescription} to the list.`);
  }
};

const displayTasks = async () => {
  try {
    const response = await fetch(url + student_id, {
      method: "GET",
      headers: { "Content-Type": content_type, "x-api-key": api_key },
    });
    const data = await response.json();
    data.Items.forEach((item) => {
      console.log(item.Description);
    });
  } catch (error) {
    console.log("There was an error displaying the tasks.");
  }
};

const deleteTask = () => {};

window.onload = init;
