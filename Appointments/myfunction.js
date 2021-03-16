exports.workingHours = function(data) {
  let times = [];
  for (i=data.from; i<=data.to; i=i+data.min) {
    var tmp = this.hoursInTime(i);
    times.push(tmp);
  }
  return times;
};

exports.timeInHours = function(d) { // "12:45" ==> 12.75
  var h = parseInt(d.substr(0,2));
  var m = parseInt(d.substr(3,2));
  return h+m/60;
};

exports.hoursInTime = function(d) {
  var tmp1 ="";
  var tmp2 = Math.floor(d);
  if (tmp2<10) {
    tmp1="0";
  };
  var tmp3 = "";
  var tmp4 = Math.floor((d-tmp2)*60);
  if (tmp4<10) {
    tmp3="0";
  };
  var time = tmp1 + tmp2.toString() + ":" + tmp3 + tmp4.toString();
  return time;
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
  return data;
};

exports.getDates = function(startDate, noOfDays) {
  var dateArray = new Array();
  var date = new Date(startDate);
  for (i=0; i<noOfDays; i++) {
    date.setDate(date.getDate() + 1);
    dateArray.push(new Date (date));
  };
  return dateArray;
};

exports.maximumDuration = function(rest, durations) {
  let max = 0;
  durations.forEach(check);
  return max;

  function check(item) {
    if (rest >= item) {
      max = item;
    };
  };
};

exports.newDurations = function(max, durations) {
  let newDurations = [];
  durations.forEach(check);
  return newDurations;

  function check(item) {
    if (item<=max) {
      newDurations.push(item);
    };
  };
};

exports.randomDuration = function(durations) {
  let rndm = Math.floor(Math.random() * durations.length);
  return durations[rndm];
};

exports.randomPerson = function(no) {
  if (no<10) {
    no++;
  } else {
    let rndm = Math.random();
    if (((rndm<0.1) && (no<20)) || ((rndm<0.2) && (no=>20))) {
      let rndmm = Math.floor(Math.random() * no) + 1;
      no = rndmm;
    } else {
      no++;
    };
  };
  return no;
};

exports.getDate = function(tmpdate1) {
  let tmpdate2 = new Date(tmpdate1);
  let options = {
    weekday: "long",  // narrow, short or long
    day: "2-digit",   // numeric, 2-digit
    month: "short",    // numeric, 2-digit, narrow, short, long
    year: "numeric"   //numeric, 2-digit
  };
  let day = tmpdate2.toLocaleDateString("en-GB", options);
  console.log(tmpdate1, tmpdate2, day);
  return day;
}

exports.numberToPercentageString = function(data, l) {
  data = Math.round(data * 100);
  return data.toString() + "%";
}

exports.deleteAppointment = function(data, toDelete) {
  let dataLenght = data.appointments.length;
  console.log(dataLenght);
  let tmpApp = -1;
  for (i=0; i<dataLenght; i++) {
    if (toDelete==data.appointments[i].no) {
      tmpApp = i;
    };
  };
  if (tmpApp=>0) {
    data.appointments.splice(tmpApp,1);
  };
  return data;
}
