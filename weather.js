

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
            // return data
            
            return {
                    current: parseCurrentWeather( data),
                    daily: parseDailyWeather(data),
                    hourly: parseHourlyWeather(data)
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

function parseDailyWeather({daily}){
    return daily.time.map( (time, index) => {
        return {
            timestamp: time * 1000, //time is in seconds, js needs in milliseconds
            iconCode: daily.weather_code[index],
            maxTemp: Math.round(daily.temperature_2m_max[index])
        
        }
    
    })

}

function parseHourlyWeather({hourly, current}){
    return hourly.time.map( (time, index) => {
        return {
            timestamp: time * 1000, //time is in seconds, js needs in milliseconds
            iconCode: hourly.weather_code[index],
            maxTemp: Math.round(hourly.temperature_2m[index]), // 2meter above surface, actual temperature of the hour
            feelsLike: Math.round(hourly.apparent_temperature[index]),
            windSpeed: Math.round(hourly.wind_speed_10m[index]),
            precip: Math.round(hourly.precipitation[index] * 100) /100,//this is for extra precision in rounding
        
        
        }
     
    })

}

/*
hourly: 
apparent_temperature: 
(168) [16.2, 15.5, 14.8, 14.2, 13.7, 13.1, 12.6, 12.2, 13.8, 15.2, 17, 20.2, 23.1, 25.4, 26.5, 26.7, 25.5, 24.8, 23.7, 21.1, 19.6, 18.8, 17.6, 16.7, 16, 15.3, 14.6, 13.7, 12.9, 12.2, 11.9, 11.6, 12.6, 13.9, 15.8, 19.1, 21.8, 24, 25.1, 25.3, 24.6, 24.1, 22.9, 20.6, 18.9, 17.9, 16.9, 16.1, 15.2, 14.5, 14, 13.5, 12.8, 12, 11.6, 11.3, 13.3, 15, 17.3, 20.8, 23.6, 25.6, 26.8, 27, 26.1, 25.2, 24, 21.3, 19.7, 18.4, 17.3, 16.3, 15.4, 14.6, 13.7, 13.3, 12.7, 12, 11.5, 11.3, 13.1, 15.9, 18.4, 21.5, 24.5, 26.5, 27.6, 28, 27.1, 25.5, 23.5, 21.7, 20.3, 19.1, 18.1, 17.1, 16.4, 15.7, 15, 14.5, …]

precipitation: 
(168) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, …]

temperature_2m: 
(168) [18.9, 18, 17.3, 16.7, 16.2, 15.7, 15.2, 14.9, 16.9, 19.4, 21.6, 23.8, 25.9, 27.7, 29, 29.6, 29.5, 28.8, 27, 24.1, 22.7, 21.7, 20.7, 19.9, 19.2, 18.4, 17.6, 16.8, 16.2, 15.6, 15.5, 15.2, 16.5, 18.6, 20.6, 23, 25.1, 26.9, 28.1, 28.8, 28.9, 28.3, 26.6, 23.7, 22.2, 21.1, 20.1, 19.2, 18.3, 17.7, 17.3, 16.7, 15.9, 15.3, 14.8, 14.4, 16.4, 19.1, 21.7, 24.1, 26.3, 28.2, 29.5, 30.2, 30.2, 29.6, 27.7, 24.7, 23.1, 21.8, 20.6, 19.5, 18.6, 17.8, 16.9, 16.3, 15.4, 14.7, 14.2, 13.9, 16.1, 19.4, 22.5, 25.1, 27.4, 29.2, 30.5, 31.2, 31.1, 29.6, 27.3, 25.2, 23.7, 22.5, 21.4, 20.4, 19.5, 18.6, 17.9, 17.2, …]

time: 
(168) [1706223600, 1706227200, 1706230800, 1706234400, 1706238000, 1706241600, 1706245200, 1706248800, 1706252400, 1706256000, 1706259600, 1706263200, 1706266800, 1706270400, 1706274000, 1706277600, 1706281200, 1706284800, 1706288400, 1706292000, 1706295600, 1706299200, 1706302800, 1706306400, 1706310000, 1706313600, 1706317200, 1706320800, 1706324400, 1706328000, 1706331600, 1706335200, 1706338800, 1706342400, 1706346000, 1706349600, 1706353200, 1706356800, 1706360400, 1706364000, 1706367600, 1706371200, 1706374800, 1706378400, 1706382000, 1706385600, 1706389200, 1706392800, 1706396400, 1706400000, 1706403600, 1706407200, 1706410800, 1706414400, 1706418000, 1706421600, 1706425200, 1706428800, 1706432400, 1706436000, 1706439600, 1706443200, 1706446800, 1706450400, 1706454000, 1706457600, 1706461200, 1706464800, 1706468400, 1706472000, 1706475600, 1706479200, 1706482800, 1706486400, 1706490000, 1706493600, 1706497200, 1706500800, 1706504400, 1706508000, 1706511600, 1706515200, 1706518800, 1706522400, 1706526000, 1706529600, 1706533200, 1706536800, 1706540400, 1706544000, 1706547600, 1706551200, 1706554800, 1706558400, 1706562000, 1706565600, 1706569200, 1706572800, 1706576400, 1706580000, …]

weather_code: 
(168) [1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 3, 3, 2, 3, 3, 2, 2, 3, 3, 2, 1, 1, 1, 1, 1, 1, 0, 1, 2, 3, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, …]

wind_speed_10m: 
(168) [8.3, 7.6, 7.2, 7.6, 7.6, 7.6, 7.9, 7.9, 10.2, 17, 20.4


*/