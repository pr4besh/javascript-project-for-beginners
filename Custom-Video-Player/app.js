const video = document.querySelector("#video");
const play = document.querySelector("#play");
const stop = document.querySelector("#stop");
const timestamp = document.querySelector("#timestamp");
const progress = document.querySelector("#progress");

// Toggle between Play and Pause
const toggleVideoStatus = () => {
   if (video.paused) {
      video.play();
   } else {
      video.pause();
   }
};

// Update Play and Pause Icon
const updatePlayIcon = () => {
   if (video.paused) {
      play.innerHTML =
         '<img src="./img/play.png" alt="Play" class="play-btn" />';
   } else {
      play.innerHTML =
         '<img src="./img/pause.png" alt="Pause" class="pause-btn" />';
   }
};

const updateProgress = () => {
   progress.value = (video.currentTime / video.duration) * 100;

   // get minutes
   let minutes = Math.floor(video.currentTime / 60);
   if (minutes < 10) {
      minutes = "0" + String(minutes);
   }

   // get seconds
   let seconds = Math.floor(video.currentTime % 60);
   if (seconds < 10) {
      seconds = "0" + String(seconds);
   }

   timestamp.innerHTML = `${minutes}:${seconds}`;
};

// Set video time to progress
const setVideoProgress = () => {
   video.currentTime = (+progress.value * video.duration) / 100;
};

const stopVideo = () => {
   video.currentTime = 0;
   video.pause();
};

// Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);

stop.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);
