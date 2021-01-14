
//     document.querySelector("button").addEventListener("click", handleClick);
//     function handleClick() {
//       alert("I got clicked");
//     }

// up - handleClick without () because we are waiting for a click
// passing a function as an input so that it can be called at a later time


// below - another way how we can call an "anonímus" function:
//      document.querySelector("button").addEventListener("click", function () {
//        alert("I got clicked");
          // what to do when click detected
//      });

var numnerOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i=0; i<numnerOfDrumButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function () {
    alert("I got clicked");
    // what to do when click detected
  });
}
