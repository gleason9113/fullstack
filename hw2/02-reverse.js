/** Exercise 02 - Reverse **/

/**
 *
 * @param {*} input Value to be reversed
 * @returns Reverse of provided string
 * Input is validated for type and length, then reversed.
 */
function reverseNum(input) {
  if (typeof input !== "string") return "Error:  Invalid Input- Try Again";
  else if (input.length !== 8)
    return "Error:  Please enter a string containing 8 digits.";
  return input.split("").reverse().join("");
}

/**
 * Gets input from HTML form and reverses the value.
 * Creates an element containing the reversed value and adds it to the HTML body.
 */
function reverseMe() {
  let original = document.getElementById("input").value;
  let value = reverseNum(original);
  let result = document.getElementById("resultbox");
  console.log(result);
  if (result == undefined || result == null) {
    console.log("New resultbox created!")
    result = document.createElement("resultbox");
    result.id = "resultbox"
    result.classList.add("text-center");
    result.innerHTML = `<h6 class="mt-2 mb-4 mx-auto">${original} ==> ${value}</h1>`;
    document.getElementById("main").appendChild(result);
  } else {
    result.innerHTML = `<h6 class="mt-2 mb-4 mx-auto">${original} ==> ${value}</h1>`;
  }
  
}
