
//adding key-value pairs, cause weather codes have different pics
export const ICON_MAP = new Map()

//we can this way, it is longer or using method addMapping
    // ICON_MAP.set(0, 'sun')
    // ICON_MAP.set(1, 'sun')

addMapping([0, 1], "sun")
addMapping([2], "cloud-sun")
addMapping([3], "cloud")
addMapping([45, 48], "smog")
addMapping([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82], "cloud-showers-heavy")
addMapping([71, 73, 75, 77, 85, 86], "snowflake")
addMapping([95, 96, 99], "cloud-bolt")



//the function will bind the codes and icon names
function addMapping(values, icon){
  values.forEach(code => {
    ICON_MAP.set(code, icon)
    
  });
}



/**
 * The code below is to be worked out later. I just commented it for a while
 */

// this the function to get  timezone and date
// const desiredTimeZone = 'America/New-York'; // Replace with your desired time zone

// const dateTimeOptions = {
//   timeZone: desiredTimeZone,
//   // Add other formatting options if needed
// };

// const dateFormatter = new Intl.DateTimeFormat('en-US', dateTimeOptions);
// const formattedDate = dateFormatter.format(new Date());

// console.log(formattedDate);


// export function myActualPositionLongLat()
// {
// if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;
  
//         // Now you can use the latitude and longitude in the code
//             // console.log("Latitude:", latitude);
//             // console.log("Longitude:", longitude);
//       },
//       (error) => {
//         console.error("Error getting location:", error.message);
//       }
//     );
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//   }
//   return [latitude, longitude]
// }
  