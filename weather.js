

/*
https://open-meteo.com/en/docs#api_form

hourly vars:
    temp,
    apparent temp, 
    precip(rain + showers + snow)
    weather code (this is for icons)
    wind speed(10m)

daily vars:
    weather code, 
    max temp (2m), 
    min temp (2m), 
    max appar temp (2m), 
    min appar temp (2m),
    precip sum

using current weather settings:
    temp, 
    apparent temp, 
    weather code,
    wind speed(10m)

settings: 
Celsius
Km/h
Mm
unix timestamp 

Api response: 
    chart and URL(open in a new tab, cpy url)

    https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime&timezone=Europe%2FBerlin

    https://api.open-meteo.com/v1/forecast? current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime
    (this the shortened link, since long and latit, timezone are passed separately, they are erased from the link)

https://api.open-meteo.com/v1/forecast is a link before the query
Use axios: 
npm i axios
*/

import axios from "axios";


export function getWeather(latit, longit, timezone){
    //the shortened link
    //the params may be passed directly or from the link. Anyway will work
   return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime",
        {   params:{
                latitude : latit, 
                longitude: longit, 
                timezone //passing as it is, the name coincides
            } 
        }) // we have an object returned
        .then( ({data}) =>{
            //we accept the returned data object
            //and return one more object of the parameters we need by means of destructuring
                return {
                    current: parseCurrentWeather( data),
                    // daily: parseDailyWeather(data),
                    // hourly: parseHourlyWeather(data)
                }
            }
        )
}

//destructuring the data exactly with the names from the incoming data
//we get two variables from the incoming object: current, daily
//dont forget to pass the object
function parseCurrentWeather({current, daily}){

    //here we destructure again and give new values, which we return
    const { 
        apparent_temperature: currentTemp,
        wind_speed_10m: windSpeed,
        weather_code: iconCode

    } = current

    //the second prop destructuring and naming new values
    const {
        // the same as = const maxTemp = daily.temperature_2m_max[0]
        temperature_2m_max: [maxTemp], 
        temperature_2m_min: [minTemp],
        apparent_temperature_max: [maxFeelsLike],
        apparent_temperature_min: [minFeelsLike],
        precipitation_sum: [precip]

    } = daily

    //we combined the parsed values into one obj
    return {
        currentTemp: Math.round(currentTemp), 
        highTemp: Math.round(maxTemp), 
        lowTemp: Math.round(minTemp),
        highFeelsLike: Math.round(maxFeelsLike), 
        lowFeelsLike: Math.round(minFeelsLike), 
        windSpeed: Math.round(windSpeed), 
        precip: Math.round(precip *100)/100, //rounding to 100 
        iconCode 

    }

}

/*
    current: 
        apparent_temperature: 
        interval: 
        temperature_2m: 
        time:
        weather_code: 
        wind_speed_10m: 


    the first index in arrays is the most recent value
    daily: 
        apparent_temperature_max: [25.6, 26.6, 26.1, 27.7, 28.8, 28.6, 26.9]
        apparent_temperature_min: [12.3, 11.8, 11.8, 11.3, 11.4, 12.4, 12.5]
        precipitation_sum: [0, 0, 0, 0, 0, 0, 0]
        temperature_2m_max: [29.1, 29.6, 29.4, 30.6, 31.6, 31.9, 30.7]
        temperature_2m_min: [14.8, 14.8, 15, 14.2, 14.1, 15, 15.8]
        time: [1706137200, 1706223600, 1706310000, 1706396400, 1706482800, 1706569200, 1706655600]
        weather_code: [3, 1, 3, 1, 0, 0, 0]

*/