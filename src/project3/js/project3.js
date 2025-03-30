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
    if (response.ok) {
      console.log(`${taskDescription} was added to the list.`);
      document.querySelector("#task").value = "";
      displayTasks();
    } else {
      console.log(`There was a problem adding ${taskDescription} to the list.`);
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const displayTasks = async () => {
  try {
    const response = await fetch(url + student_id, {
      method: "GET",
      headers: { "Content-Type": content_type, "x-api-key": api_key },
    });
    if (response.ok) {
      const data = await response.json();
      const taskList = document.querySelector("#taskList");
      taskList.innerHTML = "";
      data.Items.forEach((item) => {
        console.log(item.Description);
        const listItem = document.createElement("li");
        const trashIcon = document.createElement("i");
        trashIcon.classList.add("bi", "bi-trash3", "pe-2");
        trashIcon.addEventListener("click", () => {
          deleteTask(item.Description, listItem);
        });
        listItem.appendChild(trashIcon);
        const taskText = document.createTextNode(item.Description);
        listItem.appendChild(taskText);
        taskList.appendChild(listItem);
      });
    } else {
      console.log("There was an error displaying the tasks.");
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

const deleteTask = async (taskDescription, listItem) => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": content_type, "x-api-key": api_key },
      body: JSON.stringify({
        StudentId: student_id,
        Description: taskDescription,
      }),
    });
    if (response.ok) {
      console.log(`${taskDescription} was deleted from the list.`);
      listItem.remove();
    } else {
      console.log(
        `There was a problem removing ${taskDescription} from the list.`
      );
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

window.onload = init;
