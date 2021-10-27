export function NoTimeDate(tmpDate) {
    var NoTimeDate = tmpDate.getDate()+'/'+(tmpDate.getMonth()+1)+'/'+tmpDate.getFullYear();
    return NoTimeDate;
};


export function getDaysInMonth(tmpDate) {
    var month = tmpDate.getMonth();
    var year = tmpDate.getFullYear();
    return new Date(year, month+1, 0).getDate();
};    

export function allDaysArray(noOfDays) {
    var tmp = [];
    for (let i=1; i<=noOfDays; i++) {
        tmp.push(i);
    }
    return tmp;
};

export function allDaysForSelect(tmp) {
    var tmpSelect = [];
    tmp.forEach(element => {
        tmpSelect.push({value: element, name: String(element)});
    });
    return tmpSelect;
}

export function allMonthsForSelect() {
    var tmp = [
    {value: 0, name: "Jan"},
    {value: 1, name: "Feb"},
    {value: 2, name: "Mar"},
    {value: 3, name: "Apr"},
    {value: 4, name: "Mai"},
    {value: 5, name: "Jun"},
    {value: 6, name: "Jul"},
    {value: 7, name: "Aug"},
    {value: 8, name: "Sep"},
    {value: 9, name: "Oct"},
    {value: 10, name: "Nov"},
    {value: 11, name: "Dec"}
  ];
  return tmp;
}

export function allYearsForSelect(tmp) {
    var tmpYears = [];
    for (let i=2021; i<=tmp+1; i++) {
        tmpYears.push({value:i, name:String(i)});
    };
    return tmpYears;
}

export function removeAll(tmp) {
    while (document.getElementById(tmp).options.length > 0) {
        document.getElementById(tmp).remove(0);
    };
}

export function addAll(tmp, tmpvalues, tmpday) {
    var sel = document.getElementById(tmp);
    for(var i = 0; i < tmpvalues.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = tmpvalues[i].name;
        opt.value = tmpvalues[i].value;
        sel.appendChild(opt);
    }
    if (tmpday>tmpvalues.length) {
        sel.value=tmpvalues.length;
    } else {
        sel.value=tmpday;
    }
}

export function changeNoOfDaysInMonth(tmp) {
    this.removeAll(tmp.item);
    this.addAll(tmp.item, tmp.values, tmp.selected);
}