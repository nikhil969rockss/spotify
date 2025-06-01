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
function playMusic(music) {
  music = music.replaceAll(" ", "-");
  const path = "http://127.0.0.1:5500/audio/";
  audio.src = path + music + ".mp3";
  console.log(audio);
  audio.play();
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
                <span><i class="ri-play-large-fill"></i></span>
              </li>`;
  });
  const musicList = Array.from(
    document.querySelector(".songs").getElementsByTagName("li")
  );
  musicList.forEach((e) => {
    e.addEventListener("click", () => playMusic(e.innerText));
  });
}
playSong();

/*<li>
                <span class="song-name"
                  ><i class="ri-music-2-fill"></i>phela phela pyaar</span
                >
                <span><i class="ri-play-large-fill"></i></span>
              </li>

*/
