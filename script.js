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

async function playSong() {
  const musics = await getMusicData();
  const audio = new Audio();
  audio.src = musics[0];
  // audio.play();
  console.log(audio);
}
playSong();
