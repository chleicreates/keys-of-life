// year-script.js
window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

const revealBtn = document.getElementById("reveal-btn");

if (revealBtn) {
  revealBtn.addEventListener("click", () => {
    const existing = document.querySelector(".surprise-overlay");
    if (existing) {
      existing.classList.add("fade-out");
      setTimeout(() => existing.remove(), 300);
      return;
    }

    const overlay = document.createElement("div");
    overlay.classList.add("surprise-overlay");

    const card = document.createElement("div");
    card.classList.add("surprise-card");

    // 💙 Polaroid photo with caption
    card.innerHTML = `
      <div class="polaroid">
        <img src="../surprise/j.jpg" alt="Golden memory" />
        <span class="caption">Golden Moment ✨</span>
      </div>
      <p>🌟 You discovered a golden memory!</p>
      <button class="close-btn">Close 💙</button>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    setTimeout(() => overlay.classList.add("show"), 10);

    // Close on button or background click
    card.querySelector(".close-btn").addEventListener("click", () => {
      overlay.classList.add("fade-out");
      setTimeout(() => overlay.remove(), 300);
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("fade-out");
        setTimeout(() => overlay.remove(), 300);
      }
    });
  });
}
