import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en' // English

TimeAgo.addDefaultLocale(en)

function timesAgo(date, alwaysShowTimesAgo = false) {
    // Create formatter (English).
    const timeAgo = new TimeAgo('en-GB')

    // convert date into numbers
    date = new Date(date).getTime()

    // if the date is invalid, return 'unknown'
    if (isNaN(date)) {
        return 'unknown'
    }

    if(alwaysShowTimesAgo === false) {
       let currentDateTime = new Date().getTime()
         let diff = currentDateTime - date
        //  if the difference is greater than 1 week, return the date
        if(diff > 604800000) {
            return new Date(date).toLocaleString();
        }
    }

    // return the time ago
    return timeAgo.format(date)
}

export default timesAgo