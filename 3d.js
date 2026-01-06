let scene, camera, renderer, controls;
let animationId;

function load3dPage() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div id="three-root" style="width:100%; height:100vh;"></div>

    <div class="editor-toolbar">
        <div class="tools-left">
            <button class="tool tool-draw" title="Draw"><i class="bi bi-plus"></i></button>
            <button class="tool tool-tools" title="Tools"><i class="bi bi-wrench-adjustable"></i></button>
            <button class="tool tool-assets" title="Assets"><i class="bi bi-bag"></i></button>
            <button class="tool tool-project" title="Project"><i class="bi bi-folder"></i></button>
            <button class="tool tool-animation" title="Animation"><i class="bi bi-film"></i></button>
            <button class="tool tool-download" title="Download"><i class="bi bi-download"></i></button>
            <button class="tool" title="Undo"><i class="bi bi-arrow-counterclockwise"></i></button>
            <button class="tool" title="Redo"><i class="bi bi-arrow-clockwise"></i></button>
        </div>

        <div class="tools-right">
            <i class="bi bi-zoom-in"></i>
            <span>100%</span>
            <i class="bi bi-zoom-out"></i>
        </div>
    </div>

    <div class="side-panel" id="tool-panel">
        <div class="panel-header">
        <span id="panel-title"></span>
        </div>
        <div class="panel-content" id="panel-content"></div>
    </div>

    <div class="animation-panel" id="animation-panel">
        <div class="timeline-header">
          <button class="anim-tool" title="Play">
            <i class="bi bi-play-fill"></i>
          </button>

          <span class="anim-time">0.00s</span>

          <button class="anim-tool keyframe-btn" title="Add Keyframe">
            <i class="bi bi-diamond-fill"></i>
          </button>
        </div>

        <div class="timeline">
          <div class="timeline-ruler">
            <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
          </div>

          <div class="timeline-track">
            <div class="keyframe" style="left: 20%;"></div>
            <div class="keyframe" style="left: 60%;"></div>
          </div>
        </div>

        <div class="animation-tools">
            <button class="anim-tool" title="Play"><i class="bi bi-play-fill"></i></button>
            <button class="anim-tool" title="Onion Skin"><i class="bi bi-eye-fill"></i></button>
            <button class="anim-tool" title="Settings"><i class="bi bi-gear-fill"></i></button>
            <span class="anim-time">0:00</span>
        </div>
    </div>

    <div class="download-panel" id="download-panel">
        <h3>Download Asset</h3>

        <div class="download-option">
            <label>Format:</label>
            <select>
              <option>GLTF (.gltf/.glb)</option>
              <option>OBJ (.obj)</option>
              <option>FBX (.fbx)</option>
              <option>STL (.stl)</option>
            </select>
        </div>

        <div class="download-option">
          <label>Polygons:</label>
          <div class="download-list">
            <label>
              <input type="checkbox" disabled checked>
              Low Poly
            </label>
            <label>
              <input type="checkbox" disabled>
              High Poly <span class="premium-badge">Premium</span>
            </label>
          </div>
        </div>

        <div class="download-option">
            <label>Include Animation:</label>
            <input type="checkbox" disabled checked>
        </div>

        <button class="download-btn">Download</button>

        <p class="file-size">Size: 120 mb</p>
    </div>
  `;

  // Cleanup any existing Three.js instance first
  cleanup3d();
  initThree();
  setup3dUI();
}

function initThree() {
  const container = document.getElementById('three-root');
  if (!container) return;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2a2a2a); // Grey background

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(5, 5, 5); // Better starting position
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // Grid Floor
  const gridHelper = new THREE.GridHelper(20, 20, 0x888888, 0x444444);
  scene.add(gridHelper);

  // Cube (positioned above the grid)
  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(),
    new THREE.MeshStandardMaterial({ color: 0x8a2be2 })
  );
  cube.position.y = 0.5; // Lift cube above the floor
  scene.add(cube);

  // Ambient Light (for overall illumination)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  // Directional Light (for shadows and definition)
  const light = new THREE.DirectionalLight(0xffffff, 0.8);
  light.position.set(5, 10, 5);
  scene.add(light);

  // Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  // Raycaster
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onMouseClick = (e) => {
    const rect = renderer.domElement.getBoundingClientRect();

    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(scene.children);

    if (hits.length > 0) {
      console.log('clicked:', hits[0].object);
    }
  };

  renderer.domElement.addEventListener('click', onMouseClick);

  // Resize
  window.addEventListener('resize', onResize);

  animate();
}

function onResize() {
  const container = document.getElementById('three-root');
  if (!container || !camera || !renderer) return;

  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  const container = document.getElementById('three-root');
  if (!container || !renderer || !scene || !camera) {
    return; // Stop animation if page changed
  }

  animationId = requestAnimationFrame(animate);

  if (controls) {
    controls.update();
  }

  renderer.render(scene, camera);
}

// Cleanup function to call when leaving the 3D page
function cleanup3d() {
  // Cancel animation loop
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  // Remove event listeners
  window.removeEventListener('resize', onResize);

  // Dispose Three.js resources
  if (renderer) {
    renderer.dispose();
    const container = document.getElementById('three-root');
    if (container && renderer.domElement) {
      container.removeChild(renderer.domElement);
    }
  }

  if (controls) {
    controls.dispose();
  }

  if (scene) {
    scene.traverse((object) => {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach(material => material.dispose());
        } else {
          object.material.dispose();
        }
      }
    });
  }

  // Clear references
  scene = null;
  camera = null;
  renderer = null;
  controls = null;
}

// Helper function to close all main panels
function closeAllMainPanels() {
  const animPanel = document.getElementById('animation-panel');
  const downloadPanel = document.getElementById('download-panel');
  
  if (animPanel) animPanel.classList.remove('active');
  if (downloadPanel) downloadPanel.classList.remove('active');
}

function toggleSharedPanel(panel, button, contentHTML, extraClass = '') {
  button.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close other main panels first
    closeAllMainPanels();
    
    // If panel is already active and this button is clicked, close it
    if (panel.classList.contains('active') && panel.dataset.activeTool === button.className) {
      panel.classList.remove('active', 'draw-active', 'assets-active');
      panel.dataset.activeTool = '';
      panel.querySelector('.panel-content').innerHTML = '';
    } else {
      // Otherwise, show panel with new content
      panel.classList.add('active');
      panel.classList.remove('draw-active', 'assets-active');
      if (extraClass) panel.classList.add(extraClass);

      // Update content without replacing the wrapper
      panel.querySelector('.panel-content').innerHTML = contentHTML;
      panel.dataset.activeTool = button.className;
    }
  });
}

function setup3dUI() {
  const panel = document.getElementById('tool-panel');
  panel.dataset.activeTool = '';

  const drawBtn = document.querySelector('.tool-tools');
  const assetsBtn = document.querySelector('.tool-assets');
  const projectBtn = document.querySelector('.tool-project');

  toggleSharedPanel(
    panel,
    drawBtn,
    `
      <button class="sub-tool" title="Move"><i class="bi bi-arrows-move"></i></button>
      <button class="sub-tool" title="Rotate"><i class="bi bi-arrow-clockwise"></i></button>
      <button class="sub-tool" title="Scale"><i class="bi bi-arrows-angle-expand"></i></button>
      <button class="sub-tool" title="Paint"><i class="bi bi-brush-fill"></i></button>
      <button class="sub-tool" title="Erase"><i class="bi bi-eraser-fill"></i></button>
    `,
    'draw-active'
  );

  toggleSharedPanel(
    panel,
    assetsBtn,
    `
      <input type="text" placeholder="Search assets..." class="asset-search-panel" />
      <div class="assets-scroll">
        <img src="assets/sample_2.png" class="asset-thumb">
        <img src="assets/sample_4.jpeg" class="asset-thumb">
        <img src="assets/sample_8.jpg" class="asset-thumb">
      </div>
    `,
    'assets-active'
  );

  toggleSharedPanel(
    panel,
    projectBtn,
    `<h3>No projects yet.</h3>`,
    'assets-active'
  );

  // Animation panel
  const animationBtn = document.querySelector('.tool-animation');
  const animPanel = document.getElementById('animation-panel');
  
  animationBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close other panels
    panel.classList.remove('active', 'draw-active', 'assets-active');
    panel.dataset.activeTool = '';
    panel.querySelector('.panel-content').innerHTML = '';
    
    const downloadPanel = document.getElementById('download-panel');
    if (downloadPanel) downloadPanel.classList.remove('active');
    
    // Toggle animation panel
    animPanel.classList.toggle('active');
  });

  // Download panel
  const downloadBtn = document.querySelector('.tool-download');
  const downloadPanel = document.getElementById('download-panel');
  
  downloadBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    // Close other panels
    panel.classList.remove('active', 'draw-active', 'assets-active');
    panel.dataset.activeTool = '';
    panel.querySelector('.panel-content').innerHTML = '';
    
    if (animPanel) animPanel.classList.remove('active');
    
    // Toggle download panel
    downloadPanel.classList.toggle('active');
  });

  // Keyframe functionality
  const keyframeBtn = document.querySelector('.keyframe-btn');
  const track = document.querySelector('.timeline-track');

  if (keyframeBtn && track) {
    keyframeBtn.addEventListener('click', () => {
      const key = document.createElement('div');
      key.className = 'keyframe';

      // Fake time position (random for now)
      const percent = Math.random() * 90 + 5;
      key.style.left = percent + '%';

      track.appendChild(key);
    });
  }

  // Close panels when clicking outside
  document.addEventListener('click', (e) => {
    const toolPanel = document.getElementById('tool-panel');
    const animPanel = document.getElementById('animation-panel');
    const downloadPanel = document.getElementById('download-panel');
    
    // Check if click is outside all panels and toolbar buttons
    const isClickInsidePanel = 
      toolPanel.contains(e.target) ||
      animPanel.contains(e.target) ||
      downloadPanel.contains(e.target) ||
      e.target.closest('.tool') ||
      e.target.closest('.sub-tool');
    
    if (!isClickInsidePanel) {
      // Close all panels
      toolPanel.classList.remove('active', 'draw-active', 'assets-active');
      toolPanel.dataset.activeTool = '';
      toolPanel.querySelector('.panel-content').innerHTML = '';
      animPanel.classList.remove('active');
      downloadPanel.classList.remove('active');
    }
  });
}
