function loadAssetsPage() {
  app.innerHTML = `
    <section class="assets-page">

    <!-- Search & Filters -->
    <div class="assets-topbar">
      <div class="search-wrapper">
        <i class="bi bi-search search-icon"></i> <!-- left icon -->
        <input type="text" placeholder="Search assets..." class="asset-search" />
        <button class="filter-btn">
          <i class="bi bi-funnel-fill"></i>
        </button> <!-- right icon/button -->
        <ul class="filter-dropdown">
          <li>2D Assets</li>
          <li>3D Assets</li>
          <li>Pixel Art</li>
          <li>UI Icons</li>
          <li>Environment Props</li>
          <li>Premium</li>
          <li>Free</li>
        </ul>
      </div>
    </div>

    <!-- Asset Gallery -->
    <div class="asset-gallery">
        <!-- Create Your Own -->
        <div class="asset-card create-own">
          <div class="create-icon">+</div>
          <p>Create Your Own</p>
        </div>

        <!-- Example editable assets -->
        <div class="asset-card">
          <img src="assets/sample_1.png" alt="Asset 1">
          <p class="asset-title">Pixel Character</p>
          <p class="asset-price">Free</p>
        </div>

        <div class="asset-card premium">
          <img src="assets/sample_2.png" alt="Asset 2">
          <p class="asset-title">3D Sword</p>
          <p class="asset-price">$5</p>
        </div>

        <div class="asset-card">
          <img src="assets/sample_3.png" alt="Asset 3">
          <p class="asset-title">2D Tree</p>
          <p class="asset-price">Free</p>
        </div>

        <div class="asset-card">
          <img src="assets/sample_4.jpeg" alt="Asset 4">
          <p class="asset-title">Pixel Character</p>
          <p class="asset-price">Free</p>
        </div>

        <div class="asset-card premium">
          <img src="assets/sample_5.jpg" alt="Asset 5">
          <p class="asset-title">3D Sword</p>
          <p class="asset-price">$5</p>
        </div>

        <div class="asset-card">
          <img src="assets/sample_6.jpg" alt="Asset 6">
          <p class="asset-title">2D Tree</p>
          <p class="asset-price">Free</p>
        </div>

        <div class="asset-card">
          <img src="assets/sample_7.jpg" alt="Asset 7">
          <p class="asset-title">Pixel Character</p>
          <p class="asset-price">Free</p>
        </div>

        <div class="asset-card premium">
          <img src="assets/sample_8.jpg" alt="Asset 8">
          <p class="asset-title">3D Sword</p>
          <p class="asset-price">$5</p>
        </div>

        <div class="asset-card">
          <img src="assets/sample_9.jpeg" alt="Asset 9">
          <p class="asset-title">2D Tree</p>
          <p class="asset-price">Free</p>
        </div>
    </div>

    <div class="modal-overlay" id="createModal">
      <div class="create-modal">
        <h2>Create Your Own Asset</h2>
        <p>Select a format to start</p>

        <div class="format-grid">
          <div class="format-card" id="2d-asset">
            <i class="bi bi-brush"></i>
            <span>2D Asset</span>
          </div>

          <div class="format-card" id="3d-asset">
            <i class="bi bi-box"></i>
            <span>3D Asset</span>
          </div>

          <div class="format-card" id="pixel-art">
            <i class="bi bi-grid"></i>
            <span>Pixel Art</span>
          </div>
        </div>

        <button class="close-modal">Cancel</button>
      </div>
    </div>

    </section>
  `;
  const filterBtn = document.querySelector(".filter-btn");
  const filterDropdown = document.querySelector(".filter-dropdown");

  filterBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent closing immediately
    filterDropdown.style.display = filterDropdown.style.display === "block" ? "none" : "block";
  });

  // Close dropdown if clicking outside
  document.addEventListener("click", () => {
    filterDropdown.style.display = "none";
  });

  const createCard = document.querySelector(".asset-card.create-own");
  const modal = document.getElementById("createModal");
  const closeBtn = document.querySelector(".close-modal");

  createCard.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.getElementById("pixel-art").addEventListener("click", () => {
    if (typeof cleanup3d === 'function') cleanup3d(); // Cleanup if coming from 3D page
    loadPixelPage();
  });

  document.getElementById("2d-asset").addEventListener("click", () => {
    if (typeof cleanup3d === 'function') cleanup3d(); // Cleanup if coming from 3D page
    load2dPage();
  });

  document.getElementById("3d-asset").addEventListener("click", () => {
    load3dPage();
  });
}
