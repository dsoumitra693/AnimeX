let pad = (n, z) => {
  z = z || 2;
  return ('00' + n).slice(-z);
}

export const msToTime = (s) => {

  if (s == undefined) return '00:00:00'

  let ms = s % 1000;
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;

  if (hrs == 0) {
    return pad(mins) + ':' + pad(secs)
  }
  return pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
}

export const randomIntFromInterval = (max, min = 0) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const countdown = ( timerId, setCanReqNewOTP, setTimer ) => {
  clearTimeout(timerId)
  let seconds = 59;
  
  function tick() {
    seconds--;
    setTimer(pad(seconds))
    if (seconds > 0) {
      timerId = setTimeout(tick, 1000);
    } else {
      setCanReqNewOTP(true)
    }
  }
  tick();
}