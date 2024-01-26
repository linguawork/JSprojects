


// this the function to get  timezine and date
// const desiredTimeZone = 'America/New-York'; // Replace with your desired time zone

// const dateTimeOptions = {
//   timeZone: desiredTimeZone,
//   // Add other formatting options if needed
// };

// const dateFormatter = new Intl.DateTimeFormat('en-US', dateTimeOptions);
// const formattedDate = dateFormatter.format(new Date());

// console.log(formattedDate);


export function myActualPositionLongLat()
{
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        // Now you can use the latitude and longitude in your code
            // console.log("Latitude:", latitude);
            // console.log("Longitude:", longitude);
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
  return [latitude, longitude]
}
  