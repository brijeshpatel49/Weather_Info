let cityName = document.querySelector(".weather_city");
let dateTime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temp = document.querySelector(".weather_temp");
let w_minTemp = document.querySelector(".weather-min");
let w_maxTemp = document.querySelector(".weather-max");

let w_feelsLike = document.querySelector(".weather_feelslike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");

let city = "mahesana"
let citySearch = document.querySelector(".weather_search");

//City Suggestion 
let cityInput = document.querySelector(".city_name");
let suggestionBox = document.querySelector(".suggestion_box");
const API_KEY = "0b94457b50ce9e30b655f8ec68b3c58c";
const searchCity = async (query) => {
   
  if(query.length < 3){
    suggestionBox.innerHTML = "";
    return;
  }

  const URL = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`;

  try{
    const res = await fetch(URL);
    const cities = await res.json();
    console.log(cities);

    if (!Array.isArray(cities) || cities.length === 0) {
      suggestionBox.innerHTML = "<li>No results found</li>";
      return;
    }


    suggestionBox.innerHTML = "";

    cities.forEach((city)=>{
      let li=document.createElement("li");
      li.textContent=`${city.name},${city.state},${city.country}`;
      li.onclick=()=>selectCity(city.name);
      suggestionBox.appendChild(li);
    });

  }catch(error){
    console.error("Error fetching city suggestions", error);
  }

}

    const selectCity=(cityName)=>{
      cityInput.value=cityName;
      suggestionBox.innerHTML="";
      city=cityName;
      getWeatherData(city);
    }

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  let cityInput = document.querySelector(".city_name");
  console.log(cityInput.value);

  city = cityInput.value;
  getWeatherData();
  cityInput.value = "";
  suggestionBox.innerHTML = "";
});


const getCountryName = (code) => {
  return new Intl.DisplayNames([code], { type: 'region' }).of(code);
};

const getDataTime = (dt) => {
  const curDate = new Date(dt * 1000);
  console.log(curDate);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    //   second: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  return formatter.format(curDate);

};

const getWeatherData = async () => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0b94457b50ce9e30b655f8ec68b3c58c`;
  try {
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);

    if (data.cod !== 200) {
      console.log("City not found");
      cityName.innerHTML = "City not found";
      suggestionBox.innerHTML = "";
      dateTime.innerHTML = "";
      w_forecast.innerHTML = "";
      w_icon.innerHTML = "";
      w_temp.innerHTML = "";
      w_minTemp.innerHTML = "";
      w_maxTemp.innerHTML = "";
      w_feelsLike.innerHTML = "";
      w_humidity.innerHTML = "";
      w_wind.innerHTML = "";
      w_pressure.innerHTML = "";
      return;
    }


    const { main, name, weather, wind, sys, dt } = data;

    let country = sys.country ? getCountryName(sys.country) : " ";

    cityName.innerHTML = `${name},${country}`;
    dateTime.innerHTML = getDataTime(dt);

    w_forecast.innerHTML = weather[0].main;
    w_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png"/>`;

    w_temp.innerHTML = `${(main.temp - 273.15).toFixed(1)}&#176`;
    w_minTemp.innerHTML = `Min:${(main.temp_min - 273.15).toFixed(1)}&#176`;
    w_maxTemp.innerHTML = `Max:${(main.temp_max - 273.15).toFixed(1)}&#176`;


    w_feelsLike.innerHTML = `${(main.feels_like - 273.15).toFixed(1)}&#176`;
    w_humidity.innerHTML = `${main.humidity}%`;
    w_wind.innerHTML = `${wind.speed}m/s`;
    w_pressure.innerHTML = `${main.pressure} hPa`;
  }
  catch (error) {
    console.log(error);
  }
};

window.addEventListener("load", getWeatherData());
