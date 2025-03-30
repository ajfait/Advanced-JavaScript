/*
 * Create 2 Promises
 * The 1st Promise object that you create should be resolved
 * after 1.5 seconds with the value "hello world"
 * The 2nd Promise object that you create should get rejected
 * at .5 seconds with the error message "unable to resolve the request"
 * Log both of the Promise responses using console.log and console.error
 * respectively
 *
 */
const init = () => {
  const promise1 = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("hello world");
    }, 1500);
  });

  promise1
    .then(function (value) {
      console.log(value);
    })
    .catch(function (error) {
      console.error(error);
    });

  const promise2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject("Error: unable to resolve the request");
    }, 500);
  });

  promise2
    .then(function (value) {
      console.log(value);
    })
    .catch(function (error) {
      console.error(error);
    });
};

window.onload = init;
