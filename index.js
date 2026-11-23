let searchBar = document.getElementById("search");
let searchBtn =document.getElementById("searchbtn");
let temperature = document.getElementById("temperature");
let humidity = document.getElementById("humidity");
let windSpeed= document.getElementById("windspeed");
let city = document.getElementById("cityname");

let search = ()=>{
if(searchBar.value === ""){
  alert("enter a city name")
} else{
        city.innerText = searchBar.value
        cityCordinates();
      
      }
};
  searchBtn.addEventListener("click", search);

const data = async (lat , lon) => {
  let response = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m"`);
  let value = await response.json();

  temperature.innerText = value.current. temperature_2m + "°C"
  windSpeed.innerText = value.current.wind_speed_10m + "km/h"
  humidity.innerText = value.hourly.relative_humidity_2m[0] +"%"


}
const cityCordinates =async()=>{
  let city = searchBar.value;
  console.log (city);

  let response2 = await fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
  let myValue = await response2.json();
  console.log(myValue);

  if (myValue.results.length===0){
    alert("city not found")
    return;
  }

  if (myValue.results[0].name.toLowerCase() !==city.toLowerCase()){
    alert("enter a correct city");
  return;
}
let lat = myValue.results[0].latitude;
let lon = myValue.results[0].longitude;
data(lat , lon);
searchBar.value = "" 
};




