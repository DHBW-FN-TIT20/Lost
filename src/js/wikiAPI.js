// wikiSearch(48.175022701706496, 11.55661010796519, "München").then(r => console.log(r));

/**
 * This function gets a representative wikipedia article to the given position.
 * First it trys to find more info to the given coordinates, if it doesn't find a representative article about those coordinates, 
 * it searches for an article about the given city.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 * @param {string} city - The city name in which the {@link lat}/{@link lng} lays
 * @returns A Promise which contains the API request.
 */
function wikiSearch(lat, lon, city) {
  return new Promise((resolve, reject) => {
    let article = {
      title: "",
      text: ""
    };
    getGeoSearch(lat, lon, res_geo => {
      if ((res_geo.query.geosearch).length !== 1) {
        getCity(city, res_city => {
          article.title = res_city.query.pages[Object.keys(res_city.query.pages)[0]].title;
          getWikiText(article.title, res_text => {
            article.text = res_text.query.pages[Object.keys(res_text.query.pages)[0]].extract;
            resolve(article);
          });
        });
      } else {
        article.title = res_geo.query.geosearch[0].title;
        getWikiText(article.title, res_text => {
          article.text = res_text.query.pages[Object.keys(res_text.query.pages)[0]].extract;
          resolve(article);
        });
      }
    });
  });
}

/**
 * This function starts a wikipedia API request to the specified coordinates.
 * It builds the required url with the specified coordinates, calls the {@link runAPI} and executes the callback function if successful.
 * The callback function gets the introduction passed.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 * @param {function} callback - The action which gets called as soon as the response is ready
 */
function getGeoSearch(lat, lon, callback) {
  runAPI("https://de.wikipedia.org/w/api.php?action=query&origin=*&list=geosearch&gsradius=75&gscoord=" + lat + "|" + lon + "&format=json&gslimit=1").then((res) => { callback(res) }
    , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

/**
 * This function starts a wikipedia API request to search for an introduction to an article.
 * It builds the required url with the given title of the article, calls the {@link runAPI} and executes the callback function after a success.
 * The callback function gets the introduction passed.
 * @param {string} datag - The title off the article
 * @param {function} callback - The action which gets called as soon as the response is ready
 */
function getWikiText(datag, callback) {
  runAPI("https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=5&titles=" + datag + "&explaintext=true&exsectionformat=plain&format=json").then((res) => { callback(res) }
    , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

/**
 * This function creates a wikipedia API request to search for articles about the specified city.
 * The function builds the required url with the given city, calls the {@link runAPI} and executes the callback function if successful.
 * The callback function gets the available articles passed.
 * @param {string} cityg - The name of a city
 * @param {function} callback - The action which gets called as soon as the reponse is ready
 */
function getCity(cityg, callback) {
  runAPI("https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrlimit=1&gsrsearch='" + cityg + "'").then((res) => { callback(res) }
    , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

/**
 * This function preforms a get request on the specified url.
 * It solves the promise with the correct response. It rejects on a failed request.
 * @param {string} url - The url for the API request
 * @returns - A promise which contains the executed API request
 */
function runAPI(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(this.response);
      } else {
        reject(xhr.status);
      }
    };
    xhr.onerror = reject;
    xhr.send();
  });
}

export default wikiSearch;