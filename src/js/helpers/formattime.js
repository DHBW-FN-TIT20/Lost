/**
 * This function returns the specified seconds into 'hh:mm:ss' format.
 * @param {number} seconds - The total seconds
 * @returns 
 */
const formatTime = (seconds) => {
  let date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
}

export default formatTime;