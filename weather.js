

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
   return axios.get("https://api.open-meteo.com/v1/forecast?current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&hourly=temperature_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum&timeformat=unixtime", { params:{
        latitude : latit, 
        longitude: longit, 
        timezone //passing as it is, the name coincides
    } })
}