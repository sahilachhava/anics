const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-container video');

const controlsContainer = document.querySelector('.video-container .controls-container');

const playPauseButton = document.querySelector('.video-container .controls button.play-pause');
const rewindButton = document.querySelector('.video-container .controls button.rewind');
const fastForwardButton = document.querySelector('.video-container .controls button.fast-forward');
const volumeButton = document.querySelector('.video-container .controls button.volume');
const fullScreenButton = document.querySelector('.video-container .controls button.full-screen');
const playButton = playPauseButton.querySelector('.playing');
const pauseButton = playPauseButton.querySelector('.paused');
const fullVolumeButton = volumeButton.querySelector('.full-volume');
const mutedButton = volumeButton.querySelector('.muted');
const maximizeButton = fullScreenButton.querySelector('.maximize');
const minimizeButton = fullScreenButton.querySelector('.minimize');

const progressBar = document.querySelector('.video-container .progress-controls .progress-bar');
const watchedBar = document.querySelector('.video-container .progress-controls .progress-bar .watched-bar');
const timeLeft = document.querySelector('.video-container .progress-controls .time-remaining');

let controlsTimeout;
controlsContainer.style.opacity = '0';
watchedBar.style.width = '0px';
pauseButton.style.display = 'none';
minimizeButton.style.display = 'none';

const displayControls = () => {
  controlsContainer.style.opacity = '1';
  document.body.style.cursor = 'initial';
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  controlsTimeout = setTimeout(() => {
    controlsContainer.style.opacity = '0';
    document.body.style.cursor = 'none';
  }, 5000);
};

const playPause = () => {
  if (video.paused) {
    video.play();
    playButton.style.display = 'none';
    pauseButton.style.display = '';
  } else {
    video.pause();
    playButton.style.display = '';
    pauseButton.style.display = 'none';
  }
};

const toggleMute = () => {
  video.muted = !video.muted;
  if (video.muted) {
    fullVolumeButton.style.display = 'none';
    mutedButton.style.display = '';
  } else {
    fullVolumeButton.style.display = '';
    mutedButton.style.display = 'none';
  }
};

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    $('.back-button').css('bottom', '700px');
    $('.videoLoader').css('bottom', '45%');
  } else {
    $('.back-button').css('bottom', '650px');
    $('.videoLoader').css('bottom', '47%');
    document.exitFullscreen();
  }
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    maximizeButton.style.display = '';
    minimizeButton.style.display = 'none';
  } else {
    maximizeButton.style.display = 'none';
    minimizeButton.style.display = '';
  }
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'Space') {
        if (event.target.type === 'submit') {
            event.target.blur();
            event.preventDefault();
        }
        playPause(); 
        displayControls();
    }
    if (event.code === 'ArrowRight') {
        fastForwardButton.click();
    }
    if (event.code === 'ArrowLeft') {
        rewindButton.click();
    }
    if (event.code === 'ArrowUp') {
        if(video.volume != 1 && video.volume > 0.7){
            video.volume = 1;
            $('#volIcon').attr('src', 'img/icons/volumeFull.png');
        }else if(video.volume < 0.8){
            video.volume += 0.2;
            $('#volIcon').attr('src', 'img/icons/volumeLow.png');
            fullVolumeButton.style.display = '';
            mutedButton.style.display = 'none';
        } 
        $('.volumeChange').css('display', 'block');
        setTimeout(()=>{
          $('.volumeChange').css('display', 'none');
        }, 150);
    }
    if (event.code === 'ArrowDown') {
        if(video.volume != 0 && video.volume < 0.3){
            video.volume = 0.0;
            fullVolumeButton.style.display = 'none';
            mutedButton.style.display = '';
            $('#volIcon').attr('src', 'img/icons/mute.png');
        }else if(video.volume > 0.2){
            video.volume -= 0.2;
            $('#volIcon').attr('src', 'img/icons/volumeLow.png');
        }
        $('.volumeChange').css('display', 'block');
        setTimeout(()=>{
          $('.volumeChange').css('display', 'none');
        }, 150);
    }
    if (event.code === 'KeyM') {
        toggleMute();
    }
    if (event.code === 'KeyF') {
        toggleFullScreen();
    }
});

video.addEventListener('click', () => {
    playPause();
});

document.addEventListener('mousemove', () => {
  displayControls();
});

video.addEventListener('timeupdate', () => {
  watchedBar.style.width = ((video.currentTime / video.duration) * 100) + '%';
  const totalSecondsRemaining = video.duration - video.currentTime;
  const time = new Date(null);
  time.setUTCSeconds(totalSecondsRemaining);
  let hours = null;

  if(totalSecondsRemaining >= 3600) {
    hours = (time.getUTCHours().toString()).padStart('2', '0');
  }
  
  let minutes = (time.getUTCMinutes().toString()).padStart('2', '0');
  let seconds = (time.getUTCSeconds().toString()).padStart('2', '0');

  if(video.currentTime > 0){
    timeLeft.textContent = `${hours ? hours : '00'}:${minutes}:${seconds}`;
  }
  if(video.networkState === video.NETWORK_LOADING){
    $('.videoLoader').css('display', 'block');
  }else{
    $('.videoLoader').css('display', 'none');
  }
});

progressBar.addEventListener('click', (event) => {
  const pos = (event.pageX  - (progressBar.offsetLeft + progressBar.offsetParent.offsetLeft)) / progressBar.offsetWidth;
  video.currentTime = pos * video.duration;
});

playPauseButton.addEventListener('click', playPause);

rewindButton.addEventListener('click', () => {
  video.currentTime -= 10;
});

fastForwardButton.addEventListener('click', () => {
  video.currentTime += 10;
});

volumeButton.addEventListener('click', toggleMute);
fullScreenButton.addEventListener('click', toggleFullScreen);