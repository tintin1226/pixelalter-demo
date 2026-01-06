function loadProjectsPage() {
    app.innerHTML = `
    <section class="assets-page">
    <div class="profile-page">

    <!-- Page Header -->
    <div class="profile-header">
      <div class="user-info" style="align-items: flex-start;">
        <h2>My Projects</h2>
        <p style="margin-top: 0.5rem; color: #888;">Manage and organize all your creative projects</p>
      </div>
      <button class="edit-profile" id="newProjectBtn" style="color:white; margin-left: auto;">
        <i class="bi bi-plus-circle"></i> New Project
      </button>
    </div>

    <!-- Stats Row -->
    <div class="profile-stats">
      <div class="stat">
        <span class="number">3</span>
        <span class="label">Total Projects</span>
      </div>
      <div class="stat">
        <span class="number">2</span>
        <span class="label">In Progress</span>
      </div>
      <div class="stat">
        <span class="number">1</span>
        <span class="label">Completed</span>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="profile-nav">
      <button class="tab active" data-filter="all">All Projects</button>
      <button class="tab" data-filter="pixel">Pixel Art</button>
      <button class="tab" data-filter="2d">2D Assets</button>
      <button class="tab" data-filter="3d">3D Models</button>
    </div>

    <!-- Projects Grid -->
    <div class="profile-content">
      <div class="tab-content" id="projects-list">
        <div class="projects-grid">
          <div class="project-card" data-type="2d">
            <div class="project-thumbnail">
              <img src="assets/sample_10.jpg" alt="Project">
              <div class="project-overlay">
                <button class="btn-overlay" title="Open Project">
                  <i class="bi bi-folder-open"></i>
                </button>
              </div>
            </div>
            <div class="project-info">
              <h5>Fantasy Character Pack</h5>
              <p class="project-meta">
                <span class="project-type"><i class="bi bi-tag"></i> 2D Sprites</span>
                <span class="project-date"><i class="bi bi-clock"></i> 2 days ago</span>
              </p>
            </div>
            <div class="project-actions">
              <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn-icon" title="Duplicate"><i class="bi bi-copy"></i></button>
              <button class="btn-icon" title="Share"><i class="bi bi-share"></i></button>
              <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
          </div>

          <div class="project-card" data-type="pixel">
            <div class="project-thumbnail">
              <img src="assets/sample_11.jpg" alt="Project">
              <div class="project-overlay">
                <button class="btn-overlay" title="Open Project">
                  <i class="bi bi-folder-open"></i>
                </button>
              </div>
            </div>
            <div class="project-info">
              <h5>Pixel Art Tileset</h5>
              <p class="project-meta">
                <span class="project-type"><i class="bi bi-tag"></i> Pixel Art</span>
                <span class="project-date"><i class="bi bi-clock"></i> 1 week ago</span>
              </p>
            </div>
            <div class="project-actions">
              <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn-icon" title="Duplicate"><i class="bi bi-copy"></i></button>
              <button class="btn-icon" title="Share"><i class="bi bi-share"></i></button>
              <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
          </div>

          <div class="project-card" data-type="3d">
            <div class="project-thumbnail">
              <img src="assets/sample_12.jpg" alt="Project">
              <div class="project-overlay">
                <button class="btn-overlay" title="Open Project">
                  <i class="bi bi-folder-open"></i>
                </button>
              </div>
            </div>
            <div class="project-info">
              <h5>Low Poly Trees Pack</h5>
              <p class="project-meta">
                <span class="project-type"><i class="bi bi-tag"></i> 3D Models</span>
                <span class="project-date"><i class="bi bi-clock"></i> 3 weeks ago</span>
              </p>
            </div>
            <div class="project-actions">
              <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn-icon" title="Duplicate"><i class="bi bi-copy"></i></button>
              <button class="btn-icon" title="Share"><i class="bi bi-share"></i></button>
              <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
          </div>
  </div>

    <!-- Create Modal -->
    <div class="modal-overlay" id="createModal" style="display: none;">
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

  // Add event listeners for filter tabs
  const filterTabs = document.querySelectorAll('.tab[data-filter]');
  const projectCards = document.querySelectorAll('.project-card[data-type]');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter projects
      const filter = tab.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.type === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal handlers
  const newProjectBtn = document.getElementById("newProjectBtn");
  const modal = document.getElementById("createModal");
  const closeBtn = document.querySelector(".close-modal");
  const emptyCard = document.querySelector(".project-card-empty");

  // Open modal when clicking "New Project" button
  newProjectBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Open modal when clicking empty project card (if exists)
  if (emptyCard) {
    emptyCard.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  }

  // Close modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // Format selection handlers
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

  // Add click handlers for delete buttons
  document.querySelectorAll('.btn-icon[title="Delete"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (confirm('Are you sure you want to delete this project?')) {
        const card = e.target.closest('.project-card');
        card.remove();
      }
    });
  });
}
