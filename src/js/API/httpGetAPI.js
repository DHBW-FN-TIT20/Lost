
/**
 * This function creates a http get request to the {@param url}
 * @param {String} url - the url for the get request
 * @returns 
 */
function httpGet(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "json";
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

export default httpGet;