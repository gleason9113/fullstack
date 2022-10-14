/** Exercise 02 - Reverse **/

/**
 *
 * @param {*} input Value to be reversed
 * @returns Reverse of provided string
 * Input is validated for type and length, then reversed.
 */
function reverseNum(input) {
  if(input == "") {
    return `Not a number! ==> Input must be an 8-digit number!`;
  }
  let validNumTest = /^[0-9]{8}$/;
  if (!validNumTest.test(input)) return  `${input} ==> Error: Input must be an 8-digit number!`;
  let reversed = input.split("").reverse().join("")
  return `${input} ==> ${reversed}`;
}

/**
 * Gets input from HTML form and reverses the value.
 * Creates an element containing the reversed value and adds it to the HTML body.
 */
function reverseMe() {
  let original = document.getElementById("input").value;
  let value = reverseNum(original);
  let result = document.getElementById("resultbox");
  if (result == undefined || result == null) {
    result = document.createElement("resultbox");
    result.id = "resultbox"
    result.classList.add("text-center");
    result.innerHTML = `<h6 class="mt-2 mb-4 mx-auto">${value}</h1>`;
    document.getElementById("main").appendChild(result);
  } else {
    result.innerHTML = `<h6 class="mt-2 mb-4 mx-auto">${value}</h1>`;
  }
  
}
