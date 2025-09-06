console.log("Welcome to Spotify")
let songIndex = 1;
let audioElement = new Audio('songs1/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let masterSongCurrentTime = document.getElementById('masterSongCurrentTime');
let masterSongDuration = document.getElementById('masterSongDuration');
let songItems = Array.from(document.getElementsByClassName('songItem')); 

let songs = [
    {songName: "Tere Bina", filePath: "songs1/1.mp3", coverPath:"imgs1/img1.jpg"},
    {songName: "Choo lo", filePath: "songs1/2.mp3", coverPath:"imgs1/img2.jpg"},
    {songName: "Be Intehaan", filePath: "songs1/3.mp3", coverPath:"imgs1/img3.jpg"},
    {songName: "Jogi", filePath: "songs1/4.mp3", coverPath:"imgs1/img4.jpg"},
    {songName: "LUNCH", filePath: "songs1/5.mp3", coverPath:"imgs1/img5.jpg"},
    {songName: "The Humma Song", filePath: "songs1/6.mp3", coverPath:"imgs1/img6.jpg"},
    {songName: "Akh Lad Jaave", filePath: "songs1/7.mp3", coverPath:"imgs1/img7.jpg"},
    {songName: "Maula Mere Maula", filePath: "songs1/8.mp3", coverPath:"imgs1/img8.jpg"},
    {songName: "Aaja Piya Tohe Pyaar Doon", filePath: "songs1/9.mp3", coverPath:"imgs1/img9.jpg"},
    {songName: "Bahon Mein Chale Aao", filePath: "songs1/10.mp3", coverPath:"imgs1/img10.jpg"}
]

songItems.forEach((Element,i)=>{
    console.log(Element,i);
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    Element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
        Element.classList.remove('fa-circle-pause');
        Element.classList.add('fa-circle-play');
    })
}

function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return `${mins}:${secs}`;
}

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress; 
    masterSongCurrentTime.innerText = formatTime(audioElement.currentTime);
})

audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length) {
        songIndex = 1;
    } else {
        songIndex += 1;
    }
    audioElement.src = `songs1/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex - 1].songName;

    makeAllPlays();
    const currentPlayButton = document.getElementById(songIndex.toString());
    if (currentPlayButton) {
        currentPlayButton.classList.remove('fa-circle-play');
        currentPlayButton.classList.add('fa-circle-pause');
    }
});

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})

Array.from(document.getElementsByClassName('songItemPlay')).forEach((Element)=>{
    Element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `songs1/${songIndex}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play(); 
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        masterSongName.innerText = songs[songIndex-1].songName;
        audioElement.addEventListener('loadedmetadata', () => {
            masterSongDuration.innerText = formatTime(audioElement.duration);
        });
    })
})

document.getElementById('prev').addEventListener('click',()=>{
    if(songIndex<2){
        songIndex = 10;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs1/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.addEventListener('loadedmetadata', () => {
        masterSongDuration.innerText = formatTime(audioElement.duration);
    });
    // console.log(songIndex);
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>9){
        songIndex = 1;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs1/${songIndex}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play(); 
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    masterSongName.innerText = songs[songIndex-1].songName;
    audioElement.addEventListener('loadedmetadata', () => {
        masterSongDuration.innerText = formatTime(audioElement.duration);
    });
    // console.log(songIndex);
})
