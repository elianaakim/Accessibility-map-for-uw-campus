/**
 * Main Application Logic
 * Handles UI interactions, map rendering, and integrates pathfinding with feedback system
 */

// Initialize the pathfinder with campus data
const pathfinder = new AccessibilityPathfinder(campusGraph);

// State management
let selectedStart = null;
let selectedEnd = null;
let currentRoute = null;

// DOM Elements
const startSelect = document.getElementById('start-location');
const endSelect = document.getElementById('end-location');
const routeTypeSelect = document.getElementById('route-type');
const findRouteBtn = document.getElementById('find-route-btn');
const routeInfo = document.getElementById('route-info');

const issueLocationSelect = document.getElementById('issue-location');
const issueTypeSelect = document.getElementById('issue-type');
const issueDescription = document.getElementById('issue-description');
const reportIssueBtn = document.getElementById('report-issue-btn');
const issuesContainer = document.getElementById('issues-container');

const mapSvg = document.getElementById('map-svg');

/**
 * Initialize the application
 */
function init() {
    populateLocationSelects();
    renderMap();
    setupEventListeners();
    
    // Add some sample issues for demonstration
    addSampleIssues();
    updateIssuesList();
}

/**
 * Populate location select dropdowns with buildings
 */
function populateLocationSelects() {
    const locations = Object.keys(campusGraph.nodes).map(key => ({
        id: key,
        name: campusGraph.nodes[key].name
    })).sort((a, b) => a.name.localeCompare(b.name));

    [startSelect, endSelect, issueLocationSelect].forEach(select => {
        locations.forEach(loc => {
            const option = document.createElement('option');
            option.value = loc.id;
            option.textContent = loc.name;
            select.appendChild(option);
        });
    });
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    findRouteBtn.addEventListener('click', handleFindRoute);
    reportIssueBtn.addEventListener('click', handleReportIssue);
    
    // Enable find route button only when both locations are selected
    [startSelect, endSelect].forEach(select => {
        select.addEventListener('change', () => {
            findRouteBtn.disabled = !startSelect.value || !endSelect.value;
        });
    });
    
    findRouteBtn.disabled = true;
}

/**
 * Handle find route button click
 */
function handleFindRoute() {
    const start = startSelect.value;
    const end = endSelect.value;
    const routeType = routeTypeSelect.value;

    if (!start || !end) {
        showToast('Please select both start and end locations', 'error');
        return;
    }

    if (start === end) {
        showToast('Start and end locations must be different', 'error');
        return;
    }

    selectedStart = start;
    selectedEnd = end;

    const result = pathfinder.findPath(start, end, routeType);

    if (result) {
        currentRoute = result;
        displayRouteInfo(result);
        renderMap();
        showToast('Route found successfully!', 'success');
    } else {
        showToast('No route found between selected locations', 'error');
        routeInfo.classList.remove('visible');
    }
}

/**
 * Display route information
 */
function displayRouteInfo(result) {
    const pathNames = result.path.map(nodeId => campusGraph.nodes[nodeId].name);
    
    let accessibilityFeatures = [];
    const edges = [];
    
    // Get edges along the path
    for (let i = 0; i < result.path.length - 1; i++) {
        const from = result.path[i];
        const to = result.path[i + 1];
        const edge = campusGraph.edges.find(e => e.from === from && e.to === to);
        if (edge) {
            edges.push(edge);
            if (edge.hasRamp) accessibilityFeatures.push('Ramps available');
            if (edge.hasElevator) accessibilityFeatures.push('Elevators available');
            if (edge.goodLighting) accessibilityFeatures.push('Well-lit paths');
        }
    }

    const uniqueFeatures = [...new Set(accessibilityFeatures)];
    
    let html = `
        <h3>${result.routeType === 'shortest' ? 'Shortest Route' : 'Most Accessible Route'}</h3>
        <p><strong>Path:</strong> ${pathNames.join(' → ')}</p>
        <p><strong>Distance Score:</strong> ${result.distance.toFixed(2)}</p>
        <p><strong>Number of Segments:</strong> ${result.path.length - 1}</p>
    `;
    
    if (uniqueFeatures.length > 0) {
        html += `<p><strong>Accessibility Features:</strong></p><ul>`;
        uniqueFeatures.forEach(feature => {
            html += `<li>${feature}</li>`;
        });
        html += `</ul>`;
    }

    // Check for issues along the route
    const routeIssues = [];
    result.path.forEach(nodeId => {
        const issues = pathfinder.getIssuesForLocation(nodeId);
        routeIssues.push(...issues);
    });

    if (routeIssues.length > 0) {
        html += `<p style="color: #f44336; font-weight: bold;">⚠️ ${routeIssues.length} accessibility issue(s) reported along this route</p>`;
    }

    routeInfo.innerHTML = html;
    routeInfo.classList.add('visible');
}

/**
 * Handle report issue button click
 */
function handleReportIssue() {
    const location = issueLocationSelect.value;
    const type = issueTypeSelect.value;
    const description = issueDescription.value.trim();

    if (!location) {
        showToast('Please select a location', 'error');
        return;
    }

    if (!description) {
        showToast('Please provide a description', 'error');
        return;
    }

    const issue = {
        location,
        type,
        description,
        locationName: campusGraph.nodes[location].name
    };

    pathfinder.addIssue(issue);
    updateIssuesList();
    renderMap();

    // Clear form
    issueLocationSelect.value = '';
    issueTypeSelect.value = 'elevator';
    issueDescription.value = '';

    showToast('Issue reported successfully! Thank you for your feedback.', 'success');
}

/**
 * Update the issues list display
 */
function updateIssuesList() {
    const issues = pathfinder.getActiveIssues();
    
    if (issues.length === 0) {
        issuesContainer.innerHTML = '<p class="no-issues">No issues reported yet</p>';
        return;
    }

    issuesContainer.innerHTML = issues.slice().reverse().slice(0, 10).map(issue => {
        const typeLabels = {
            elevator: 'Broken Elevator',
            stairs: 'Steep Stairs',
            lighting: 'Poor Lighting',
            ramp: 'Ramp Issue',
            other: 'Other Issue'
        };

        const timeAgo = getTimeAgo(issue.timestamp);

        return `
            <div class="issue-item ${issue.type}">
                <h4>${typeLabels[issue.type]}</h4>
                <div class="issue-meta">
                    <strong>${issue.locationName}</strong> • ${timeAgo}
                </div>
                <div class="issue-desc">${issue.description}</div>
            </div>
        `;
    }).join('');
}

/**
 * Render the campus map with buildings and paths
 */
function renderMap() {
    // Clear existing map
    mapSvg.innerHTML = '';

    // Draw all paths (edges) first so they appear behind buildings
    campusGraph.edges.forEach(edge => {
        const fromNode = campusGraph.nodes[edge.from];
        const toNode = campusGraph.nodes[edge.to];
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromNode.x);
        line.setAttribute('y1', fromNode.y);
        line.setAttribute('x2', toNode.x);
        line.setAttribute('y2', toNode.y);
        line.setAttribute('class', 'path-line');
        mapSvg.appendChild(line);
    });

    // Draw route if one is selected
    if (currentRoute) {
        for (let i = 0; i < currentRoute.path.length - 1; i++) {
            const fromNode = campusGraph.nodes[currentRoute.path[i]];
            const toNode = campusGraph.nodes[currentRoute.path[i + 1]];
            
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', fromNode.x);
            line.setAttribute('y1', fromNode.y);
            line.setAttribute('x2', toNode.x);
            line.setAttribute('y2', toNode.y);
            line.setAttribute('class', currentRoute.routeType === 'accessible' ? 'accessible-route-line' : 'route-line');
            mapSvg.appendChild(line);
        }
    }

    // Draw buildings (nodes)
    Object.keys(campusGraph.nodes).forEach(nodeId => {
        const node = campusGraph.nodes[nodeId];
        
        // Building circle
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', 25);
        circle.setAttribute('class', 'building');
        
        if (nodeId === selectedStart || nodeId === selectedEnd) {
            circle.classList.add('selected');
        }
        
        circle.addEventListener('click', () => handleBuildingClick(nodeId));
        circle.innerHTML = `<title>${node.name}\n${node.description}</title>`;
        
        mapSvg.appendChild(circle);

        // Building label
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', node.x);
        text.setAttribute('y', node.y + 5);
        text.setAttribute('class', 'building-label');
        text.textContent = nodeId.substring(0, 3).toUpperCase();
        mapSvg.appendChild(text);
    });

    // Draw issue markers
    const issues = pathfinder.getActiveIssues();
    issues.forEach(issue => {
        const node = campusGraph.nodes[issue.location];
        if (node) {
            const marker = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            marker.setAttribute('cx', node.x + 15);
            marker.setAttribute('cy', node.y - 15);
            marker.setAttribute('r', 8);
            marker.setAttribute('class', 'issue-marker');
            marker.innerHTML = `<title>⚠️ ${issue.description}</title>`;
            mapSvg.appendChild(marker);
        }
    });
}

/**
 * Handle building click on map
 */
function handleBuildingClick(nodeId) {
    if (!selectedStart) {
        selectedStart = nodeId;
        startSelect.value = nodeId;
    } else if (!selectedEnd && nodeId !== selectedStart) {
        selectedEnd = nodeId;
        endSelect.value = nodeId;
    } else {
        selectedStart = nodeId;
        selectedEnd = null;
        startSelect.value = nodeId;
        endSelect.value = '';
        currentRoute = null;
        routeInfo.classList.remove('visible');
    }
    
    findRouteBtn.disabled = !selectedStart || !selectedEnd;
    renderMap();
}

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

/**
 * Get time ago string
 */
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
}

/**
 * Add sample issues for demonstration
 */
function addSampleIssues() {
    // Add a few sample issues to demonstrate the feature
    pathfinder.addIssue({
        location: 'communications',
        locationName: campusGraph.nodes['communications'].name,
        type: 'lighting',
        description: 'Path from Communications Building is poorly lit at night'
    });

    pathfinder.addIssue({
        location: 'meany',
        locationName: campusGraph.nodes['meany'].name,
        type: 'stairs',
        description: 'Steep stairs at entrance, difficult for wheelchair users'
    });
}

// Initialize the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
