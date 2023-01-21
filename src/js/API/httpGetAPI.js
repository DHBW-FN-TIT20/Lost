
/**
 * This function performs a get request with the specified URL.
 * It solves the promise with the correct response. It rejects on a failed request.
 * @param {string} url - The URL which will be used for the API request
 * @returns - A promise which contains the executed API request. A promise can be solved or rejected.
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