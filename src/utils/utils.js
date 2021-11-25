import { WindowScrollController } from "@fullcalendar/core";

function add(a, b) {
    const sum = a + b;
    return sum;
}

function calCulateDate(){

}

// if(checkIsNumber(someNumber)) {
//     window.alert('WRONG');
// }

function checkIsNumber(input) {
    if(isNaN(input)) {
        return false
    }
    return true
}

export {add , checkIsNumber}; 