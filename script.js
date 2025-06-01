async function getMusicData() {
  try {
    const response = await fetch("http://127.0.0.1:5500/audio");
    const data = await response.text();
    const div = document.createElement("div");
    div.innerHTML = data;
    const as = div.getElementsByTagName("a");
    let musicArray = [];
    for (let index = 0; index < as.length; index++) {
      const element = as[index];
      if (element.href.endsWith(".mp3")) musicArray.push(element.href);
    }
    return musicArray;
  } catch (error) {
    console.log(error);
  }
}

let audio = new Audio();
function toggleIcon(iconElement, isPlaying) {
  iconElement.className = isPlaying ? "ri-pause-line" : "ri-play-large-fill";
}
document.addEventListener("keypress", (e) => {
  const active = document.querySelector(".songs .active");
  e.preventDefault();
  if (e.code === "Space") {
    if (active) {
      const icon = active.querySelector(".play-pause i");
      toggleIcon(icon, false);
    }
  }
  if (audio.paused) {
    audio.play();

    const icon = active.querySelector(".play-pause i");

    toggleIcon(icon, true);
  } else {
    audio.pause();
  }
});

function playMusic(music, song, songList) {
  songList.forEach((e) => {
    e.classList.remove("active");
    const icon = e.querySelector(".play-pause i");
    toggleIcon(icon, false);
  });
  song.classList.add("active");
  music = music.replaceAll(" ", "-");
  const path = "http://127.0.0.1:5500/audio/";
  audio.src = path + music + ".mp3";

  audio.play();
  const icon = song.querySelector(".play-pause i");
  toggleIcon(icon, true);
}
async function playSong() {
  const musics = await getMusicData();

  // creating each element for songs
  musics.forEach((e) => {
    const ul = document.querySelector(".songs");
    ul.innerHTML += `<li>
                <span class="song-name"
                  ><i class="ri-music-2-fill"></i>${e
                    .split("/audio/")[1]
                    .replaceAll("-", " ")
                    .replaceAll(".mp3", "")}</span
                >
                <span class="play-pause"><i class="ri-play-large-fill"></i></span>
              </li>`;
  });
  const musicList = Array.from(
    document.querySelector(".songs").getElementsByTagName("li")
  );
  musicList.forEach((e) => {
    if (e.classList.contains("active")) {
      e.classList.remove("active");
    }
    e.addEventListener("click", () => playMusic(e.innerText, e, musicList));
  });
}
playSong();
