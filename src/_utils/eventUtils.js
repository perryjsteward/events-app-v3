// import moment from "moment";

export const trimText = text => {
    if(text){
        return `${text.substr(0, 250)}...`
    } else {
        return;
    }
}

export const removeCommas = text => {
    if(text){
        return text.replace(/,/g, '');
    } else {
        return;
    }
}

export const removeAddressCommas = event => {
    if(event && event.address){
        return event.address.replace(/,/g, '');
    } else {
        return;
    }
}

export const getStartDateTime = event => {
    let allDay = false;
    if(!event.start_time && !event.end_date && !event.start_time){
        allDay = true;
    }

    const start_date = event.start_date.split('-');
    const start_time = event.start_time ? event.start_time.split(':') : ['00', '00'];
    let dateArr = [
        start_date[0], 
        start_date[1], 
        start_date[2]
    ];

    if(!allDay) {
        dateArr.push(parseInt(start_time[0]))
        dateArr.push(parseInt(start_time[1]))
    }

    return dateArr;
}


export const getEndDateTime = event => {
    let allDay = false;
    const startDateTime = getStartDateTime(event);

    let end_date = event.end_date ? event.end_date.split('-') : startDateTime.slice(0,3);
    let end_time = event.end_time ? event.end_time.split(':') : startDateTime.slice(3,5);

    end_date[2] = parseInt(end_date[2]);

    let dateArr =  [
        end_date[0], 
        end_date[1], 
        end_date[2]
    ];

    if(!event.start_time && !event.end_date && !event.start_time){
        allDay = true;
    }

    if(!allDay){
        dateArr.push(parseInt(end_time[0]))
        dateArr.push(parseInt(end_time[1]))
    }

    return dateArr;
}
