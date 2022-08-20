
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}


function runEveryDay(time, triggerThis_p)
{
  alert("test");
  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);

  // create a Date object at the desired timepoint
  const startTime = new Date(); 
  startTime.setHours(hour, minute);
  const now = new Date();

  // increase timepoint by 24 hours if in the past
  if (startTime.getTime() < now.getTime()) {
    startTime.setHours(startTime.getHours() + 24);
  }

  // get the interval in ms from now to the timepoint when to trigger the alarm
  const firstTriggerAfterMs = startTime.getTime() - now.getTime();
  console.log("First time to launch: " + convertMsToTime(firstTriggerAfterMs + now.getTime()));

  // trigger the function triggerThis() at the timepoint
  // create setInterval when the timepoint is reached to trigger it every day at this timepoint
  const day_in_ms = 24 * 60 * 60 * 1000;
  setTimeout(function() {
    const nowTimeout = new Date();
    triggerThis_p();
    console.log("Next time to launch: " + convertMsToTime(day_in_ms + nowTimeout.getTime()));

    setInterval(function() { 
      const nowInterval = new Date();
      triggerThis_p();
      console.log("Next time to launch: " + convertMsToTime(day_in_ms + nowInterval.getTime()));
    }
    , day_in_ms);
  }, firstTriggerAfterMs);
}


triggerThis = function() 
{ 
  triggerInterval = new Date();
  console.log("this was triggered. " + convertMsToTime(triggerInterval.getTime())); 
}


/* main */

const time = '16:52';
runEveryDay(time, triggerThis);
