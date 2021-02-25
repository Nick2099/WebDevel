module.exports.getDate = getDate;

function getDate() {
  let today = new Date();
  let options = {
    weekday: "long",  // narrow, short or long
    day: "2-digit",   // numeric, 2-digit
    month: "short",    // numeric, 2-digit, narrow, short, long
    year: "numeric"   //numeric, 2-digit
  };
  let day = today.toLocaleDateString("en-GB", options);
  return day;
}

exports.getDay = function() {   // another way how we can write functions that we are callin. It's better becsause it's shorter and clean
                                // module.export... can be replace with export... It works the same.
  let today = new Date();
  let options = {
    weekday: "long"  // narrow, short or long
  };
  return today.toLocaleDateString("en-GB", options);  // 2 lines are connected so we have less code
}
