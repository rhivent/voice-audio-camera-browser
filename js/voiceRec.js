var stream, recorder, chunks;
var media = {
      tag: 'audio',
      type: 'audio/ogg',
      ext: '.ogg',
      gUM: {audio: true}
    }

function makeLink(){
  var blob = new Blob(chunks, {type: media.type });
    var url = URL.createObjectURL(blob);
    $("#download").attr("href", url);
    $("#audioSource").attr("src", url).show();
    $("#recording_button").hide();
}

//change name of button on click
$("#recording_button").on("click", record_button_click)

//set discard / reset function
document.getElementById("restart").onclick = discard_recording_fn;

var button_counter = 0;
function record_button_click(){
    // console.log(button_counter);
    if(button_counter == 0){
        start_recording_fn();
    }
    if(button_counter == 1){
        stop_recording_fn();
    }
    if(button_counter == 2){
        play_recording_fn();
    }
    button_counter += 1;
}


var start_timer_clock = 0;

function start_recording_fn(){

    chunks=[];
    navigator.mediaDevices.getUserMedia(media.gUM).then(_stream => {
        stream = _stream;
        recorder = new MediaRecorder(stream);
        start_timer_clock = setInterval(setTime, 1000);
        recorder.start();
        recorder.ondataavailable = e => {
            chunks.push(e.data);
            if(recorder.state == 'inactive')  makeLink();
        }
    })

    //change button name
    document.getElementById("recording_button").innerHTML= "Stop Recording";
  }



function stop_recording_fn(){


    recorder.stop();
    //change button name
    document.getElementById("recording_button").innerHTML= "Play";

    //stop timer clock
    clearInterval(start_timer_clock);
    //reset timer to 0 so if they start record again it starts at 0
    totalSeconds = 0;

    //show discard and download buttons when user stops audio record
    document.getElementById("download_restart").classList.remove("hidden");
}

function play_recording_fn(){
    $("#recording_button").off("click").one("click", function () {
        try {
            $("#play").play();
        } catch (e) {
            console.log(e)
        }
    })
    //change button name
    document.getElementById("recording_button").innerHTML= "Stop Playing";
}

function stop_play_recording_fn(){

    $("#recording_button").off("click").one("click", function () {
        try {
            $("#play").pause();
        } catch (e) {
            console.log(e)
        }
    })
    //change button name
    document.getElementById("recording_button").innerHTML= "Reset";
}


function discard_recording_fn(){
    setTimeout(function(){ location.reload(); }, 1000);
}

//clock timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;


function setTime() {
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}