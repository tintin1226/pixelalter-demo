function loadPixelPage() {
    app.innerHTML = `
    <section class="pixel-page">
        <div class="editor-toolbar">
            <div class="tools-left">
                <button class="tool tool-draw" title="Draw"><i class="bi bi-pencil"></i></button>
                <button class="tool tool-assets" title="Assets"><i class="bi bi-bag"></i></button>
                <button class="tool tool-project" title="Project"><i class="bi bi-folder"></i></button>
                <button class="tool tool-animation" title="Animation"><i class="bi bi-film"></i></button>
                <button class="tool tool-download" title="Download"><i class="bi bi-download"></i></button>
                <button class="tool tool-canvas" title="Canvas"><i class="bi bi-aspect-ratio"></i></button>
                <button class="tool" title="Undo"><i class="bi bi-arrow-counterclockwise"></i></button>
                <button class="tool" title="Redo"><i class="bi bi-arrow-clockwise"></i></button>
            </div>

            <div class="tools-right">
                <i class="bi bi-zoom-in"></i>
                <span>100%</span>
                <i class="bi bi-zoom-out"></i>
            </div>
        </div>

        <div class="pixel-canvas"></div>

        <div class="side-panel" id="tool-panel">
            <div class="panel-header">
            <span id="panel-title"></span>
            </div>
            <div class="panel-content" id="panel-content"></div>
        </div>

        <div class="animation-panel" id="animation-panel">
            <div class="frames-container">
                <div class="frame active"></div>
                <div class="frame"></div>
                <div class="frame"></div>
                <div class="add-frame"><i class="bi bi-plus-lg"></i></div>
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
                <option>PNG</option>
                <option>JPG</option>
                <option>GIF</option>
                </select>
            </div>

            <div class="download-option">
                <label>Resolution:</label>
                <select>
                <option>1x</option>
                <option>2x</option>
                <option>4x</option>
                </select>
            </div>

            <div class="download-option">
                <label><input type="checkbox" disabled> No Background <span class="premium-badge">Premium</span></label>
            </div>

            <div class="download-option">
                <label>Include Frames:</label>
                <input type="checkbox" disabled checked>
            </div>

            <button class="download-btn">Download</button>

            <p class="file-size">Size: 512 KB</p>
        </div>

        <div class="canvas-panel" id="canvas-panel">
            <h3>Canvas Settings</h3>

            <div class="canvas-option">
                <label for="canvas-width">Width:</label>
                <input type="number" id="canvas-width" value="32" min="1">
            </div>

            <div class="canvas-option">
                <label for="canvas-height">Height:</label>
                <input type="number" id="canvas-height" value="32" min="1">
            </div>

            <button class="apply-canvas-btn">Apply</button>
        </div>

        <div class="sub-panel" id="color-panel">
            <div class="panel-header">
                Color
                <i class="bi bi-droplet-fill"></i>
            </div>

            <!-- Color Picker -->
            <div class="color-picker-section">
                <input type="color" value="#ff0000">
                <span class="color-value">#FF0000</span>
            </div>

            <!-- Swatches -->
            <div class="swatch-section">
                <h4>Swatches</h4>
                <div class="swatch-grid">
                    <div class="swatch" style="background:#000000"></div>
                    <div class="swatch" style="background:#ffffff"></div>
                    <div class="swatch" style="background:#ff4757"></div>
                    <div class="swatch" style="background:#1e90ff"></div>
                    <div class="swatch" style="background:#2ed573"></div>
                    <div class="swatch" style="background:#ffa502"></div>

                    <!-- Empty / implied slots -->
                    <div class="swatch empty"></div>
                    <div class="swatch empty"></div>
                    <div class="swatch empty"></div>
                </div>
            </div>
        </div>

        <div class="sub-panel" id="layers-panel">
            <div class="panel-header">
                Layers
                <i class="bi bi-layers-fill"></i>
            </div>

            <div class="layers-list">
                <div class="layer-item active">
                    <div class="layer-thumb"></div>
                    <span>Layer 1</span>
                    <i class="bi bi-eye-fill layer-visibility"></i>
                </div>

                <div class="layer-item">
                    <div class="layer-thumb"></div>
                    <span>Layer 2</span>
                    <i class="bi bi-eye-fill layer-visibility"></i>
                </div>
            </div>

            <div class="layers-actions">
                <button title="Add Layer"><i class="bi bi-plus-lg"></i></button>
                <button title="Duplicate Layer"><i class="bi bi-files"></i></button>
                <button title="Add Image"><i class="bi bi-camera"></i></button>
                <button title="Delete Layer"><i class="bi bi-trash"></i></button>
            </div>
        </div>
    </section>
  `;

    // Helper function to close all sub-panels
    function closeAllDrawSubPanels() {
        document.getElementById('color-panel')?.classList.remove('active');
        document.getElementById('layers-panel')?.classList.remove('active');
    }

    // Shared panel toggle function
    function toggleSharedPanel(panel, button, contentHTML, extraClass = '') {
        button.addEventListener('click', () => {
            // If panel is already active and this button is clicked, close it
            if (panel.classList.contains('active') && panel.dataset.activeTool === button.className) {
                panel.classList.remove('active', 'draw-active', 'assets-active');
                panel.dataset.activeTool = '';
                panel.querySelector('.panel-content').innerHTML = '';
                closeAllDrawSubPanels();
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

    const panel = document.getElementById('tool-panel');
    panel.dataset.activeTool = ''; // track which tool opened it
    
    // Draw tool
    const drawBtn = document.querySelector('.tool-draw');
    toggleSharedPanel(
        panel,
        drawBtn,
        `
    <button class="sub-tool" id="brush-tool" title="Brush"><i class="bi bi-pencil-fill"></i></button>
    <button class="sub-tool" title="Eraser"><i class="bi bi-eraser-fill"></i></button>
    <button class="sub-tool" title="Bucket"><i class="bi bi-droplet-fill"></i></button>
    <button class="sub-tool" title="Lasso"><i class="bi bi-vector-pen"></i></button>
    <button class="sub-tool" id="color-tool" title="Color Picker" style="color: red;"><i class="bi bi-square-fill"></i></button>
    <button class="sub-tool" title="Eyedropper"><i class="bi bi-eyedropper"></i></button>
    <button class="sub-tool" id="layers-tool" title="Layers"><i class="bi bi-layers-fill"></i></button>
    `,
        'draw-active'
    );

    // Assets tool
    const assetsBtn = document.querySelector('.tool-assets');
    toggleSharedPanel(
        panel,
        assetsBtn,
        `
    <input type="text" placeholder="Search assets..." class="asset-search-panel" />
    <div class="assets-scroll">
        <img src="assets/sample_1.png" alt="Asset 1" class="asset-thumb">
        <img src="assets/sample_6.jpg" alt="Asset 2" class="asset-thumb">
        <img src="assets/sample_7.jpg" alt="Asset 3" class="asset-thumb">
    </div>
    `,
        'assets-active'
    );

    // Projects tool
    const projectBtn = document.querySelector('.tool-project');
    toggleSharedPanel(
        panel,
        projectBtn,
        `<h3>No projects yet.</h3>`,
        'assets-active'
    );

    const animationBtn = document.querySelector('.tool-animation');
    const animPanel = document.getElementById('animation-panel');
    const framesContainer = animPanel.querySelector('.frames-container');
    const addFrameBtn = animPanel.querySelector('.add-frame');

    // Toggle animation panel
    animationBtn.addEventListener('click', () => {
        animPanel.classList.toggle('active');
    });

    // Function to make a frame clickable (highlight active)
    function makeFrameSelectable(frame) {
        frame.addEventListener('click', () => {
            framesContainer.querySelectorAll('.frame').forEach(f => f.classList.remove('active'));
            frame.classList.add('active');
        });
    }

    // Initialize existing frames
    framesContainer.querySelectorAll('.frame').forEach(makeFrameSelectable);

    // Add new frame
    addFrameBtn.addEventListener('click', () => {
        const newFrame = document.createElement('div');
        newFrame.classList.add('frame');
        newFrame.textContent = framesContainer.querySelectorAll('.frame').length + 1;

        framesContainer.insertBefore(newFrame, addFrameBtn);
        makeFrameSelectable(newFrame);
    });

    const downloadBtn = document.querySelector('.tool-download');
    const downloadPanel = document.getElementById('download-panel');

    downloadBtn.addEventListener('click', () => {
        downloadPanel.classList.toggle('active');
    });

    const canvasBtn = document.querySelector('.tool-canvas');
    const canvasPanel = document.getElementById('canvas-panel');

    canvasBtn.addEventListener('click', () => {
        canvasPanel.classList.toggle('active');
    });

    // Set up sub-panel listeners when draw panel is opened
    drawBtn.addEventListener('click', () => {
        // Wait for the DOM to update, then attach listeners
        setTimeout(() => {
            const colorBtn = document.getElementById('color-tool');
            const colorPanel = document.getElementById('color-panel');

            const layersBtn = document.getElementById('layers-tool');
            const layersPanel = document.getElementById('layers-panel');

            // Color tool listener
            if (colorBtn && !colorBtn.dataset.listenerAttached) {
                colorBtn.dataset.listenerAttached = 'true';
                colorBtn.addEventListener('click', () => {
                    // Close other sub-panels
                    layersPanel.classList.remove('active');
                    // Toggle color panel
                    colorPanel.classList.toggle('active');
                });
            }

            // Layers tool listener
            if (layersBtn && !layersBtn.dataset.listenerAttached) {
                layersBtn.dataset.listenerAttached = 'true';
                layersBtn.addEventListener('click', () => {
                    // Close other sub-panels
                    colorPanel.classList.remove('active');
                    // Toggle layers panel
                    layersPanel.classList.toggle('active');
                });
            }
        }, 0);
    });
}
