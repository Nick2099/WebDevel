$("h1").addClass("big-bold margin-50");  //better way because styles are in .css file
$("h2").css("color", "white");
$("button").css("color", "yellow")
$("button").css("background-color", "green");

$("h1").click(function() {
  $("h1").css("color", "green");
});

/*
for (var i=0; i<5; i++) {
document.querySelectorAll("button")[i].addEventListener("click", function() {
  document.querySelector("h1").style.color = "purple";
});
}
*/

$("button").click(function() {
  $("h1").css("color", "purple");
  $("h1").animate({margin: 20});
  $("h2").slideToggle();
  $("#text_len").slideUp().slideDown().animate({opacity: 0.5});
});

$("input").keypress(function() {
  // console.log(event.key);
  $("h2").text(event.key);
  $("#text_len").text("Text lenght is: " + $("input").val().length + " Text: " + $("input").val()); //always behind???
});

$("h1").on("mouseover", function() {
  $("h2").text("mouse over");
  $("#text_len").text("Text lenght is: " + $("input").val().length + " Text: " + $("input").val());  //OK
});

$("h1").before("<button>New button 1</button");   // prije h1
$("h1").prepend("<button>New button 2</button");  // unutar h1 na pocetku
$("h1").append("<button>New button 3</button");    // unutar h1 na kraju
$("h1").after("<button>New button 4</button");    // nakon h1

setTimeout(function () {
  $("h1").removeClass("big-bold");
  $("h1").addClass("big-title");
  $("h1").text("Welcome");
  $("h2").html("<em>Some text</em>... Bla bla bla");
}, 3000);

console.log($("button").css("background-color"));
