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
};

exports.timeInHours = function(d) { // "12:45" ==> 12.75
  var h = parseInt(d.substr(0,2));
  var m = parseInt(d.substr(3,2));

  return h+m/60;
};

exports.setStartsAndDurations =function(data) {
  for (i=0; i<data.working.length; i++) {
    if (data.working[i]) {
      data.start1[i] = data.open[i];
      if (data.break[i]) {
        data.start2[i] = data.to[i];
        data.dur1[i] = Math.min(this.timeInHours(data.from[i]), this.timeInHours(data.close[i])) - this.timeInHours(data.open[i]);
        data.dur2[i] = Math.max(this.timeInHours(data.close[i]), this.timeInHours(data.to[i])) - this.timeInHours(data.to[i]);
      } else {
        data.start2[i] = data.close[i];
        data.dur1[i] = this.timeInHours(data.close[i]) - this.timeInHours(data.open[i]);
        data.dur2[i] = 0;
      };
    } else {
      data.start1[i] = data.open[i];
      data.start2[i] = data.open[i];
      data.dur1[i] = 0;
      data.dur2[i] = 0;
    };
  };
  console.log(data);
  return data;
};
