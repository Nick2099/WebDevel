export function NoTimeDate(tmpDate) {
    var NoTimeDate = tmpDate.getDate()+'/'+(tmpDate.getMonth()+1)+'/'+tmpDate.getFullYear();
    return NoTimeDate;
};


export function getDaysInMonth(tmpDate) {
    var month = tmpDate.getMonth();
    var year = tmpDate.getFullYear();
    return new Date(year, month, 0).getDate();
};    

export function allDaysArray(noOfDays) {
    var tmp = [];
    for (let i=1; i<=noOfDays; i++) {
        tmp.push(i);
    }
    return tmp;
};

export function allDaysForSelect(tmp) {
    var tmpSelect = []
    tmp.forEach(element => {
        tmpSelect.push({value: String(element), name: String(element)});
    });
    console.log(tmpSelect);
    return tmpSelect;
}
