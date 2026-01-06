// Replace the sell tab content in your loadUserProfile function with this:

function loadUserProfile() {
    app.innerHTML = `
    <section class="assets-page">
    <div class="profile-page">

    <!-- Top Section -->
    <div class="profile-header">
      <img src="assets/avatar.png" alt="Avatar" class="avatar">
      <div class="user-info">
        <h2>Christine Pineda <span class="badge premium">Premium</span></h2>
        <button class="edit-profile">Edit Profile</button>
      </div>
    </div>

    <!-- Stats Row -->
    <div class="profile-stats">
      <div class="stat">
        <span class="number">12</span>
        <span class="label">Projects</span>
      </div>
      <div class="stat">
        <span class="number">3</span>
        <span class="label">Assets Sold</span>
      </div>
      <div class="stat">
        <span class="number">200</span>
        <span class="label">Followers</span>
      </div>
    </div>

    <!-- Tabs / Sidebar -->
    <div class="profile-nav">
      <button class="tab active" data-tab="info">Profile Info</button>
      <button class="tab" data-tab="projects">My Projects</button>
      <button class="tab" data-tab="sell">Sell Assets</button>
      <button class="tab" data-tab="settings">Settings</button>
    </div>

    <!-- Content Area -->
    <div class="profile-content">
      <div class="tab-content" id="info">
        <h3>About Me</h3>
        <p>Hello! I create pixel art, 2D/3D assets, and game sprites. Welcome to my profile!</p>
      </div>

      <div class="tab-content" id="projects" style="display:none">
        <h3>My Projects</h3>
        <div class="projects-grid">
          <div class="project-card">
            <div class="project-thumbnail">
              <img src="assets/sample_10.jpg" alt="Project">
            </div>
            <div class="project-info">
              <h5>Fantasy Character Pack</h5>
            </div>
            <div class="project-actions">
              <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn-icon" title="Share"><i class="bi bi-share"></i></button>
              <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
          </div>

          <div class="project-card">
            <div class="project-thumbnail">
              <img src="assets/sample_11.jpg" alt="Project">
            </div>
            <div class="project-info">
              <h5>Pixel Art Tileset</h5>
            </div>
            <div class="project-actions">
              <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn-icon" title="Share"><i class="bi bi-share"></i></button>
              <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
          </div>

          <div class="project-card">
            <div class="project-thumbnail">
              <img src="assets/sample_12.jpg" alt="Project">
            </div>
            <div class="project-info">
              <h5>Low Poly Trees Pack</h5>
            </div>
            <div class="project-actions">
              <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
              <button class="btn-icon" title="Share"><i class="bi bi-share"></i></button>
              <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="sell" style="display:none">
        <div class="sell-assets-header">
          <h3>Sell Assets</h3>
          <button class="btn-upload-new" id="uploadNewBtn">
            <i class="bi bi-plus-circle"></i> Upload New Asset
          </button>
        </div>

        <!-- Upload Form (hidden by default) -->
        <div class="upload-form" id="uploadForm" style="display:none">
          <h4>Upload New Asset</h4>
          
          <div class="form-group">
            <label>Asset Name</label>
            <input type="text" id="assetName" placeholder="e.g., Fantasy Character Pack" class="form-input">
          </div>

          <div class="form-group">
            <label>Description</label>
            <textarea id="assetDesc" rows="3" placeholder="Describe your asset..." class="form-input"></textarea>
          </div>

          <div class="form-group">
            <label>Category</label>
            <select id="assetCategory" class="form-input">
              <option>2D Sprites</option>
              <option>3D Models</option>
              <option>Pixel Art</option>
              <option>Textures</option>
              <option>Sound Effects</option>
              <option>Music</option>
              <option>Scripts</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Price ($)</label>
              <input type="number" id="assetPrice" placeholder="9.99" class="form-input" min="0" step="0.01">
            </div>
            <div class="form-group">
              <label>File Format</label>
              <input type="text" id="assetFormat" placeholder="e.g., PNG, FBX, WAV" class="form-input">
            </div>
          </div>

          <div class="form-group">
            <label>Upload Files</label>
            <div class="file-upload-area">
              <i class="bi bi-cloud-upload"></i>
              <p>Drag & drop files or click to browse</p>
              <input type="file" id="assetFiles" multiple style="display:none">
            </div>
          </div>

          <div class="form-actions">
            <button class="btn-cancel" id="cancelUpload">Cancel</button>
            <button class="btn-submit" id="submitUpload">Publish Asset</button>
          </div>
        </div>

        <!-- My Listed Assets -->
        <div class="my-assets-section" id="myAssets">
          <h4>My Listed Assets</h4>
          <div class="assets-grid">
            <div class="asset-item">
              <div class="asset-thumbnail">
                <img src="assets/sample_10.jpg" alt="Asset">
                <span class="asset-status status-active">Active</span>
              </div>
              <div class="asset-info">
                <h5>Fantasy Character Pack</h5>
                <p class="asset-category">2D Sprites</p>
                <div class="asset-stats">
                  <span><i class="bi bi-download"></i> 24 sales</span>
                  <span class="asset-price">$12.99</span>
                </div>
              </div>
              <div class="asset-actions">
                <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
              </div>
            </div>

            <div class="asset-item">
              <div class="asset-thumbnail">
                <img src="assets/sample_11.jpg" alt="Asset">
                <span class="asset-status status-pending">Pending</span>
              </div>
              <div class="asset-info">
                <h5>Pixel Art Tileset</h5>
                <p class="asset-category">Pixel Art</p>
                <div class="asset-stats">
                  <span><i class="bi bi-download"></i> 0 sales</span>
                  <span class="asset-price">$8.99</span>
                </div>
              </div>
              <div class="asset-actions">
                <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
              </div>
            </div>

            <div class="asset-item">
              <div class="asset-thumbnail">
                <img src="assets/sample_12.jpg" alt="Asset">
                <span class="asset-status status-active">Active</span>
              </div>
              <div class="asset-info">
                <h5>Low Poly Trees Pack</h5>
                <p class="asset-category">3D Models</p>
                <div class="asset-stats">
                  <span><i class="bi bi-download"></i> 156 sales</span>
                  <span class="asset-price">$15.99</span>
                </div>
              </div>
              <div class="asset-actions">
                <button class="btn-icon" title="Edit"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon" title="Delete"><i class="bi bi-trash"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="settings" style="display:none">
        <h3>Account Settings</h3>
        <p>Email: user@example.com</p>
        <p>Password: ********</p>
      </div>
    </div>

  </div>
    </section>
  `;

  // Tab switching logic
  const tabs = document.querySelectorAll('.profile-nav .tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      tabContents.forEach(tc => tc.style.display = 'none');
      const target = tab.dataset.tab;
      document.getElementById(target).style.display = 'block';
    });
  });

  // Upload form toggle
  const uploadNewBtn = document.getElementById('uploadNewBtn');
  const uploadForm = document.getElementById('uploadForm');
  const cancelUpload = document.getElementById('cancelUpload');
  const myAssets = document.getElementById('myAssets');

  uploadNewBtn.addEventListener('click', () => {
    uploadForm.style.display = 'block';
    myAssets.style.display = 'none';
  });

  cancelUpload.addEventListener('click', () => {
    uploadForm.style.display = 'none';
    myAssets.style.display = 'block';
  });

  // File upload area click
  const fileUploadArea = document.querySelector('.file-upload-area');
  const assetFiles = document.getElementById('assetFiles');

  fileUploadArea.addEventListener('click', () => {
    assetFiles.click();
  });

  assetFiles.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      fileUploadArea.querySelector('p').textContent = 
        `${e.target.files.length} file(s) selected`;
    }
  });

  // Submit upload
  document.getElementById('submitUpload').addEventListener('click', () => {
    alert('Asset uploaded successfully!');
    uploadForm.style.display = 'none';
    myAssets.style.display = 'block';
  });

}
