var P1 = 0;
var P2 = 0;
var Ev = 0;

function rool() {

  var randomNumber1 = Math.floor(Math.random() * 6) + 1;

  var randomDiceImage1 = "images/dice" + randomNumber1 + ".png";
  var image1 = document.querySelectorAll("img")[0];

  image1.setAttribute("src", randomDiceImage1);

  //.textContent("Link: " + randomDiceImage);

  var randomNumber2 = Math.floor(Math.random() * 6) + 1;
  var randomDiceImage2 = "images/dice" + randomNumber2 + ".png";
  document.querySelectorAll("img")[1].setAttribute("src", randomDiceImage2);

  if (randomNumber1 == randomNumber2) {
    document.getElementsByTagName("h1")[0].innerHTML = "Even!";
    Ev++;
  }
  else if (randomNumber1<randomNumber2) {
    document.getElementsByTagName("h1")[0].innerHTML = "Player 2 wins!";
    P2++;
  }
  else {
    document.getElementsByTagName("h1")[0].innerHTML = "Player 1 wins!";
    P1++;
  }

  document.getElementsByTagName("p")[2].innerHTML = P1 + " . . . . . " + Ev + " . . . . . " + P2;

  // var tmp = document.querySelector("#kontrola")
  // console.log(tmp);
  // document.getElementById("kontrola").innerHTML = randomDiceImage;
}
