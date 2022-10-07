
function resetForm() {
  document.getElementById("hw3form").reset();
}

function inputAlert(field) {
  alert(`${field} is a required field and may not be left blank!`);
  document.getElementById(field).focus();
}

document.getElementById("hw3form").addEventListener('submit', (e) => {
  e.preventDefault();
  let name = e.target.name.value;
  if(name == "") {
    inputAlert("name");
    return;
  }
  let email = e.target.email.value;
  if(email == ""){
    inputAlert("email");
    return;
  }
  let msg = e.target.message.value;
  let chk = e.target.newsletter.checked;
  if(chk === true) {
    news = "Yes, I would like to join the newsletter."
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



/*
document.getElementById("go").addEventListener('click', () => {
  console.log("Hello");
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let msg = document.getElementById("message").value;
  let news;
  if(document.getElementById("newsletter").checked === true) {
    news = "Yes, I would like to join the newsletter."
  } else {
    news = "No, thank you.";
  }

  let output = `=============Form Submission=============
    Name:  ${name}
    Email: ${email}
    Feedback:  ${msg}
    Newsletter: ${news}`;

    console.log(output);

    getElementById("hw3form")
})
 function submitform() {
  if(document.hw3form.onsubmit()) {
    document.hw3form.submit();
  }
}   

*/