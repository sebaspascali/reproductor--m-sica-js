const songList = [
    {
        title: "Bad love",
        file: "BadLove.mp3",
        cover: "img3.png"
    },
    {
        title: "Minimal",
        file: "Minimal.mp3",
        cover: "img2.png"
    },
    {
        title: "Jamrock",
        file: "Jamrock.mp3",
        cover: "img1.png"
    },
]

// Canción actual
let actualSong = null;


// Capturar elementos del DOM
const songs = document.querySelector("#songs");
const audio = document.querySelector("#audio");
const cover = document.querySelector("#cover");
const title = document.querySelector("#title");
const play = document.querySelector("#play");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const progress = document.querySelector ("#progress");
const progresscontainer = document.querySelector("#progress-container");
progresscontainer.addEventListener("click", setProgress);
// Escuchar el elemento AUDIO
audio.addEventListener("timeupdate", updateProgress)

// Escuchar clicks en los controles
play.addEventListener("click", () => {
    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong ())
prev.addEventListener( "click", () => prevSong ())

// Cargar traks y mostrar el listado
function loadSongs () {
  songList.forEach((song, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = song.title;
    link.href = "#";
    link.addEventListener("click", () => loadSong(index))
    li.appendChild(link);
    songs.appendChild(li);
  })

}

// Cargar canción seleccionada
function loadSong(songIndex) {
    if (songIndex !== actualSong) {
        changeActiveClass(actualSong, songIndex)
        actualSong = songIndex
        audio.src = "./audio/" + songList[songIndex].file
       audio.play();
        playSong();
        changeCover(songIndex)
        chageSongTitle(songIndex)
        //changeActiveClass();
    }
}

// Actualizar barra de progreso de la canción
function updateProgress(event) {
    //Total y el actual
    const {duration, currentTime} = event.srcElement
    const percent = ( currentTime / duration) * 100
    progress.style.width = percent + "%" 
}

// Hacer la barra de progreso clicable
function  setProgress(event) {
    const totalWidth = this.offsetWidth;
    const progressWidth = event.offsetX;
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current 
}

// Actualizar controles
function updateControls() {
    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add ("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove ("fa-play")
    }
}

// Reproducir canción
function playSong() {
  if (actualSong !== null) {
    audio.play();
    updateControls()
  }
}


// Pausar Canción
function pauseSong() {
    audio.pause();
    updateControls()
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex) {
    const links = document.querySelectorAll ("a");
    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

// Cambiar el cover de la canción
function changeCover(songIndex) {
cover.src = "./img/" + songList[songIndex].cover
}


// Cambiar el titulo de la canción
function chageSongTitle(songIndex) {
    title.innerText = songList[songIndex].title;
}

// Anterior canción
function prevSong() {
   if (actualSong > 0) {
    loadSong(actualSong -1)
   } else {
    loadSong(songList.length -1)
   }
}

// Siguiente canción
function nextSong() {
    if (actualSong < songList.length -1) {
        loadSong(actualSong +1)
    } else {
        loadSong(0)
    }
}

// Iniciar siguiente canción cuando se acaba la actual
audio.addEventListener("ended", () => {
    nextSong();
})

// GO! 
loadSongs();