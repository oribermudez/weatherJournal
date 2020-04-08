// Personal API Key for OpenWeatherMap API
const APIKEY = '3f67b6357acd6e4369978300651f5a5c';

// Event listener to add function to existing HTML DOM element
/**
* requiredField
* @description Creates required field inputs and shows it for 3 seconds
*/
const requiredField = (parentElement) => {
  // If the class 'required' doesn't exists in the HTML, create it.
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
  if(document.querySelector('#zip').value !== '') {
    document.querySelector('.zip-code').classList.add('vanish');
    document.querySelector('.feel').classList.remove('vanish');
  } else {
    requiredField('.container');
  }
}

const nextButton = document.querySelector('#forward');
nextButton.addEventListener('click', showNextSection);

/**
* submitInfo
* @description Toggles vanish class in order to show and hide different sections
*/
const submitInfo = () => {
  if(document.querySelector('#feelings').value !== '') {
    document.querySelector('.feel').classList.add('vanish');
    document.querySelector('#entry-holder').classList.remove('vanish');
  } else {
    requiredField('.container');
  }
}

const submitButton = document.querySelector('#generate');
submitButton.addEventListener('click', submitInfo);

/* Function called by event listener */

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */
