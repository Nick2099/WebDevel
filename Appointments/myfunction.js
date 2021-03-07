exports.workingHours = function(data) {
  // console.log(data);
  let times = [];
  for (i=data.from; i<=data.to; i=i+data.min) {
    var tmp1 ="";
    var tmp2 = Math.floor(i);
    if (i<10) {
      tmp1="0";
    };
    var tmp3 = "";
    var tmp4 = Math.floor((i-tmp2)*60);
    if (tmp4<10) {
      tmp3="0";
    };
    var time = tmp1 + tmp2.toString() + ":" + tmp3 + tmp4.toString();
    times.push(time);
  }
  // console.log(times);
  return times;
}
