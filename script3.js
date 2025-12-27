console.log("Welcome to Spotify")
let songIndex = 1;
let audioElement = new Audio('songs3/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let masterSongName = document.getElementById('masterSongName');
let masterSongCurrentTime = document.getElementById('masterSongCurrentTime');
let masterSongDuration = document.getElementById('masterSongDuration');
let songItems = Array.from(document.getElementsByClassName('songItem')); 

let songs = [
    {songName: "Agar Tum Saath Ho", filePath: "songs3/1.mp3", coverPath:"songs3/note_heart.jpeg"},
    {songName: "Tum Se Hi", filePath: "songs3/2.mp3", coverPath:"songs3/note_heart.jpeg"},
    {songName: "Tere Bina Zindagi Se Koi", filePath: "songs3/3.mp3", coverPath:"songs3/note_heart.jpeg"},
    // {songName: "Tose Naina", filePath: "songs3/4.mp3", coverPath:"songs3/note.jpg"},
    // {songName: "Qayde Se", filePath: "songs3/5.mp3", coverPath:"songs3/note.jpg"},
    // {songName: "Jugraafiya", filePath: "songs3/6.mp3", coverPath:"songs3/note.jpg"},
    // {songName: "Obhodro Prem", filePath: "songs3/7.mp3", coverPath:"songs3/note.jpg"},
    // {songName: "Behka", filePath: "songs3/8.mp3", coverPath:"songs3/note.jpg"},
    // {songName: "Aaj Dil Gustakh Hai", filePath: "songs3/9.mp3", coverPath:"songs3/note.jpg"},
    // {songName: "Ye Ishq Hai", filePath: "songs3/10.mp3", coverPath:"songs3/note.jpg"}
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
    audioElement.src = `songs3/${songIndex}.mp3`;
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
        audioElement.src = `songs3/${songIndex}.mp3`;
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
    audioElement.src = `songs3/${songIndex}.mp3`;
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
    audioElement.src = `songs3/${songIndex}.mp3`;
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
