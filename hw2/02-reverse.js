/** Exercise 02 - Reverse **/

/**
 * 
 * @param {*} input Value to be reversed
 * @returns Reverse of provided string
 * Input is validated for type and length, then reversed.
 */
function reverseNum(input) {
  if(typeof(input) !== "string" || input.length !== 8)
    return "Invalid Input- Try Again"
  return input.split('').reverse().join('');
}

/**
 * Gets input from HTML form and reverses the value.
 * Creates an element containing the reversed value and adds it to the HTML body.
 */
function reverseMe() {
  let value = reverseNum(document.getElementById("input").value);
  let result = document.getElementById("resultbox");
  if(result == undefined || result == null) {
    result = document.createElement("resultbox");
    result.classList.add("text-white", "text-center");
  }
  result.innerHTML = `<h1 class="mt-2 mb-4 mx-auto">${value}</h1>`;
  document.body.appendChild(result); 
}


