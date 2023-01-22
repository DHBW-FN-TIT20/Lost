/**
 * This function converts a given amount of seconds into the 'hh:mm:ss' format and returns it.
 * @param {number} seconds - The total seconds
 * @returns 
 */
const formatTime = (seconds) => {
  let date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
}

export default formatTime;