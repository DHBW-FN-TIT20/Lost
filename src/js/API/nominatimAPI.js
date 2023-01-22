import httpGet from "./httpGetAPI";

/**
 * This function generates a URL with the given coordinate.
 * This URL will be used to call the nominatim API.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 */
function makeLocationUrl(lat, lon) {
  let url =
    "https://nominatim.openstreetmap.org/reverse?lat=" +
    lat +
    "&lon=" +
    lon +
    "&format=json";
  return url;
}

/**
 * This function calls the {@link makeLocationUrl} method to generate a URL and calls the {@link httpGet} method for a http get request.
 * @param {*} callback - The callback of the http get request
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 */
function getLocationJSON(callback, lat, lon) {
  let url = makeLocationUrl(lat, lon);
  httpGet(url).then(
    (res) => {
      callback(res);
    },
    (rejection) =>
      console.log("nominatim rejected the API-request with error: " + rejection)
  );
}

/**
 * This function generates the url for the Nominatim-API (search) call
 * @param {String} search
 * @returns the url
 */
function makeSearchUrl(search) {
  search =
    "https://nominatim.openstreetmap.org/search?q=" + search + "&format=json&limit=5";
  return search;
}

/**
 * This function calls the {@link makeSearchUrl} method to generate a URL and calls the {@link httpGet} method for a http get request.
 * @param {*} callback - The callback of the http get request
 * @param {String} search - The search arguments
 */
function getSearchJSON(callback, search) {
  let url = makeSearchUrl(search);
  httpGet(url).then(
    (res) => {
      callback(res);
    },
    (rejection) =>
      console.log("nominatim rejected the API-request with error: " + rejection)
  );
}

/**
 * This function calls the {@link getLocationJSON} method to get a requested location (specified by lat and lon),
 * which will be returned as a promise. The promise can only be resolved.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 *
 * @returns The promise, that contains the API Call response (the requested location).
 */
function getLocationInfo(lat, lon) {
  return new Promise((resolve, reject) => {
    getLocationJSON(
      function (location) {
        resolve(location);
      },
      lat, lon
    );
  });
}

/**
 * This function calls the {@link getSearchJSON} method and returns a promise of the API call response.
 * @param {String} search 
 * @returns a promise of the API call response
 */
function getSearchLocation(search) {
  return new Promise((resolve, reject) => {
    getSearchJSON(function (location) {
      resolve({ location, search });
    }, search);
  });
}

export {getLocationInfo, getSearchLocation};
