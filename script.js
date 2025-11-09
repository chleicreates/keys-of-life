// Scroll reveal animation
const boxes = document.querySelectorAll('.box-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

boxes.forEach(box => {
  observer.observe(box);
});

// Soft fade on load
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// 🎵 Background Music Control
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");

// Try autoplay muted so browsers allow it
window.addEventListener("load", () => {
  music.volume = 0.6;
  music.muted = true;

  // Try to start playing silently
  music.play().then(() => {
    console.log("Music started muted");
  }).catch(err => {
    console.log("Autoplay blocked, waiting for user interaction.");
  });

  // When user interacts, unmute + fade in
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
    musicBtn.classList.add("playing");
    document.removeEventListener("click", enableMusic);
  };
  document.addEventListener("click", enableMusic);
});

// Toggle manually
musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.classList.add("playing");
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});

// Fade out smoothly when leaving
window.addEventListener("beforeunload", () => {
  if (!music.paused) {
    let fadeOut = setInterval(() => {
      if (music.volume > 0.05) {
        music.volume -= 0.05;
      } else {
        clearInterval(fadeOut);
        music.pause();
      }
    }, 100);
  }
});


// Page fade transition
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    if (link.getAttribute("href") && !link.getAttribute("href").startsWith("#")) {
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => {
        window.location = link.href;
      }, 800);
    }
  });
});

