/** Exercise 04 - API **/

const url = 'https://restcountries.com/v3.1/all';

/**
 * 
 * @param {*} url Data source
 * @returns Promise
 * Asynchronous function to get data from the provided URL
 */
async function getData(url) {
  try {
    const response = await fetch(`${url}`);
    if(!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.log("Fetch operation failed!");
    console.log(err);
  }
}

/**
 * Takes no arguments
 * Gets the ordered list element from document.
 * Calls getData
 * On Promise resolution, iterates through returned data and combines 
 * the name and (formatted) population data into a single string, stored in array.
 * Array is sorted alphabetically, and the countries are appended to the list.
 * @returns Nothing
 */
function parseData() {
  const list = document.getElementById("results");
  let name;
  let pop;
  let countries = [];
  if(!list) { //Checks that a valid object was returned from the document.
    return;
  }
  getData(url).then((data) => { //Get promise from getData- on fulfillment:
    for (const item of data) { //Loop through
      name = item.name.common; //Get each country's common name
      pop = item.population.toLocaleString(); //Get each country's pop and format the value
      let str = `${name} - ${pop}`
      countries.push(str); //Add string to array
    }
    
    countries = countries.sort((a,b) => a.localeCompare(b)); //Sort country list alphabetically
    for(let i = 0; i < countries.length; i++) { //Iteate through countries and append each to the list element.
      console.log(countries[i]);
      let element = document.createElement("li");
      element.innerText = countries[i];
      list.appendChild(element);
    }
  }).catch((e) => {
    console.log('Error: ', e);
  }); 
 
}

parseData();

