const init = () => {
  /*
   * Create a class definition named Student
   */
  class Student {
    constructor(firstName, lastName, email) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._email = email;
    }

    /*
     * Create Get/Set for firstName, lastName, and email
     */
    get firstName() {
      return this._firstName;
    }

    set firstName(firstName) {
      this._firstName = firstName;
    }

    get lastName() {
      return this._lastName;
    }

    set lastName(lastName) {
      this._lastName = lastName;
    }

    get email() {
      return this._email;
    }

    set email(email) {
      this._email = email;
    }
  }

  /*
   * Create a static method named register. The register method should
   * take 1 incoming parameter named 'courseName' and log that courseName
   * parameter to the console
   *
   * @param {*} courseName
   */
  class Course {
    static register(courseName) {
      console.log("Student registered for the course:");
      console.log(courseName);
    }
  }

  /*
   * Create a printDetails method that outputs the firstName, lastName,
   * and email for the current instance to the console.
   */
  const printDetails = () => {
    console.log(`Name: ${student1.firstName} ${student1.lastName}`);
    console.log(`Email: ${student1.email}`);
    console.log(`Name: ${student2.firstName} ${student2.lastName}`);
    console.log(`Email: ${student2.email}`);
  };

  // Instantiate 2 student instances.
  // Assign values for the firstName, lastName, and email properties.
  const student1 = new Student("Alison", "Fait", "ajfait@madisoncollege.edu");
  const student2 = new Student("Evan", "Weigel", "evan.weigel@wisc.edu");

  // Print the values of those variables using the printDetails method created above.
  printDetails();

  // Invoke the register method passing in a courseName
  Course.register("Advanced JavaScript");
};

window.onload = init;
