import moment from "moment";

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

export const getStartDateTime = event => {
    const start_date = event.start_date.split('-');
    const start_time = event.start_time ? event.start_time.split(':') : ['00', '00'];
    return [
        start_date[0], 
        start_date[1], 
        start_date[2], 
        parseInt(start_time[0]), 
        parseInt(start_time[1])
    ];
}

export const getDuration = event => {
    const start_date = event.start_date.split('-');
    const start_time = event.start_time ? event.start_time.split(':') : ['00', '00'];
    const end_date = event.end_date ? event.end_date.split('-') : start_date;
    const end_time = event.end_time ? event.end_time.split(':') : ['00', '00'];

    const start_date_time = moment([...start_date, ...start_time]);
    const end_date_time = moment([...end_date, ...end_time]);

    var duration = moment.duration(start_date_time.diff(end_date_time))

    if(end_date_time.isSameOrAfter(start_date_time)){
        return { 
            minutes: 30 
        };
    } else {
        return {
            minutes: duration.asMinutes()
        };
    }
}