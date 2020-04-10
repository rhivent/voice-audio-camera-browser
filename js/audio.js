var playBtn = document.getElementById('play');
var stopBtn = document.getElementById('stop');

var playSound = function() {
  audio.play();
};

playBtn.addEventListener('click', playSound, false);
stopBtn.addEventListener('click', function(){audio.pause()}, false);