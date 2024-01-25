import './style.css'
import { getWeather } from './weather'


/**
 Intl.DateTimeFormat().resolvedOptions().timeZone 

 This is how we get time zone, it will give us our current location time
 */
getWeather(10, 10, Intl.DateTimeFormat().resolvedOptions().timeZone)
.then(res => {
    console.log(res.data)
})