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
  } catch (error) {}
};

const displayTasks = () => {};

const deleteTask = () => {};

window.onload = init;
