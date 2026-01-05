const app = document.getElementById("app");

function loadIntro() {
  app.innerHTML = `
    <section class="intro">
        <div class="intro-content">
            <h1>Welcome to Pixel Arter</h1>
            <p class="intro-text">
                Your one-stop marketplace for game assets. Browse, customize, and export 2D, 3D, and pixel art assets — all in one place. 
                Create your own assets or explore ready-made ones for your games.
            </p>
        </div>
        <img src="assets/element_1.png" alt="element_1" class="elem-1"/>

        <div class="intro-footer">
            <p>Ready to begin?</p>
            <button class="start-btn">Start Creating</button>
        </div>
    </section>

    <!-- Glass Modal Overlay -->
    <div class="modal-overlay" id="signupModal">
      <div class="modal glass">
        <h2>Create an Account</h2>

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        <button class="modal-btn">Sign Up</button>

        <div class="divider">or continue with</div>

        <div class="social-icons">
          <i class="bi bi-google"></i>
          <i class="bi bi-facebook"></i>
          <i class="bi bi-github"></i>
          <i class="bi bi-twitter-x"></i>
        </div>
      </div>
    </div>

  `;

  const modal = document.getElementById("signupModal");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("start-btn")) {
      modal.classList.add("show");
    }

    // Close when clicking outside modal
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-btn")) {
      loadAssetsPage();
    }
  });
}

// Load intro on first visit
loadIntro();
