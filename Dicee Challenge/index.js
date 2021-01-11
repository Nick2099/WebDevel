function rool() {

  var randomNumber1 = Math.floor(Math.random() * 6) + 1;
  var randomNumber2 = Math.floor(Math.random() * 6) + 1;

  var randomDiceImage = "images/dice" + randomNumber1 + ".png";
  var image1 = document.querySelectorAll("img")[0];

  image1.setAttribute("src", randomDiceImage);

  //.textContent("Link: " + randomDiceImage);

  var randomDiceImage = "images/dice" + randomNumber2 + ".png";
  document.querySelectorAll("img")[1].setAttribute("src", randomDiceImage);

  if (randomNumber1 == randomNumber2) {
    document.getElementsByTagName("h1")[0].innerHTML = "Even!";
  } else if (randomNumber1<randomNumber2) {
    document.getElementsByTagName("h1")[0].innerHTML = "Player 2 win!";
  } else {
    document.getElementsByTagName("h1")[0].innerHTML = "Player 1 win!";
  }

  // var tmp = document.querySelector("#kontrola")
  // console.log(tmp);
  // document.getElementById("kontrola").innerHTML = randomDiceImage;
}
