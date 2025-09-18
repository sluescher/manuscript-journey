// Initialize scrollama
const scroller = scrollama();

// Define what happens when each step becomes active
function handleStepEnter(response) {
    const step = response.index;
    
    // Remove active class from all steps
    document.querySelectorAll('.step').forEach(s => s.classList.remove('is-active'));
    
    // Add active class to current step
    document.querySelector(`[data-step="${step}"]`).classList.add('is-active');
    
    // Update visualization based on step
    updateVisualization(step);
}

function updateVisualization(step) {
    const mapImage = document.getElementById('map-image');
    const manuscriptImage = document.getElementById('manuscript-image');
    
    switch(step) {
        case 0: // Birth of manuscript
            mapImage.src = 'images/cairo-map.jpg';
            manuscriptImage.src = 'images/manuscript1.jpg';
            mapImage.style.filter = 'sepia(30%)';
            break;
            
        case 1: // In the library
            mapImage.src = 'images/cairo-map.jpg';
            manuscriptImage.src = 'images/library-scene.jpg';
            mapImage.style.filter = 'brightness(1.1)';
            addMarginaliaBehavior();
            break;
            
        case 2: // Tremors of change
            mapImage.src = 'images/cairo-map.jpg';
            manuscriptImage.src = 'images/manuscript1.jpg';
            mapImage.style.filter = 'contrast(1.2) saturate(0.8)';
            break;
            
        case 3: // The conquest
            mapImage.src = 'images/cairo-map.jpg';
            manuscriptImage.src = 'images/manuscript1.jpg';
            mapImage.style.filter = 'brightness(0.7) contrast(1.3)';
            animateNetwork();
            addScholarNodeBehavior();
            break;
            
        case 4: // New hands
            mapImage.src = 'images/cairo-map.jpg';
            manuscriptImage.src = 'images/manuscript1.jpg';
            mapImage.style.filter = 'hue-rotate(30deg)';
            break;
    }
}

// Add interactivity to marginalia
function addMarginaliaBehavior() {
    document.querySelectorAll('.marginal-note').forEach(note => {
        note.addEventListener('click', function() {
            const translation = this.dataset.translation;
            const context = this.dataset.context;
            showPopup(translation, context);
        });
    });
}

// Add interactivity to scholar nodes
function addScholarNodeBehavior() {
    document.querySelectorAll('.scholar-node').forEach(node => {
        node.addEventListener('click', function() {
            const name = this.dataset.name;
            const status = this.dataset.status;
            let info = '';
            
            switch(status) {
                case 'fled':
                    info = `${name} fled Cairo with his library when the Ottomans arrived, taking refuge in Damascus.`;
                    break;
                case 'stayed':
                    info = `${name} remained in Cairo and hid manuscripts in his private residence during the conquest.`;
                    break;
                case 'collaborated':
                    info = `${name} chose to work with the new Ottoman administration, becoming a bridge between old and new systems.`;
                    break;
            }
            
            showPopup(name, info);
        });
    });
}

// Show popup with information
function showPopup(title, content) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h4>${title}</h4>
            <p>${content}</p>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 1000;
        max-width: 400px;
        border: 2px solid #D2691E;
    `;
    
    document.body.appendChild(popup);
}

// Animate network diagram
function animateNetwork() {
    const nodes = document.querySelectorAll('.scholar-node');
    nodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.transform = 'scale(1.2)';
            setTimeout(() => {
                node.style.transform = 'scale(1)';
            }, 300);
        }, index * 200);
    });
}

// Set up the scroller
scroller
    .setup({
        step: '.step',
        offset: 0.5,
        debug: false,
    })
    .onStepEnter(handleStepEnter);

// Handle window resize
window.addEventListener('resize', scroller.resize);