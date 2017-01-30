// based on code by https://github.com/vpfaiz //
// http://stackoverflow.com/a/7641822 //

function relativeTime(time) {
    var date = time,
        diff = (((new Date()).getTime() - date.getTime()) / 1000),
        day_diff = Math.floor(diff / 86400),
        year_diff = new Date().getFullYear() - date.getFullYear(),
        month_diff;

    if (year_diff === 0) {
        month_diff = new Date().getMonth() - date.getMonth();
        console.log(month_diff);
    } else if (year_diff > 0) {
    	month_diff = 12 - (date.getMonth()+1); // months in the year of this date
    	month_diff += 12 * (year_diff - 1);
    	month_diff += new Date().getMonth() + 1;   
    } else if (year_diff < 0) {
        month_diff = 12 - (new Date().getMonth()+1); // months in the year of this date
        month_diff += 12 * (Math.abs(year_diff) - 1);
        month_diff += (date.getMonth()+1);
        month_diff = -month_diff;
    }

    var year = date.getFullYear(),
        month = date.getMonth()+1,
        day = date.getDate();

	var daysInMonth = new Date(year, month, 0).getDate();

    if (isNaN(day_diff) || diff == 0)
        return (
            year.toString()+'-'
            +((month<10) ? '0'+month.toString() : month.toString())+'-'
            +((day<10) ? '0'+day.toString() : day.toString())
        );
    var r =
    (
        diff < 0 &&
        (
            day_diff == 0 && 
            (
                (
                    (diff > -60 && "Soon") ||
                    (diff > -120 && "In 1 minute") ||
                    (diff > -3600 && "In " + Math.floor( Math.abs(diff) / 60) + " minutes") ||
                    (diff > -7200 && "In 1 hour") ||
                    (diff > -86400 && "In " + Math.floor( Math.abs(diff) / 3600) + " hours")
                )
            ) ||
            (day_diff == -1 && "Tomorrow") ||
            (day_diff > -7 && "In " + Math.abs(day_diff) + " days") ||
            (day_diff > -daysInMonth && "In " + Math.ceil( Math.abs(day_diff) / 7) + " weeks") ||
            (month_diff == -1 && "In 1 month") ||
            (month_diff > -12 && "In " + Math.abs(month_diff) + " months") ||
            (year_diff == -1 && "In 1 year") ||
            (year_diff < -1 &&  "In " + Math.abs(year_diff) + " years")
        ) ||
        diff > 0 &&
        (
            day_diff == 0 &&
            (
                (
                    (diff < 60 && "Just now") ||
                    (diff < 120 && "1 minute ago") ||
                    (diff < 3600 && Math.floor(diff / 60) + " minutes ago") ||
                    (diff < 7200 && "1 hour ago") ||
                    (diff < 86400 && Math.floor(diff / 3600) + " hours ago")
                )
            ) ||
            (day_diff == 1 && "Yesterday") ||
            (day_diff < 7 && day_diff + " days ago") ||
            (day_diff < daysInMonth && Math.ceil(day_diff / 7) + " weeks ago") ||
            (month_diff == 1 && "1 month ago") ||
    	    (month_diff < 12 && month_diff + " months ago") ||
    	    (year_diff == 1 && "1 year ago") ||
            (year_diff + " years ago")
        )
    );
    return r;
}