
// ----------------------------- CONSTANTS -----------------------------

const API_KEY = '3f67b6357acd6e4369978300651f5a5c';
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const SERVER_URL = 'http://localhost:3000';


// ----------------------------- INPUTS FUNCTIONALITY -----------------------------

/**
* requiredField
* @description Creates required field for inputs and displays it for 3 seconds
* @param {string} parentElement - The id or class of the HTML element to check
*/
const requiredField = (parentElement) => {
  // If the class 'required' doesn't exists in the HTML, create it
  if(!document.querySelector('.required')) {
    const requiredDiv = document.createElement('div');
    requiredDiv.classList.add('required');
    requiredDiv.innerHTML = "This field is required";
    document.querySelector(parentElement).appendChild(requiredDiv);
    // Remove required div after 3 seconds
    setTimeout(() => {
      document.querySelector('.required').remove();
    }, 3000);
  }
}

/**
* showNextSection
* @description Toggles vanish class in order to show and hide different sections
*/
const showNextSection = () => {
  // If the value of #zip input is different from an empty string, proceed
  if(document.querySelector('#zip').value.length !== 0) {
    document.querySelector('.zip-code').classList.add('vanish');
    document.querySelector('.feel').classList.remove('vanish');
  } else {
    requiredField('.container');
  }
}

/**
* handleReturn
* @description Toggles vanish class in order to show and hide different sections
*/
const handleReturn = () => {
    document.querySelector('#entry-holder').classList.add('vanish');
    document.querySelector('#return').classList.add('vanish');
    document.querySelector('#zip').value = '';
    document.querySelector('#feelings').value = '';
    document.querySelector('.zip-code').classList.remove('vanish');
}

// ----------------------------- HTTP REQUETS -----------------------------

/**
* getWeatherData
* @description Makes the HTTP get request to fetch the needed data
* @param {string} url - The API url
*/
const getWeatherData = async (url) => {
  const response = await fetch(url);

  try {
    // return await response.json();
    const weather = await response.json();
    return weather;
  }
  catch(error) {
    console.log("Error", error);
  }
}

/**
* saveWeatherData
* @description Makes the HTTP post request to save the weather data in the server
* @param {string} url - The API url
*/
const saveWeatherData = async (weatherData) => {
  const url = `${SERVER_URL}/saveWeather`;
  const newEntry = {
    date: new Date,
    temp: weatherData.main.temp,
    content: document.getElementById('feelings').value,
  }
  const response = await fetch( url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newEntry),
  });

  try {
    return await response.json();
  } catch(error) {
    console.log("Error", error);
  }
}

/**
* updateUserInterface
* @description Gets the data from the server and displays it
*/
const updateUserInterface = async () => {
  const url = `${SERVER_URL}/weatherInfo`;

  await getWeatherData(url).then(weatherInfo => {
    document.querySelector('#date-text').innerHTML = weatherInfo.date;
    document.querySelector('#temp-text').innerHTML = `${weatherInfo.temp} °F`;
    document.querySelector('#content-text').innerHTML = weatherInfo.content;
  });
}

/**
* handleGenerate
* @description Makes the weather HTTP requests and updates the UI when clicking generate button
*/
const handleGenerate = async () => {
  const zip = document.querySelector('#zip').value;
  const url = `${BASE_URL}${zip}&appid=${API_KEY}`;

  // If the value of #feelings textarea is different from an empty string, proceed
  if(document.querySelector('#feelings').value !== '') {
    document.querySelector('.feel').classList.add('vanish');
    // Chained promises to get weather data
    await getWeatherData(url)
      .then(weatherData => saveWeatherData(weatherData))
      .then(() => updateUserInterface())
      .catch(error => (console.log('Error: ', error)));
    document.querySelector('#entry-holder').classList.remove('vanish');
    document.querySelector('#return').classList.remove('vanish');
  } else {
    requiredField('.container');
  }
}

// ----------------------------- EVENT LISTENERS -----------------------------

const nextButton = document.querySelector('#forward');
nextButton.addEventListener('click', showNextSection);

const submitButton = document.querySelector('#generate');
submitButton.addEventListener('click', handleGenerate);

const returnButton = document.querySelector('#return');
returnButton.addEventListener('click', handleReturn);
