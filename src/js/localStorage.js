/**
 * This funcion stores the history @param data with a @param key in the local storage.
 * @param {String} data - one new history data set
 */
function storeHistory(data) {
  var actualData = JSON.parse(localStorage.getItem("history"));
  if (actualData) {
    if(actualData.length > 20) actualData.splice(0,1);
    actualData.push(data);
    localStorage.setItem("history", JSON.stringify(actualData));
  } else {
    var array = [data];
    localStorage.setItem("history", JSON.stringify(array));
    console.log(data + " added");
  }
}

/**
 * Returns the array of the history elements, which are stored in the local storage
 * @returns the array of the history elements
 */
function getHistory() {
  return JSON.parse(localStorage.getItem("history"));
}

/**
 * This funcion stores the @param data of the favorites with a @param key in the local storage.
 * @param {String} data - one new favorite data set
 */
function storeFavorite(data) {
  var actualData = JSON.parse(localStorage.getItem("favorite"));
  if (actualData) {
    actualData.push(data);
    localStorage.setItem("favorite", JSON.stringify(actualData));
  } else {
    var array = [data];
    localStorage.setItem("favorite", JSON.stringify(array));
    console.log(data + " added");
  }
}

/**
 * Returns the array of the favorite elements, which are stored in the local storage
 * @returns the array of the favorite elements
 */
function getFavorite() {
  return JSON.parse(localStorage.getItem("favorite"));
}

/**
 * This function removes one element of the favorite local storage array.
 * @param {Integer} index - Index of the item that will be removed
 */
function removeFavoriteItem(index) {
  var actualData = JSON.parse(localStorage.getItem("favorite"));
  if (actualData) {
    actualData.splice(index, 1);
    localStorage.setItem("favorite", JSON.stringify(actualData));
  } else {
    console.log("nothing to delete");
  }
  
}

/**
 * This function stores the last user location 
 * @param {String} data - location data
 */
function setLastPosition(data){
  var array = data;
  localStorage.setItem("lastLocation", JSON.stringify(array));
}

/**
 * Returns the last stored user location 
 */
function getLastPosition(){
  return JSON.parse(localStorage.getItem("lastLocation"));
}

function resetLastPosition(){
  localStorage.setItem("lastLocation", null);
}

/**
 * This function clears the whole localStorage
 */
function removeAllItems() {
  localStorage.clear();
}

export {
  storeHistory,
  getHistory,
  storeFavorite,
  getFavorite,
  removeFavoriteItem,
  removeAllItems,
  setLastPosition,
  getLastPosition,
  resetLastPosition
};
