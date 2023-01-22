import httpGet from "./httpGetAPI";

/**
 * This function returns the corresponding Wikipedia article to the given position.
 * First it tries to find more info about the given coordinates, if it doesn't find a matching article for the given coordinates,
 * it looks for an article about the given city.
 * The promise is solved when both the title and the text of an article are available.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 * @param {string} city - The city name in which the {@link lat}/{@link lng} is located
 * @returns A Promise which contains the API request. The promise can only be resolved since possible errors have already been prevented at the API call level.
 */
function wikiSearch(lat, lon, city) {
  return new Promise((resolve) => {
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
 * This function starts a wikipedia API request, using the specified coordinates.
 * It builds the required URL with the specified coordinates, calls the {@link httpGet} and executes the callback function, if successful.
 * The callback function is given the introduction, returned by the Wikipedia API.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 * @param {function} callback - The action which gets called as soon as the response is ready.
 */
function getGeoSearch(lat, lon, callback) {
  httpGet("https://de.wikipedia.org/w/api.php?action=query&origin=*&list=geosearch&gsradius=75&gscoord=" + lat + "|" + lon + "&format=json&gslimit=1").then((res) => { callback(res) }
    , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

/**
 * This function starts a wikipedia API request to search for an introduction to an article.
 * It builds the required url with the given title of the article, calls the {@link httpGet} and executes the callback function after a success.
 * The callback function is given the introduction, returned by the Wikipedia API.
 * @param {string} datag - The title of the article
 * @param {function} callback - The function which gets called as soon as the response is ready
 */
function getWikiText(datag, callback) {
  httpGet("https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=5&titles=" + datag + "&explaintext=true&exsectionformat=plain&format=json").then((res) => { callback(res) }
    , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

/**
 * This function creates a wikipedia API request to search for articles about the specified city.
 * The function builds the required url with the given city, calls the {@link httpGet} and executes the callback function if successful.
 * The callback function is given the available articles.
 * @param {string} cityg - The name of the city
 * @param {function} callback - The action which gets called as soon as the response is ready.
 */
function getCity(cityg, callback) {
  httpGet("https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrlimit=1&gsrsearch='" + cityg + "'").then((res) => { callback(res) }
    , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

export default wikiSearch;