// 🎵 Shared Background Music Controller

// Check if music element already exists (keeps one instance)
let music = document.getElementById("bg-music");

// If not found (on year pages), create a new one
if (!music) {
  music = new Audio("../audio/Golden Hour - JVKE - Cinematic Violin Cover.mp3");
  music.loop = true;
  document.body.appendChild(music);
}

// Restore playing state from memory
if (localStorage.getItem("musicPlaying") === "true") {
  music.volume = 0.6;
  music.muted = false;
  music.play().catch(() => {});
}

// Reference button if it exists
const musicBtn = document.getElementById("music-btn");

// Try autoplay muted
window.addEventListener("load", () => {
  if (!music.paused) return; // already playing

  music.volume = 0.6;
  music.muted = true;
  music.play().catch(() => {});

  // Unmute and fade in after first click
  const enableMusic = () => {
    music.muted = false;
    let v = 0;
    const fade = setInterval(() => {
      if (v < 0.6) {
        v += 0.05;
        music.volume = v;
      } else {
        clearInterval(fade);
      }
    }, 100);
    if (musicBtn) musicBtn.classList.add("playing");
    localStorage.setItem("musicPlaying", "true");
    document.removeEventListener("click", enableMusic);
  };
  document.addEventListener("click", enableMusic);
});

// Toggle music manually
if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play();
      musicBtn.classList.add("playing");
      localStorage.setItem("musicPlaying", "true");
    } else {
      music.pause();
      musicBtn.classList.remove("playing");
      localStorage.setItem("musicPlaying", "false");
    }
  });
}
