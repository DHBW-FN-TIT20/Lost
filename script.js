const send = document.getElementById('btnSend');
const city = document.getElementById('stadt');
const lat = document.getElementById('lat');
const lon = document.getElementById('lon');
const xhr = new XMLHttpRequest();
const finishEvent = new Event("finished");
let article_title, article_text;

send.addEventListener("click", function () {
    xhr.addEventListener("finished", () => {
        console.log(article_title + "\n" + article_text);
    });
    wikiSearch(lat.value, lon.value, city.value);
    });

function wikiSearch(lat, lon, city) {
    getGeoSearch(lat, lon, getWikiText, city);
}

function getGeoSearch(lat, lon, callback, city) {
    let url = "https://de.wikipedia.org/w/api.php?action=query&origin=*&list=geosearch&gsradius=50&gscoord=" + lat + "|" + lon + "&format=json&gslimit=1";
    console.log("test");
    runAPI(url).then(function (r)  {
        // Parse the request into JSON
        let data = JSON.parse(r.target.response);
        if ((data.query.geosearch).length !== 1) {
            getCity(city, getWikiText);
        } else {
            article_title = data.query.geosearch[0].title;
            callback(data.query.geosearch[0].title);
        }
    });
    /*xhr.onload = function() {
    }*/
}

function getWikiText(datag) {
    let url = "https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=5&titles=" + datag + "&explaintext=true&exsectionformat=plain&format=json";
    runAPI(url).then(r => {
        // Parse the request into JSON
        let data = JSON.parse(r.target.response);

        // Log the data object
        article_text = data.query.pages[Object.keys(data.query.pages)[0]].extract;
        finished();
    });
    /*xhr.onload = function() {

    }*/
}

function getCity(cityg, callback) {
    let url = "https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrlimit=1&gsrsearch='" + cityg + "'";
    runAPI(url).then(r => {
        // Parse the request into JSON
        let data = JSON.parse(r.target.response);

        callback(data.query.pages[Object.keys(data.query.pages)[0]].title);
        article_title = data.query.pages[Object.keys(data.query.pages)[0]].title;
    });
    /*xhr.onload = function() {

    }*/
}

function runAPI(url) {
    return new Promise(function (resolve, reject) {
        xhr.open('GET', url, true);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}

function finished() {
    xhr.dispatchEvent(finishEvent);
}