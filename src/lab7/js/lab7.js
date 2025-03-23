"use strict";

/**
 * Selects all the courses from the list elements on the page
 * Maps all the courses to their text contents
 * Adds two courses
 * Creates new array using the spread operator
 * Prints all courses
 */
const init = () => {
  // Selects all the courses from the list elements on the page
  const courses = document.querySelectorAll("#courses li");

  // Maps all the courses to their text contents
  const coursesText = [...courses].map((course) => course.textContent);

  // Adds two courses
  const additionalCourses = ["Advanced Java", "Enterprise Java"];

  // Creates new array using the spread operator
  const printCourses = [...coursesText, ...additionalCourses];

  // Prints all courses
  console.table(printCourses);
};

/**
 * Calls the init() method on page load
 */
window.onload = init;
