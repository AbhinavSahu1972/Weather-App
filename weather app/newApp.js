// Declaration of variables

let searchValue;
const searchBtn = document.querySelector('.search-btn');
const form = document.getElementById('formEl');






function getHue(nowTemp) {
  
  var maxHsl = 380;  
  var minHsl = 170; 
  var rngHsl = maxHsl - minHsl; 

  var maxTemp = 115;
  var minTemp = -10;
  var rngTemp = maxTemp - minTemp; // 125
  var degCnt = maxTemp - nowTemp; // 0
  var hslsDeg = rngHsl / rngTemp;  //210 / 125 = 1.68 Hsl-degs to Temp-degs
  var returnHue = (360 - ((degCnt * hslsDeg) - (maxHsl - 360))); 
  return returnHue;  
}
// Adding Event Listeners
form.addEventListener('click' , e=>{
    e.preventDefault();
})
searchBtn.addEventListener('click' ,searchEvent);
function searchEvent(e){

     searchValue = document.getElementById('search-input').value;

    getWeatherData(searchValue);
    console.log('back to the search event ')
    document.getElementById('search-input').value = '';
}


// functions 
async function getWeatherData(country){

    removeExistingWeatherDate()
   
    // document.body.style.backgroundImage =
    //   "url(`https://source.unsplash.com/1600x900/?${country}`)";
    // document.body.style.backgroundImage = 
    // "url('https://picsum.photos/800/800')";
    // document.body.style.backgroundImage.url = 'https://picsum.photos/200/300?grayscale'
    const apiKey = '56a5076058344a9b242c69e9283e442b';

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}&units=metric`);

    // console.log(response.status)
    if(response.status == 404){
        // alert('Error has occured, Enter the correct country name!');

        displayError();
    }

    else{
        const data = await response.json();

        // Working with the Data 
        const {main , description , icon} = data.weather[0];
        const {temp , feels_like , humidity} = data.main;
        const {speed} = data.wind;
    
    
        //Creating an element to hold the information about the weather
        const myWeather = document.createElement('div');
        myWeather.classList.add('localWeather');
        document.getElementById('weather').appendChild(myWeather);
    
        // myWeather.innerHTML = '';
    
    
        const html =
        `
        <header>
            <h3>${data.name}</h3>
        </header>
    
        <div class="description">
            <div class = 'icon'>
            <img src = "https://openweathermap.org/img/wn/${icon}.png" alt = 'image' />
            </div>
    
            <p>${description}<p>
            
        </div>
    
            <div class="temperature">Temperature : ${temp.toFixed(1)} °C</div>
            <div class="feels-like">Feels Like: ${feels_like.toFixed(1)} °C</div>
            <div class="humidity">Humidity : ${humidity} %</div>
            <div class="wind">Wind Speed : ${speed} km/h</div>
    
        </div>
    `;

    myWeather.innerHTML = html;
    }
    var c = document.getElementById('c');
    var ctx = c.getContext('2d');
    temp = 70; // at 70, getHue() returns a purple around the 300deg mark
    var hue = getHue(parseFloat(temp));
    ctx.fillStyle = 'hsl(' + [hue, '100%', '50%'] + ')';
    // ctx.fillRect(0, 0, 40, 40);
}


function removeExistingWeatherDate(){

    const allweatherElements = Array.from(document.getElementsByClassName('localWeather'));

    allweatherElements.forEach(weatherElement =>{
        weatherElement.remove();
    })
}

function displayError(){
    // console.log('error has occured!');

    const errorMsg = document.querySelector('.error-msg');

    errorMsg.classList.remove('hide');
    
    setTimeout(() => {

        errorMsg.classList.add('hide');
    }, 1200);
}