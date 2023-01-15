 /**
   * This function generates a URL with the given coordinate.
   * This URL will be used to call the nominatim API.
   * @param {Float} lat - The latitude of the coordinate
   * @param {Float} lon - The longitude of the coordinate
   */
function makeUrl(lat, lon){
  let url = "https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + lon + "&format=json";
  return url;
}

/**
 * This function calls the {@link makeUrl} Method to generate a URL and sends a HTTP GET request.
 * @param {*} callback - The callback of the HTTP GET request
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 */
function getJSON(callback, lat, lon) {
  let url = makeUrl(lat, lon);

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

/**
 * This function calls the {@link getJSON} Method. It returns the @param location object, 
 * if the request was successfull. Else the @param err (error) will be returned.
 * @param {Float} lat - The latitude of the coordinate
 * @param {Float} lon - The longitude of the coordinate
 * 
 * @return {JSON} The location json object of the nearest location.
 */
function getLocationInfo(lat, lon){
  getJSON(
    function(err, location) {
      if (err !== null) {
        alert('Something went wrong: ' + err);
        return err;
      } else {
        console.log(location);
        return location;
      }
    }, lat, lon);
}

export default getLocationInfo;
