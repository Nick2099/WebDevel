exports.workingHours = function(data) {
  let times = [];
  for (i = data.from; i <= data.to; i = i + data.min) {
    var tmp = this.hoursInTime(i);
    times.push(tmp);
  }
  return times;
};

exports.timeInHours = function(d) { // "12:45" ==> 12.75
  var h = parseInt(d.substr(0, 2));
  var m = parseInt(d.substr(3, 2));
  return h + m / 60;
};

exports.hoursInTime = function(d) {
  var tmp1 = "";
  var tmp2 = Math.floor(d);
  if (tmp2 < 10) {
    tmp1 = "0";
  };
  var tmp3 = "";
  var tmp4 = Math.floor((d - tmp2) * 60);
  if (tmp4 < 10) {
    tmp3 = "0";
  };
  var time = tmp1 + tmp2.toString() + ":" + tmp3 + tmp4.toString();
  return time;
};

exports.setStartsAndDurations = function(data) {
  for (i = 0; i < data.working.length; i++) {
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
  for (i = 0; i < noOfDays; i++) {
    date.setDate(date.getDate() + 1);
    dateArray.push(new Date(date));
  };
  return dateArray;
};

exports.maximumDuration = function(rest, durations) {
  let max = 0;
  durations.forEach(check);
  if (max==0) {
    max = rest;
  };
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
  if ((newDurations.length == 0) && (max>0)) {
    newDurations.push(max);
  };
  return newDurations;

  function check(item) {
    if (item <= max) {
      newDurations.push(item);
    };
  };
};

exports.durationsToText = function(durations) {
  let newDurations = [];
  durations.forEach(check);
  return newDurations;

  function check(d) {
    var tmp1 = "";
    var tmp2 = Math.floor(d);
    if (tmp2 < 10) {
      tmp1 = "0";
    };
    var tmp3 = "";
    var tmp4 = Math.floor((d - tmp2) * 60);
    if (tmp4 < 10) {
      tmp3 = "0";
    };
    var time = tmp1 + tmp2.toString() + ":" + tmp3 + tmp4.toString();
    newDurations.push(time);
  };
};

exports.randomDuration = function(durations) {
  let rndm = Math.floor(Math.random() * durations.length);
  return durations[rndm];
};

exports.randomPerson = function(no) {
  if (no < 10) {
    no++;
  } else {
    let rndm = Math.random();
    if (((rndm < 0.1) && (no < 20)) || ((rndm < 0.2) && (no => 20))) {
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
    weekday: "long", // narrow, short or long
    day: "2-digit", // numeric, 2-digit
    month: "short", // numeric, 2-digit, narrow, short, long
    year: "numeric" //numeric, 2-digit
  };
  let day = tmpdate2.toLocaleDateString("en-GB", options);
  return day;
};

exports.numberToPercentageString = function(data, l) {
  data = Math.round(data * 100);
  return data.toString() + "%";
};

exports.deleteAppointment = function(data, toDelete) {
  let dataLenght = data.appointments.length;
  let tmpApp = -1;
  for (i = 0; i < dataLenght; i++) {
    if (toDelete == data.appointments[i].no) {
      tmpApp = i;
    };
  };
  if (tmpApp => 0) {
    data.appointments.splice(tmpApp, 1);
  };
  return data;
};

exports.makeAppointmentFree = function(data, appNo) {
  let dataLenght = data.appointments.length;
  let tmpAppNo = -1;
  let tmpFree = 0;
  for (i = 0; i < dataLenght; i++) {
    if (appNo == data.appointments[i].no) {
      data.appointments[i].no = 0; // 0 = free
      data.appointments[i].persnoNo = 0; // 0 = no client
      tmpAppNo = i;
      i = dataLenght;
    };
  };

  let tmpRest = data.dur1;
  for (i = 0; i < dataLenght; i++) {
    if (data.appointments[i].no > 0 & data.appointments[i].start < this.timeInHours(data.start1) + data.dur1) {
      tmpRest = tmpRest - data.appointments[i].duration;
    };
  };
  data.rest1 = tmpRest;
  if (data.dur1 != 0) {
    tmpFree = data.rest1 / data.dur1;
  } else {
    tmpFree = 0;
  };
  data.free1 = this.numberToPercentageString(tmpFree);

  tmpRest = data.dur2;
  for (i = 0; i < dataLenght; i++) {
    if (data.appointments[i].no > 0 & data.appointments[i].start >= this.timeInHours(data.start2)) {
      tmpRest = tmpRest - data.appointments[i].duration;
    };
  };
  data.rest2 = tmpRest;
  if (data.dur2 != 0) {
    tmpFree = data.rest2 / data.dur2;
  } else {
    tmpFree = 0;
  };
  data.free2 = this.numberToPercentageString(tmpFree);

  return data;
};

exports.concatenateFreeAppointments = function(data) {
  let dataLenght = data.appointments.length;
  let firstApp = -1;
  let lastApp = -1;
  for (i = 0; i < dataLenght - 1; i++) {
    if (data.appointments[i].no == 0) {
      firstApp = i;
      lastApp = i;
      for (j = i + 1; j < dataLenght; j++) {
        if (data.appointments[j].no == 0) {
          if ((data.appointments[firstApp].end <= this.timeInHours(data.start1) + data.dur1 && data.appointments[j].end <= this.timeInHours(data.start1) + data.dur1) ||
            (data.appointments[firstApp].start >= this.timeInHours(data.start2) && data.appointments[j].start >= this.timeInHours(data.start2))) {
            lastApp = j;
          } else {
            j = dataLenght;
          };
        } else { // this part is not executing when last app have to be deleted
          j = dataLenght;
        };
      };
      if (lastApp > firstApp) {
        data.appointments[firstApp].end = data.appointments[lastApp].end;
        data.appointments[firstApp].duration = data.appointments[firstApp].end - data.appointments[firstApp].start;
        data.appointments[firstApp].startTxt = this.hoursInTime(data.appointments[firstApp].start);
        data.appointments[firstApp].endTxt = this.hoursInTime(data.appointments[firstApp].end);
        data.appointments[firstApp].durationTxt = this.hoursInTime(data.appointments[firstApp].duration);
      };
      i = lastApp;
      firstApp = -1;
      lastApp = -1;
    };
  };
  for (i = dataLenght - 2; i >= 0; i--) {
    if (data.appointments[i].no == 0 & data.appointments[i + 1].no == 0) {
      if ((data.appointments[i].end <= this.timeInHours(data.start1) + data.dur1 && data.appointments[i + 1].end <= this.timeInHours(data.start1) + data.dur1) ||
        (data.appointments[i].start >= this.timeInHours(data.start2) && data.appointments[i + 1].start >= this.timeInHours(data.start2))) {
        data.appointments.splice(i + 1, 1);
      };
    };
  };
  return data;
};

exports.creatingFreeAppointments = function(data, minimumDuration, choosenDurations) {
  let dataLenght = data.appointments.length;
  let tmpApp = -1;
  let freeStart = 0;
  let freeEnd = 0;
  let freeDuration = 0;
  let tmpStart, tmpEnd, tmpRest, tmpMaxDuration = 0;
  let tmpNewDuration = [];
  let maxDuration = choosenDurations[choosenDurations.length-1];
  let endOfDay = this.timeInHours(data.start2) + data.dur2;

  for (i = dataLenght - 1; i >= 0; i--) {
    if (data.appointments[i].no == 0) {
      tmpApp = i;
      freeStart = data.appointments[i].start;
      if (i == dataLenght - 1) {
        freeEnd = endOfDay;
      } else {
        freeEnd = data.appointments[i+1].start;
      };
      freeDuration = freeEnd - freeStart;
      let rt = 0;
      for (t = freeStart; t < freeEnd; t = t + minimumDuration) {
        tmpStart = t;
        tmpEnd = tmpStart + freeDuration - rt;
        tmpRest = tmpEnd - tmpStart;
        tmpMaxDuration = this.maximumDuration(tmpRest, choosenDurations);
        tmpNewDurations = this.newDurations(tmpMaxDuration, choosenDurations);
        tmpNewDurations = this.durationsToText(tmpNewDurations);
        if (tmpStart == freeStart) {
          data.appointments[tmpApp].start = tmpStart;
          data.appointments[tmpApp].duration = minimumDuration;
          data.appointments[tmpApp].end = tmpEnd;
          data.appointments[tmpApp].startTxt = this.hoursInTime(data.appointments[tmpApp].start);
          data.appointments[tmpApp].endTxt = this.hoursInTime(data.appointments[tmpApp].end);
          data.appointments[tmpApp].durationTxt = this.hoursInTime(data.appointments[tmpApp].duration);
          data.appointments[tmpApp].newDurations = tmpNewDurations;
        } else {
          data.appointments.splice(tmpApp, 0, {
            start: tmpStart,
            duration: minimumDuration,
            end: tmpEnd,
            startTxt: this.hoursInTime(tmpStart),
            endTxt: this.hoursInTime(tmpEnd),
            durationTxt: this.hoursInTime(minimumDuration),
            newDurations: tmpNewDurations,
            no: 0,
            persnoNo: 0,
            done: 0
          });
        };
        tmpApp++;
        rt = rt + minimumDuration;
      };
    };
  };

  // calculating the rest1, rest2, free1 & free2
  dataLenght = data.appointments.length;
  let rest1 = 0;
  let rest2 = 0;
  for (i = 0; i < dataLenght; i++) {
    if (data.appointments[i].no == 0) {
      if (data.appointments[i].start<this.timeInHours(data.start2)) {
        rest1 = rest1 + data.appointments[i].duration;
      } else {
        rest2 = rest2 + data.appointments[i].duration;
      };
    };
  };
  data.rest1 = rest1;
  data.rest2 = rest2;
  if (data.dur1 !== 0) {
    data.free1 = this.numberToPercentageString(data.rest1/data.dur1);
  } else {
    data.free1 = 0;
  };
  if (data.dur2 !== 0) {
    data.free2 = this.numberToPercentageString(data.rest2/data.dur2);
  } else {
    data.free2 = 0;
  };

  return data;
};

exports.findAppNr = function(data, startTime) {
  let appNr = -1;
  for (i = 0; i < data.appointments.length; i++) {
    if (data.appointments[i].start == startTime) {
      appNr = i;
    };
  };
  return appNr;
};

exports.removeSurplusApps = function(data, startTime, endTime) {
  let dataLenght = data.appointments.length;
  for (i = dataLenght - 1; i >= 0; i--) {
    if (data.appointments[i].no == 0 && data.appointments[i].start < endTime && data.appointments[i].start > startTime) {
      data.appointments.splice(i, 1);
    };
  };
  dataLenght = data.appointments.length;
  for (i = dataLenght - 1; i>= 0; i--) {
    if ((data.appointments[i].no == 0) && (data.appointments[i].start == data.appointments[i].end)) {
      data.appointments.splice(i, 1);
    };
  };
  return data;
};
