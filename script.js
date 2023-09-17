console.log("Welcome to Spotify");

let songIndex=0;
let audioElement= new Audio('./songs/1.WEBM');
let masterPlay= document.getElementById("btnMasterPlay");
let progressBar=document.getElementById("myProgressBar");
let dancingGif=document.getElementById("dancingGif");
let songTitle=document.getElementById("songTitle");
let songs=[
    {songName:"Die For You (with Ariana Grande)",filePath:'./songs/1.WEBM',coverPath: './covers/1.jpg'},
    {songName:"Call Out My Name",filePath:'./songs/4.WEBM',coverPath: './covers/2.jpg'},
    {songName:"Blinding Lights",filePath:'./songs/5.WEBM',coverPath: './covers/5.jpg'},
    {songName:"Save Your Tears",filePath:'./songs/3.WEBM',coverPath: './covers/4.jpg'},
    {songName:"Creepin' (with The Weekend & 21 Savage)",filePath:'./songs/2.WEBM',coverPath: './covers/5.jpg'},
]

let songsContainer=document.getElementById("songsContainer");

// audioElement.play().then();

(()=>{
    songs.forEach((val,ind)=>{
        songsContainer.innerHTML+=`<div class="songItem">
    <img src=${val.coverPath} alt="Item">
    <span class="songName">${val.songName}</span>
    <span class="songListPlay">
        <span class="timeStamp">5:34 <i class="fa-regular songItemPlay fa-play-circle "></i></span>
    </span>
    </div>`;
    })
})();
const pauseMusic=()=>{
    audioElement.pause();                        
        masterPlay.classList.remove("fa-solid");     
        masterPlay.classList.remove("fa-pause");     
        masterPlay.classList.add("fa-regular");      
        masterPlay.classList.add("fa-play-circle");  
        dancingGif.style.opacity=0;                
}
const playMusic=()=>{
    if(audioElement.paused||audioElement.currentTime<=0){
       console.log( songs[songIndex].songName + " "+ "is playing");
       songTitle.innerText=songs[songIndex].songName;
       audioElement.src = songs[songIndex].filePath; 
       audioElement.play().then();                   
       masterPlay.classList.remove("fa-regular");    
       masterPlay.classList.remove("fa-play-circle");
       masterPlay.classList.add("fa-solid");         
       masterPlay.classList.add("fa-pause");         
       dancingGif.style.opacity=1;                   
    }else{
    pauseMusic();
    }
}
//Handle Play/Pause Click
masterPlay.addEventListener('click',playMusic);

//handle time update events

audioElement.addEventListener('timeupdate',()=>{
progressBar.value=parseInt((audioElement.currentTime/audioElement.duration)*100);    
});

//handle progresBar change events

progressBar.addEventListener('change',()=>{
    audioElement.currentTime=((progressBar.value/100)*audioElement.duration);
});
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        audioElement.pause();
        element.classList.remove("fa-solid");
        element.classList.remove("fa-pause");
        element.classList.add("fa-regular");
        element.classList.add("fa-play-circle");

    });
}

//songItemPlay handle events

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element,ind)=>{
    element.addEventListener("click",(e)=>{
        if(e.target.classList.contains("fa-pause")){
            pauseMusic();                           

            makeAllPlays();
            
        }else{                                     
            makeAllPlays();
            songIndex=ind;
            playMusic();                             
            e.target.classList.remove("fa-regular");     
            e.target.classList.remove("fa-play-circle");
            e.target.classList.add("fa-solid");         
            e.target.classList.add("fa-pause");         
        }
        
    });
});