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
    // alert("we got the error!")
}

)
//this code to check the data
// .then(data => { //this is for debug to see the data
//     console.log(data)
// })

//forgot to destructure the obj
function outputWeather({current, daily, hourly}){
    outputCurrentWeather(current)
    // console.log(current)
    // console.log(daily)

    outputDailyWeather(daily)
    // outputHourlyWeather(hourly)

    // this is for testing the rendering
    document.body.classList.remove('blurred')
}

function setValue(dataAttrWithoutDataWord, parsedVal, {parent = document} = {}){


    
    //dont forget the [] in backticks
    const element = document.querySelector(`[data-${dataAttrWithoutDataWord}]`);
        if (element) {
        element.textContent = parsedVal;
        console.log('After setting value:', parent.outerHTML);
        } else {
        console.error(`Element not found: [data-${dataAttrWithoutDataWord}]`);
        console.log('Parent:', parent.outerHTML);
        }

    parent.querySelector(`[data-${dataAttrWithoutDataWord}]`).textContent = parsedVal
    // console.log(`[data-${dataAttrWithoutDataWord}]`);
    // console.log(document.querySelector(`[data-${dataAttrWithoutDataWord}]`).textContent = parsedVal);

}


// function setValue(selector, value, { parent = document } = {}) {
//     parent.querySelector(`[data-${selector}]`).textContent = value
//   }

function getIconUrl(iconCode){
    //getting the img by code from map
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon =document.querySelector(`[data-current-icon]`)

//here is where we use the attr data, to apply parsed data to the DOM
function outputCurrentWeather(current){
    //this line rewritten into the setValue function to make it readable
    // document.querySelector("[data-current-temp]").textContent = curr.current.currentTemp

    // sometimes you need to go do on level deeper when digging the value 
    // console.log(curr.current.currentTemp)

    currentIcon.src = getIconUrl(current.iconCode)

    setValue("current-temp", current.currentTemp)
    setValue("current-high", current.highTemp)
    setValue("current-low", current.lowTemp)
    setValue("current-fl-high", current.highFeelsLike)
    setValue("current-fl-low", current.lowFeelsLike)
    setValue("current-wind", current.windSpeed)
    setValue("current-precip", current.precip)
}


//this gets day of the week
const WEEKDAY_GETTER = new Intl.DateTimeFormat(undefined, {weekday: "short"})

//the daily part of the DOM is selected
const dailySection = document.querySelector("[data-day-section]")
// take the template
const dayCardTemplate = document.getElementById("day-card-template")


function outputDailyWeather(daily){
    // clear the daily part
    dailySection.innerHTML = ""

    // console.log(daily)

    daily.forEach( day => {
        const dayCardDomTemplateClone = dayCardTemplate.content.cloneNode(true)
        // console.log(dayCardDomTemplateClone)
        //clone from template
        //fill in the daily data into the dom clone

        // console.log(day.maxTemp)
        // console.log(WEEKDAY_GETTER.format(day.timestamp))
        // console.log(day.timestamp)



        //THIS PART IS NOT RENDERED
        // console.log('Before setting day and temp:', dayCardDomTemplateClone.innerHTML);

            setValue("day", WEEKDAY_GETTER.format(day.timestamp), {parent: 
                dayCardDomTemplateClone})
            setValue("temp", day.maxTemp, { parent: dayCardDomTemplateClone })

        // console.log('After setting day and temp:', dayCardDomTemplateClone.innerHTML);
            
            
            // console.log(`[data-${dataAttrWithoutDataWord}]`);
            // console.log(document.querySelector(`[data-date]`);
            
            //setting the src attribute path to the clone of the DOM
            dayCardDomTemplateClone.querySelector("[data-icon]").src = getIconUrl(day.iconCode)
            dailySection.append(dayCardDomTemplateClone)

        
    });
}
