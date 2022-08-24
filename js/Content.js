
function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24 +2; // Because of diferent timezone (2h diference). Use only for optimal print

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds,
  )}`;
}


function getTodayDate()
{
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + '/' + dd + '/' + yyyy;
  return today;
}

function getTomorrowDate()
{
  var currentDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var day = currentDate.getDate()
  var month = currentDate.getMonth() + 1
  var year = currentDate.getFullYear()
  var tomorrow = day + "/" + month + "/" + year
  return tomorrow;
}

var day_of_execute = 0;
function runEveryDay(time, triggerThis_p)
{
  const hour = Number(time.split(':')[0]);
  const minute = Number(time.split(':')[1]);

  // create a Date object at the desired timepoint
  const startTime = new Date(); 
  startTime.setHours(hour, minute);
  const now = new Date();

  var day_of_execute = getTodayDate();

  // increase timepoint by 24 hours if in the past
  if (startTime.getTime() < now.getTime()) {
    startTime.setHours(startTime.getHours() + 24);
    day_of_execute = getTomorrowDate();
  }

  // get the interval in ms from now to the timepoint when to trigger the alarm
  const firstTriggerAfterMs = startTime.getTime() - now.getTime();
  console.log("First time to launch: " + convertMsToTime(firstTriggerAfterMs + now.getTime()) + " " + day_of_execute );
  $('#label1').text("First time to launch: " + convertMsToTime(firstTriggerAfterMs + now.getTime()) + " " + day_of_execute );


  // trigger the function triggerThis() at the timepoint
  // create setInterval when the timepoint is reached to trigger it every day at this timepoint
  const day_in_ms = 24 * 60 * 60 * 1000;
  setTimeout(function() {
    const nowTimeout = new Date();
    triggerThis_p();
    console.log("Next time to launch: " + convertMsToTime(day_in_ms + nowTimeout.getTime()));
    $('#label1').text("Next time to launch: " + convertMsToTime(day_in_ms + nowTimeout.getTime()) + " " + getTomorrowDate() );
    setInterval(function() { 
      const nowInterval = new Date();
      triggerThis_p();
      console.log("Next time to launch: " + convertMsToTime(day_in_ms + nowInterval.getTime()));
      $('#label1').text("Next time to launch: " + convertMsToTime(day_in_ms + nowTimeout.getTime()) + " " + getTomorrowDate() );
    }
    , day_in_ms);
  }, firstTriggerAfterMs);
}


function f_work_task()
{

  // Must be removed
  $(".buynow.add").remove();
  // $(".blackwra").remove();
  // $(".card1").remove();
  // $(".card2").remove();
  // $(".datas").remove();
  // $(".shouru").remove();
  // $(".srhead").remove();


  // $(".uni-scroll-view").remove();

  var is_exist_buy_new = 0;
  var is_exist_prihvati = 0;
  var is_exist_odrediti = 0;
  var is_exist_loadingword = 0;

  var interval_buy_now = setInterval(function () 
  {
    var class_buy_new = $('.buynow');
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
    var class_prihvati = $('.btn.queding');
    if (class_prihvati)
    {
      if (class_prihvati.is(":visible") == true)
      {
        // console.log(" >>> IMA  PRIHVATI")
        is_exist_prihvati = 1;
      } else {
      // console.log(">>> NEMA - PRIHVATI")
      is_exist_prihvati = 0;
      }
    } 
  }, 1000);

  var interval_odrediti = setInterval(function () 
  {
    var class_odrediti = $('.overbtn');
    if (class_odrediti)
    {
      if (class_odrediti.is(":visible") == true)
      {
        // console.log(" >>> IMA ODREDI")
        is_exist_odrediti = 1;
      } else {
        // console.log(">>> NEMA - ODREDI")
        is_exist_odrediti = 0;
      }
    }
  }, 1000);


  // klasa koja se pojavljuje izmedju klikova
  var interval_loadingword = setInterval(function () 
  {
    var class_loadingword = $('.loadingword');
    if (class_loadingword)
    {
      if (class_loadingword.is(":visible") == true)
      {
        // console.log(" >>> IMA loadingword")
        is_exist_loadingword = 1;
      } else {
        // console.log(">>> NEMA - loadingword")
        is_exist_loadingword = 0;
      }
    }
  }, 1000);


  var flag_state = 0;
  var flag_is_changed = 0;
  var num_task_finished = 0;
  var interval_clicking = setInterval(function () 
  {

    var class_buy_new = $('.buynow')[0];
    var class_prihvati = $('.btn.queding')[0];
    var class_odrediti = $('.overbtn')[0];
    var class_loadingword = $('.loadingword')[0];

    // TOOD: flag_state == 1,2,3 get stuck :(

    flag_is_changed = 0;

    if (flag_state == 0 || flag_state == 3 && is_exist_buy_new == 1 && is_exist_prihvati == 0 && is_exist_odrediti == 0 && is_exist_loadingword == 0)
    {
      flag_state = 1;
      class_buy_new.click();
      flag_is_changed = 1;
    }

    if (flag_state == 1 && is_exist_buy_new == 1 && is_exist_prihvati == 1 && is_exist_odrediti == 0 && is_exist_loadingword == 0)
    {
      flag_state = 2;
      class_prihvati.click();
      flag_is_changed = 1;
    }

    if (flag_state == 2 && is_exist_buy_new == 1 && is_exist_prihvati == 0 && is_exist_odrediti == 1 && is_exist_loadingword == 0)
    {
      flag_state = 3;
      class_odrediti.click();
      flag_is_changed = 1;
      num_task_finished = num_task_finished + 1;
      $('#label2').text("Task finished: " + num_task_finished);
    }

    if (flag_is_changed == 1)
    {
      console.log("flag_state="+flag_state);
      is_exist_buy_new==1?console.log("IMA BUY NEW"):console.log("NEMA - BUY NEW");
      is_exist_prihvati==1?console.log("IMA PRIHATI"):console.log("NEMA - PRIHVATI");
      is_exist_odrediti==1?console.log("IMA ODREDI"):console.log("NEMA - ODREDI");
      is_exist_loadingword==1?console.log("IMA LOADINGWORD"):console.log("NEMA - LOADINGWORD");
      console.log("----------------");
    }
  }, 1000);


  var interval_finish = setInterval(function () 
  {
    var class_finish = $('.uni-fade-leave-active.uni-fade-leave-to')[0];
    if (class_finish)
    {
      console.log("ALL TASKS FINISHED FOR TODAY!")
      $('#label2').text("All tasks finished for today.");
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


function kure_append_menu() {
    
  if ($('#kure_menu').length == 1) {
      return;
  }
  
  var kure_menu =`<div class="kure_menu" id="kure_menu">
    <div class="button" id="button1">Start Now</div>
    <div class="label" id="label1">Text for any information</div>
    <div class="label" id="label2">Task finished: 0</div>
  </div>`;
  $('body').append(kure_menu);

  $("#button1").click(function () {
    f_work_task();
  });

};

function test()
{
  console.log("LOG FROM TEST FUNCTION")
}

/* main */
const time = '02:15'; 
kure_append_menu();
runEveryDay(time, triggerThis);
// runEveryDay(time, test);



