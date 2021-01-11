// alert("Hello again"); //

function changebuttoncolor() {
  document.querySelector("#bttn1").classList.toggle("buttonred");
  document.querySelector("#bttn2").classList.toggle("buttonred");
  document.querySelector("#bttn3").classList.toggle("buttonred");
}

function changebackgroudcolor() {
  document.querySelector("body").classList.toggle("changebackground");
}

function changetext() {
  document.querySelector("h1").innerHTML = "Good bye."
  }
