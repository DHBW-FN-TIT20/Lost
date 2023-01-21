const formatTime = (seconds) => {
  let date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().slice(11, 19);
}

export default formatTime;