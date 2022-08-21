
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


function f_work_task()
{
  var is_exist_buy_new = 0;
  var is_exist_prihvati = 0;
  var is_exist_odrediti = 0;
  var is_exist_loadingword = 0;

  var interval_buy_now = setInterval(function () 
  {
    var class_buy_new = $('.buynow')[0];
    if (class_buy_new)
    {
      // console.log("IMA BUY NOW")
      is_exist_buy_new = 1;
    } else {
      // console.log("NEMA - BUY NOW")
      is_exist_buy_new = 0;
    }
  }, 1000);  

  var interval_prihvati = setInterval(function () 
  {
    var class_prihvati = $('.btn.queding')[0];
    if (class_prihvati)
    {
      console.log(" >>> IMA  PRIHVATI")
      is_exist_prihvati = 1;
    } else {
      console.log(">>> NEMA - PRIHVATI")
      is_exist_prihvati = 0;
    }
  }, 1000);

  var interval_odrediti = setInterval(function () 
  {
    var class_odrediti = $('.overbtn')[0];
    if (class_odrediti)
    {
      // console.log("IMA ODREDITI")
      is_exist_odrediti = 1;
    } else {
      is_exist_odrediti = 0;
      // console.log("NEMA - ODREDITI")
    }
  }, 1000);


  // klasa koja se pojavljuje izmedju klikova
  var interval_loadingword = setInterval(function () 
  {
    var class_loadingword = $('.loadingword')[0];
    if (class_loadingword)
    {
      is_exist_loadingword = 1;
      // console.log("IMA loadingword")
    } else {
      is_exist_loadingword = 0;
      // console.log("NEMA - loadingword")
    }
    console.log("----------------")

  }, 1000);

  // 0 - hmm?
  // 1 - treba da klikne buy new
  // 2 - treba da klikne na prihvati
  // 3 - treba da klikne na odrediti
  var flag_state = 0;
  var interval_clicking = setInterval(function () 
  {

    var class_buy_new = $('.buynow')[0];
    var class_prihvati = $('.btn.queding');
    var class_odrediti = $('.overbtn');
    var class_loadingword = $('.loadingword')[0];

    // TOOD: flag_state == 1,2,3 get stuck :(

    if (flag_state == 0 && is_exist_buy_new == 1 && is_exist_prihvati == 0 && is_exist_odrediti == 0 && is_exist_loadingword == 0)
    {
      flag_state = 0;
      class_buy_new.click();
    }

    if (flag_state == 1 && is_exist_buy_new == 1 && is_exist_prihvati == 1 && is_exist_odrediti == 0 && is_exist_loadingword == 0)
    {
      flag_state = 0;
      class_buy_new.click();
    }

    if (flag_state == 2 && is_exist_buy_new == 1 && is_exist_prihvati == 0 && is_exist_odrediti == 1 && is_exist_loadingword == 0)
    {
      flag_state = 3;
      class_odrediti.click();
    }

    console.log("flag_state="+flag_state);
    is_exist_buy_new==1?console.log("IMA BUY NEW"):console.log("NEMA - BUY NEW");
    is_exist_prihvati==1?console.log("IMA PRIHATI"):console.log("NEMA - PRIHVATI");

    is_exist_odrediti==1?console.log("IMA ODREDI"):console.log("NEMA - ODREDI");
    is_exist_loadingword==1?console.log("IMA LOADINGWORD"):console.log("NEMA - LOADINGWORD");

  }, 1000);


  var interval_finish = setInterval(function () 
  {
    var class_finish = $('.uni-fade-leave-active.uni-fade-leave-to')[0];
    if (class_finish)
    {
      console.log("IMA FINISH")
      clearInterval(interval_buy_now);
      clearInterval(interval_prihvati);
      clearInterval(interval_odrediti);
      clearInterval(interval_loadingword);
      clearInterval(interval_clicking);
      clearInterval(interval_finish);
    }
  }, 50);


}


triggerThis = function() 
{ 
  triggerInterval = new Date();
  console.log("this was triggered. " + convertMsToTime(triggerInterval.getTime())); 
  f_work_task();
}


function convertMsToTime_pomoc(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  return `${padTo2Digits(hours+2)}:${padTo2Digits(minutes)}`;
}

/* main */
// const trenutno =  new Date();
// console.log("trenutno " + trenutno)
// console.log("aa " + convertMsToTime_pomoc(trenutno.getTime()))

// const time = convertMsToTime_pomoc(trenutno.getTime());
const time = '10:33'; // Actually: 00:45
// console.log("time "+time)
runEveryDay(time, triggerThis);


