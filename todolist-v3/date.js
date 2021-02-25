module.exports = getDate;

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
