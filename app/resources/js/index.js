let global = {
    apikey: '967523625f9a1179',
    getKey: function (){
        return this.apikey;
    }
};

let weatherTemp = document.querySelector('.weather-temp');
let weatherIcon = document.querySelector('.weather-icon');
let weatherDesc = document.querySelector('.weather-desc');
let celsiusBtn  = document.querySelector('.js--celsius');
let fahrBrn     = document.querySelector('.js--fahr');

function celsiusToFahrenheit(temp){
    return (temp * 1.8 + 32).toFixed(2);
}
celsiusBtn.addEventListener('click', ()=> {
    weatherTemp.innerHTML = global.temp + '&#8451;';
});

fahrBrn.addEventListener('click', ()=> {
    weatherTemp.innerHTML = celsiusToFahrenheit(global.temp) + '&#8457;';
});

(function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        weatherIcon.innerHTML = 'Geolocation is not supported by this browser.';
    }
})();

function showPosition(position) { 
    console.log('latitude', position.coords.latitude);
    console.log('long', position.coords.longitude);
    getTemperature(position.coords.longitude, position.coords.latitude);
};

function getTemperature(long, lat) {
    fetch(`https://api.wunderground.com/api/${global.getKey()}/conditions/q/${lat},${long}.json`)
    .then((resp) => resp.json())
    .then(function(data){
        console.log(data);
        fixWeatherDetails(data);
        global.temp = data.current_observation.temp_c;
    })
    .catch(function(err){
        alert('hey, there was a problem. Sorry about that!');
    });

    function fixWeatherDetails(data) {
        weatherTemp.innerHTML = data.current_observation.temp_c + '&#8451;';
        weatherDesc.innerHTML = data.current_observation.weather;
        weatherIcon.innerHTML = `<img src='${data.current_observation.icon_url}' />`;
    }
}
