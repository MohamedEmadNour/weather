var res;
var searchInbut = document.querySelector('#searchInbut');
var searchInputValue = localStorage.getItem("City");

if (searchInputValue === null) {
  searchInputValue = "cairo";
  localStorage.setItem("City", searchInputValue);
}
var Data;
var formattedDate;
var formattedDay;
var formattedDay1;
var formattedDay2;
var dataReload;

searchInbut.addEventListener('keyup', function(e) {
  if (e.key == 'Enter') {
    var searchInbutvalue = searchInbut.value;
    localStorage.setItem('City', searchInbutvalue);
    Reaf();
  }
});

(async function() {
  searchInbutvalue = localStorage.getItem('City'); // Define searchInbutvalue here
  Data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=a403972967674c60812143031230808&q=${searchInbutvalue}&days=7`);
  res = await Data.json();
  
  var currentTime = new Date(res.location.localtime);
  var month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
  var day = currentTime.getDate().toString().padStart(2, '0');
  // tomorrow 
  var Tomorrow = new Date(currentTime);
  Tomorrow.setDate(Tomorrow.getDate() + 1);
  formattedDay1 = Tomorrow.toLocaleString('en-US',{ weekday: 'long'});
  //dayafter tomorrow 
  var Tomorrow2 = new Date(currentTime);
  Tomorrow2.setDate(Tomorrow2.getDate() + 2);
  formattedDay2 = Tomorrow2.toLocaleString('en-US',{ weekday: 'long'});

  formattedDay = currentTime.toLocaleString('en-US',{ weekday: 'long'});
  formattedDate = `${month}/${day}`;
  
  DataAfterAwait();
  SteData();
})();

function DataAfterAwait() {
  if (res !== null) {
    GteData();
  }
document.querySelector(`#weatherday`).innerHTML = `${formattedDay}` ;
document.querySelector(`#weatherdata`).innerHTML = `${formattedDate}` ;
document.querySelector(`#thecity`).innerHTML = `${res.location.name}`; 
document.querySelector(`#TheDeg`).innerHTML = `${res.current.temp_c}` ;
document.querySelector(`#theWeth`).innerHTML = `${res.current.condition.text}` ;
document.querySelector(`#Icon`).innerHTML = `<img width="40%" src="https:${res.current.condition.icon}" alt="TheDayIcon">` ;
document.querySelector(`#infosun`).innerHTML = `${res.current.uv} %` ;
document.querySelector(`#infowind`).innerHTML = `${res.current.wind_kph} Kph`;
document.querySelector(`#infocom`).innerHTML = `${res.location.country}` ;
document.querySelector(`#TheNextDay`).innerHTML = `${formattedDay1}` ;
document.querySelector(`#Icon2`).innerHTML = `<img width="40%" src="https:${res.forecast.forecastday[1].day.condition.icon}" alt="TheDayIcon">` ;
document.querySelector(`#TheDeg2b`).innerHTML = `${res.forecast.forecastday[1].day.maxtemp_c}` ;
document.querySelector(`#TheDeg2s`).innerHTML = `${res.forecast.forecastday[1].day.mintemp_c}` ;
document.querySelector(`#theWeth2`).innerHTML = `${res.forecast.forecastday[1].day.condition.text}` ;
document.querySelector(`#TheDayAfter`).innerHTML = `${formattedDay2}`;
document.querySelector(`#Icon3`).innerHTML = `<img width="40%" src="https:${res.forecast.forecastday[2].day.condition.icon}" alt="TheDayIcon">` ;
document.querySelector(`#TheDeg3b`).innerHTML = `${res.forecast.forecastday[2].day.maxtemp_c}` ;
document.querySelector(`#TheDeg3s`).innerHTML = `${res.forecast.forecastday[2].day.mintemp_c}` ;
document.querySelector(`#theWeth3`).innerHTML = `${res.forecast.forecastday[2].day.condition.text}` ;


}

function Reaf() {
  window.location.reload(); 
}

function GteData() {
  if (res === null) {
    res = JSON.parse(localStorage.getItem('Defult'));
  }
}

function SteData() {
  localStorage.setItem('Defult', JSON.stringify(res));
}
