const audio = document.querySelector('audio');
const cardImage = document.querySelector('#card_image');
const play = document.querySelector('#play');
const pause = document.querySelector('#pause');
const next = document.querySelector('#next');
const previous = document.querySelector('#previous');
const soundButton = document.querySelector('#sound');
const muteButton = document.querySelector('#mute');
const progressBarContainer = document.querySelector('.progress_bar_container');
const progressBar = document.querySelector('.progress_bar');
const volumeContainer = document.querySelector('.volume_container');
const volumeBar = document.querySelector('.volume_bar');

let playing = 0;
const images = ['./image/music_1.jpg', './image/music_2.jpg', './image/music_3.jpg'];
const musics = ['./music/music_1.mp3', './music/music_2.mp3', './music/music_3.mp3'];

// initial volume information
let volumeMemory = 0.2;
audio.volume = volumeMemory;
volumeBar.style.width = '20%';

function playMusic() {
    audio.play();
    play.classList.add('hide');
    pause.classList.remove('hide');
}

function pauseMusic() {
    audio.pause();
    pause.classList.add('hide');
    play.classList.remove('hide');
}

function previousMusic() {
    playing--;
    if (playing < 0) playing = musics.length - 1;

    cardImage.src = images[playing];
    audio.src = musics[playing];
    playMusic();
}

function nextMusic() {
    playing++;
    if (playing > musics.length - 1) playing = 0;
    cardImage.src = images[playing];
    audio.src = musics[playing];
    playMusic();
}

// update volume bar and audio volume
function volumeControl(clikedPoint) {
    const width = volumeContainer.clientWidth;
    const clickX = clikedPoint;
    volumeMemory = clickX / width;

    audio.volume = volumeMemory;
    volumeBar.style.width = `${volumeMemory * 100}%`;
}

// play music
play.addEventListener('click', playMusic);

// pause music
pause.addEventListener('click', pauseMusic);

// previous music
previous.addEventListener('click', previousMusic);

// next music
next.addEventListener('click', nextMusic);

// progress bar actions
// update progress bar visually
audio.addEventListener('timeupdate', () => {
    const songDuration = audio.duration;
    const songCurrentTime = audio.currentTime;
    const progressPercent = (songCurrentTime / songDuration) * 100;

    progressBar.style.width = `${progressPercent}%`;
});

// update music time
progressBarContainer.addEventListener('click', (e) => {
    const width = progressBarContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// mute sound
soundButton.addEventListener('click', () => {
    audio.volume = 0;
    soundButton.classList.add('hide');
    muteButton.classList.remove('hide');
});

// unmute sound
muteButton.addEventListener('click', () => {
    audio.volume = volumeMemory;
    muteButton.classList.add('hide');
    soundButton.classList.remove('hide');
});

// volume control using volume bar
volumeContainer.addEventListener('click', (e) => {
    const clickedPoint = e.offsetX;
    volumeControl(clickedPoint);
});

// start next song automatically
audio.addEventListener('ended', () => {
    nextMusic();
});
