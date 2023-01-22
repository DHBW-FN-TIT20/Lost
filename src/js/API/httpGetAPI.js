
/**
 * This function creates a http get request to the {@param url}
 * The request gets sent via. XMLHttpRequest (xhr.send()).
 * If the request is asynchronous, this method returns as soon as the request is sent.
 * The promise is resolved / rejected by the XHR API.
 * @param {String} url - the url for the get request
 * @returns - A promise, which contains the answer to the http request. 
 *            If XHR-Api returns status 200 (success) the promise is resolved, otherwise it will be rejected.
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
