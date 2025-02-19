/**
 * Loops through a collection of student objects and outputs the id and email
 */
const init = () => {
  let students = [
    { id: 1, name: "Alison Fait", email: "ajfait@madisoncollege.edu" },
    {
      id: 2,
      name: "Braden Scheppler",
      email: "bmscheppler@madisoncollege.edu",
    },
    { id: 3, name: "Audri Scheppler", email: "aascheppler@madisoncollege.edu" },
    { id: 4, name: "Evan Weigel", email: "erweigel@madisoncollege.edu" },
    { id: 5, name: "Jason Fait", email: "jafait@madisoncollege.edu" },
  ];

  for (let i = 0; i < students.length; i++) {
    console.log(`id: ${students[i].id}\nemail: ${students[i].email}\n`);
  }
};

/**
 * Calls the init() method on page load
 */
window.onload = init;
