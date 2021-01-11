function rool() {

  var randomNumber1 = Math.floor(Math.random() * 6) + 1;

  var randomDiceImage = "images/dice" + randomNumber1 + ".png";

  var image1 = document.querySelectorAll("img")[0];

  image1.setAttribute("src", randomDiceImage);

  //.textContent("Link: " + randomDiceImage);

  var randomNumber2 = Math.floor(Math.random() * 6) + 1;

  var randomDiceImage = "images/dice" + randomNumber2 + ".png";

  document.querySelectorAll("img")[1].setAttribute("src", randomDiceImage);


  // var tmp = document.querySelector("#kontrola")
  // console.log(tmp);
  // document.getElementById("kontrola").innerHTML = randomDiceImage;  
}
