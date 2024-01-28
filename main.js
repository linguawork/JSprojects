import './style.css'
import { getWeather } from './weather'
import { ICON_MAP } from './helperFunctions'




/**
    This is how we get the current location time
    navigator.geolocation.getCurrentPosition(currPosition, positionError)
    the function accepts two callbacks: success AND failure

    https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition

    The function gets the const variable with coordinates, 
    it is coords, not any other term

    !!!let the browser have the permission to your current location
*/
navigator.geolocation.getCurrentPosition(currPosition, positionError)



function currPosition({ coords }){
// this prints the coords
    // console.log(coords)
    
    
    getWeather(
        coords.latitude, 
        coords.longitude, 
        /**
            This is how we get time zone, it will give us our current location time
            Intl.DateTimeFormat().resolvedOptions().timeZone 
            https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/resolvedOptions
        */
        Intl.DateTimeFormat().resolvedOptions().timeZone)
        .then(outputWeather)
    .catch(error => {
        console.error(error)
        alert("we got the error!")
        }
    )
}

function positionError(){
    alert("Could not get the position!")
}


//it is important to set the correct latitude and longitude
//this is the location for Wolfsburg, Germany set manually
    // getWeather(
    //     52.42, 
    //     10.78, 
    //     Intl.DateTimeFormat().resolvedOptions().timeZone)
    // .then(outputWeather)
    // .catch(error => {
    //     console.error(error)
    //     alert("we got the error!")
    //     }
    // )   
    

    //this is debug code to check the data
        // .then(data => { //this is for debug to see the data
        //     console.log(data)
        //  })

//forgot to destructure the obj
function outputWeather({current, daily, hourly}){
    outputCurrentWeather(current)
    // console.log(current)
    // console.log(daily)
    outputDailyWeather(daily)
    outputHourlyWeather(hourly)

    // this is for testing the rendering
    document.body.classList.remove('blurred')
}

function setValue(dataAttrWithoutDataWord, parsedVal, {parent = document} = {}){

    //dont forget the [] in backticks
    // const element = document.querySelector(`[data-${dataAttrWithoutDataWord}]`);
                /* This is for debug to see the DOM. When active it hinders the DOM from complete updating */
                    // if (element) {
                    // element.textContent = parsedVal;
                    // console.log('After setting value:', parent.outerHTML);
                    // } else {
                    // console.error(`Element not found: [data-${dataAttrWithoutDataWord}]`);
                    // console.log('Parent:', parent.outerHTML);
                    // }

    parent.querySelector(`[data-${dataAttrWithoutDataWord}]`).textContent = parsedVal
                // console.log(`[data-${dataAttrWithoutDataWord}]`);
                // console.log(document.querySelector(`[data-${dataAttrWithoutDataWord}]`).textContent = parsedVal);
}



function getIconUrl(iconCode){
    //getting the img by code from map
    return `icons/${ICON_MAP.get(iconCode)}.svg`
}

const currentIcon =document.querySelector(`[data-current-icon]`)

//here is where we use the attr data, to apply parsed data to the DOM
function outputCurrentWeather(current){

    //this line rewritten into the setValue function to make it readable
    // document.querySelector("[data-current-temp]").textContent = curr.current.currentTemp

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
                // console.log(day.maxTemp)
                // console.log(WEEKDAY_GETTER.format(day.timestamp))
                // console.log(day.timestamp)
                
                
                //THIS PART IS NOT RENDERED
                //console.log('Before setting day and temp:', dayCardDomTemplateClone.innerHTML);
    
    //clone from template
    //fill in the daily data into the dom clone
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


//this gets hour of a day
const HOUR_GETTER = new Intl.DateTimeFormat(undefined, {hour: "numeric"})

//the hourly part of the DOM is selected
const hourlySection = document.querySelector("[data-hour-section]")

// take the template
const hourCardTemplate = document.getElementById("hour-row-template")





function outputHourlyWeather(hourly){
    // clear the hourly part
    hourlySection.innerHTML = ""
    
    // console.log(hourly)
    
    
/*
168 hours per week in the hourly array, here we minus passed hours of the current day. 
The whole array is run through with forEach(the code works).
I commented and replaced with the shorter run for 24 hours, see below
*/

    // hourly.forEach( hour => {
    // const hourCardDomTemplateClone = hourCardTemplate.content.cloneNode(true)
    //     console.log(hourCardDomTemplateClone)
    //     // console.log(hour.maxTemp)
    //     // console.log(HOUR_GETTER.format(hour.timestamp))
    //     // console.log(hour.timestamp)
        


    // //clone from template
    // //fill in the daily data into the dom clone
    // setValue("day", WEEKDAY_GETTER.format(hour.timestamp), {parent: 
    //     hourCardDomTemplateClone})
    // //in the template I had a type error: date-time/ It is actually not datE, but datA
    // setValue("time", HOUR_GETTER.format(hour.timestamp), {parent: hourCardDomTemplateClone})
    //     //setting the src attribute path to the clone of the DOM //OK
    // hourCardDomTemplateClone.querySelector("[data-icon]").src = getIconUrl(hour.iconCode)
    // //maxTemp typo
    // setValue("temp", hour.maxTemp, { parent: hourCardDomTemplateClone })
    // setValue("fl-temp", hour.feelsLike, { parent: hourCardDomTemplateClone })
    // setValue("wind", hour.windSpeed, { parent: hourCardDomTemplateClone })
    // setValue("precip", hour.precip, { parent: hourCardDomTemplateClone })
    // hourlySection.append(hourCardDomTemplateClone)
    // });


//this is the setting for the next 24 hours 
    for (let i = 0; i < 24; i++){
        const hourCardDomTemplateClone = hourCardTemplate.content.cloneNode(true)
        setValue("day", WEEKDAY_GETTER.format(hourly[i].timestamp), {parent: 
            hourCardDomTemplateClone})
        setValue("time", HOUR_GETTER.format(hourly[i].timestamp), {parent: hourCardDomTemplateClone})
        hourCardDomTemplateClone.querySelector("[data-icon]").src = getIconUrl(hourly[i].iconCode)
        setValue("temp", hourly[i].maxTemp, { parent: hourCardDomTemplateClone })
        setValue("fl-temp", hourly[i].feelsLike, { parent: hourCardDomTemplateClone })
        setValue("wind", hourly[i].windSpeed, { parent: hourCardDomTemplateClone })
        setValue("precip", hourly[i].precip, { parent: hourCardDomTemplateClone })
        hourlySection.append(hourCardDomTemplateClone)
    }

}