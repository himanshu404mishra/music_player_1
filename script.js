let arr = [
  {
    songName: "Jale 2",
    url: "./songs/Jale 2.mp3",
    img: "./images/jale.jpg",
  },
  {
    songName: "Pehle Bhi Main",
    url: "./songs/Pehle Bhi Main.mp3",
    img: "./images/animal.jpg",
  },
  {
    songName: "Ram Siya Ram",
    url: "./songs/Ram Siya Ram.mp3",
    img: "./images/ram.jpg",
  },
  {
    songName: "Arjan Vaily Ne",
    url: "./songs/Arjan Vailly Ne.mp3",
    img: "./images/animal.jpg",
  },
];

let audio = new Audio();
let allsongs = document.querySelector("#all-songs");
let poster = document.getElementById("left");
let play = document.getElementById("play");
let backward = document.getElementById("backward");
let forward = document.getElementById("forward");

let selectedSong = 0;

function main() {
  let clutter = "";

  let dur = 0;
  arr.forEach((songs, index) => {
    clutter += `
        <div class="song-card" id="${index}">
    <div class="part1">
        <img src="${songs.img}" alt="">
        <h2>${songs.songName}</h2>
    </div>
    <h6 class="duration" id="${++dur}"></h6>
</div>
    `;
  });

  audio.src = arr[selectedSong].url;
  allsongs.innerHTML = clutter;
  poster.style.backgroundImage = `url("${arr[selectedSong].img}")`;

  document.querySelectorAll(".duration").forEach((e) => {
    let tempAudio = new Audio();
    tempAudio.src = arr[parseInt(e.id) - 1].url;
    tempAudio.addEventListener("loadedmetadata", function () {
        e.textContent = formatDuration(tempAudio.duration);
        function formatDuration(duration) {
          // Convert duration to a more readable format (optional)
          let minutes = Math.floor(duration / 60);
          let seconds = Math.floor(duration % 60);
          return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    });
    
});
}
main();

allsongs.addEventListener("click", function (e) {
  selectedSong = e.target.id;
  main();
  play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
  flag = 1;
  audio.play();
});

let flag = 0;

play.addEventListener("click", function () {
  if (flag == 0) {
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
    main();
    audio.play();
    flag = 1;
  } else {
    play.innerHTML = `<i class="ri-play-fill"></i>`;
    audio.pause();
    flag = 0;
  }
});

forward.addEventListener("click", function () {
  if (selectedSong < arr.length - 1) {
    selectedSong++;
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;

    flag = 1;
    main();
    audio.play();
  } else {
    forward.style.opacity = 0.4;
  }
});
backward.addEventListener("click", function () {
  if (selectedSong > 0) {
    selectedSong--;
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;

    flag = 1;
    main();
    audio.play();
  } else {
    backward.style.opacity = 0.4;
  }
});
