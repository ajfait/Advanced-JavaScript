/*
 * Alison Fait
 * Online
 * ajfait@madisoncollege.edu
 *
 */

"use strict";

// Create global constants
const userId = 1;

// Create global variables
let taskList;
let mainContent;

/*
 * This function begins the application when the page is loaded.
 * It selects the main content, creates an unordered list,
 * appends the unordered list to the main content, assigns an
 * event listener to the CTA, and calls displayTasks().
 *
 */
const init = () => {
  mainContent = document.getElementById("main");
  taskList = document.createElement("ul");
  taskList.setAttribute("id", "taskList");
  taskList.setAttribute(
    "class",
    "container col-sm-4 flex-direction: row py-3 ms-5"
  );
  taskList.setAttribute("style", "list-style-type: none");
  mainContent.appendChild(taskList);
  document.querySelector("#newTask").addEventListener("click", addTask);
  displayTasks();
};

/*
 * This function adds a task to the task list. It validates the
 * input field, sends a POST request to the API, waits for a
 * response, clears the input field, and calls displayTasks().
 *
 */
const addTask = async () => {
  const taskDescription = document.querySelector("#task").value.trim();

  if (!taskDescription) {
    alert("Enter a task description.");
    return;
  }

  try {
    const response = await fetch(
      `/api/tasks/${userId}/${encodeURIComponent(taskDescription)}`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      console.log(`${taskDescription} was added to the list.`);
      document.querySelector("#task").value = "";
      displayTasks();
    } else {
      console.log(`There was a problem adding ${taskDescription} to the list.`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

/*
 * This function displays the task list. It sends a GET request
 * to the API, waits for a response, creates a list item for
 * each element in the task list, and appends each list item
 * to the unordered task list.
 *
 */
const displayTasks = async () => {
  try {
    const response = await fetch(`/api/tasks/${userId}`);

    if (response.ok) {
      const data = await response.json(); // this is an array of strings
      const taskListElement = document.querySelector("#taskList");
      taskListElement.innerHTML = "";

      data.forEach((description) => {
        const listItem = document.createElement("li");

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("bi", "bi-trash3", "pe-2");
        trashIcon.style.cursor = "pointer";
        trashIcon.addEventListener("click", () => {
          deleteTask(description, listItem);
        });

        listItem.appendChild(trashIcon);
        listItem.appendChild(document.createTextNode(description));
        taskListElement.appendChild(listItem);
      });
    } else {
      console.log("There was an error displaying the tasks.");
      console.log(response.statusText);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

/*
 * This function deletes tasks from the list. It sends a
 * DELETE request to the API, waits for a response, and
 * removes the task from the list.
 *
 */
const deleteTask = async (taskDescription, listItem) => {
  try {
    const response = await fetch(
      `/api/tasks/${userId}/${encodeURIComponent(taskDescription)}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      console.log(`${taskDescription} was deleted from the list.`);
      listItem.remove();
    } else {
      console.log(
        `There was a problem removing ${taskDescription} from the list.`
      );
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

// Kicks off the init method when the page is fully loaded.
window.onload = init;
