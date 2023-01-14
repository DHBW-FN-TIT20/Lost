// wikiSearch(48.175022701706496, 11.55661010796519, "München").then(r => console.log(r));

export function wikiSearch(lat, lon, city) {
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

function getGeoSearch(lat, lon, callback) {
    runAPI("https://de.wikipedia.org/w/api.php?action=query&origin=*&list=geosearch&gsradius=50&gscoord=" + lat + "|" + lon + "&format=json&gslimit=1").then((res) => {callback(res)}
        , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

function getWikiText(datag, callback) {
    runAPI("https://de.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=5&titles=" + datag + "&explaintext=true&exsectionformat=plain&format=json").then((res) => {callback(res)}
        , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

function getCity(cityg, callback) {
    runAPI("https://de.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrlimit=1&gsrsearch='" + cityg + "'").then((res) => {callback(res)}
        , rejection => console.log("Wikipedia rejected the API-Request with the error: " + rejection));
}

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