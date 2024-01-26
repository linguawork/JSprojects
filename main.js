import './style.css'
import { getWeather } from './weather'
import { ICON_MAP } from './helperFunctions'

/**
 Intl.DateTimeFormat().resolvedOptions().timeZone 

 This is how we get time zone, it will give us our current location time
 */


//it is important to set the correct latitude and longitude
//this is the location for Wolfsburg, Germany
getWeather(52.42, 10.78, Intl.DateTimeFormat().resolvedOptions().timeZone)
.then(outputWeather)
.catch(error => {
    console.error(error)
    alert("we got the error!")
}

)
//this code to check the data
// .then(data => { //this is for debug to see the data
//     console.log(data)
// })

function outputWeather(curr, daily, hourly){
    outputCurrentWeather(curr)
    // outputDailyWeather(daily),
    // outputHourlyWeather(hourly)

    // this is for testing the rendering
    document.body.classList.remove('blurred')
}

function setValue(dataAttrWithoutDataWord, parsedVal){
    //dont forget the [] in backticks
    document.querySelector(`[data-${dataAttrWithoutDataWord}]`).textContent = parsedVal;
}


function getIconUrl(iconCode){
    //getting the img by code from map
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon =document.querySelector(`[data-current-icon]`)

//here is where we use the attr data, to apply parsed data to the DOM
function outputCurrentWeather(curr){
    //this line rewritten into the setValue function to make it readable
    // document.querySelector("[data-current-temp]").textContent = curr.current.currentTemp

    // sometimes you need to go do on level deeper when digging the value 
    // console.log(curr.current.currentTemp)

    currentIcon.src = getIconUrl(curr.current.iconCode)

    setValue("current-temp", curr.current.currentTemp)
    setValue("current-high", curr.current.highTemp)
    setValue("current-low", curr.current.lowTemp)
    setValue("current-fl-high", curr.current.highFeelsLike)
    setValue("current-fl-low", curr.current.lowFeelsLike)
    setValue("current-wind", curr.current.windSpeed)
    setValue("current-precip", curr.current.precip)



}
