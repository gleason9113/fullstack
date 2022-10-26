/**
 * Clear form when reset button is clicked.
 */
function resetForm() {
  document.getElementById("hw3form").reset();
}

/**
 *
 * @param {*} field String indicating which field is missing - used to set document focus and inform alert msg
 * Displays an alert indicating that a required field cannot be left blank.
 */
function inputAlert(field) {
  alert(`${field} is a required field and may not be left blank!`);
  document.getElementById(field).focus();
}

//On form submit, check required fields for values. If empty, call inputAlert and exit.
//Otherwise, get field values and insert them into string literal.
//Print to console.
document.getElementById("hw3form").addEventListener("submit", (e) => {
  e.preventDefault();
  let name = e.target.name.value;
  if (name == "") {
    inputAlert("name");
    return;
  }
  let email = e.target.email.value;
  if (email == "") {
    inputAlert("email");
    return;
  }
  let msg = e.target.message.value;
  let chk = e.target.newsletter.checked;
  if (chk === true) {
    news = "Yes, I would like to join the newsletter.";
  } else {
    news = "No, thank you.";
  }
  let output = `=============Form Submission=============
  Name:  ${name}
  Email: ${email}
  Feedback:  ${msg}
  Newsletter: ${news}`;

  console.log(output);
});
