/**
 * Dijkstra's Algorithm Implementation with Accessibility Weights
 * Extended to support accessibility features like ramps, elevators, and lighting
 */

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

class AccessibilityPathfinder {
    constructor(graph) {
        this.graph = graph;
        this.issues = []; // Store reported accessibility issues
    }

    /**
     * Calculate edge weight based on route preference
     * @param {Object} edge - Edge with distance and accessibility properties
     * @param {string} routeType - 'shortest' or 'accessible'
     * @returns {number} - Calculated weight
     */
    calculateWeight(edge, routeType) {
        if (routeType === 'shortest') {
            // For shortest path, just use distance
            return edge.distance;
        }

        // For accessible path, consider accessibility features
        let weight = edge.distance;
        let accessibilityScore = 0;

        // Ramps reduce the accessibility cost
        if (edge.hasRamp) {
            accessibilityScore += 10;
        }

        // Elevators improve accessibility
        if (edge.hasElevator) {
            accessibilityScore += 15;
        }

        // Good lighting improves accessibility
        if (edge.goodLighting) {
            accessibilityScore += 5;
        }

        // Check if this path has reported issues
        const pathIssues = this.issues.filter(issue => 
            (issue.location === edge.from || issue.location === edge.to) &&
            issue.active
        );

        // Penalize paths with issues
        pathIssues.forEach(issue => {
            if (issue.type === 'elevator' && edge.hasElevator) {
                accessibilityScore -= 20; // Major penalty for broken elevator
            } else if (issue.type === 'stairs') {
                accessibilityScore -= 10; // Penalty for steep stairs
            } else if (issue.type === 'lighting' && !edge.goodLighting) {
                accessibilityScore -= 8; // Penalty for poor lighting
            } else if (issue.type === 'ramp' && edge.hasRamp) {
                accessibilityScore -= 12; // Penalty for ramp issues
            }
        });

        // Higher accessibility score means better accessibility
        // We want to minimize cost, so we subtract the score
        // Multiply by a factor to make accessibility features significant
        const accessibilityFactor = 2.0;
        weight = weight - (accessibilityScore * accessibilityFactor);

        // Ensure weight is always positive
        return Math.max(weight, 1);
    }

    /**
     * Find shortest/most accessible path using Dijkstra's algorithm
     * @param {string} start - Starting node
     * @param {string} end - Ending node
     * @param {string} routeType - 'shortest' or 'accessible'
     * @returns {Object} - Path and distance information
     */
    findPath(start, end, routeType = 'shortest') {
        const distances = {};
        const previous = {};
        const pq = new PriorityQueue();
        const visited = new Set();

        // Initialize distances
        for (let node in this.graph.nodes) {
            distances[node] = Infinity;
            previous[node] = null;
        }
        distances[start] = 0;
        pq.enqueue(start, 0);

        while (!pq.isEmpty()) {
            const { val: currentNode } = pq.dequeue();

            if (visited.has(currentNode)) continue;
            visited.add(currentNode);

            if (currentNode === end) {
                // Build path
                const path = [];
                let current = end;
                while (current) {
                    path.unshift(current);
                    current = previous[current];
                }

                return {
                    path,
                    distance: distances[end],
                    routeType
                };
            }

            // Get neighbors
            const edges = this.graph.edges.filter(e => e.from === currentNode);

            for (let edge of edges) {
                const neighbor = edge.to;
                const weight = this.calculateWeight(edge, routeType);
                const distance = distances[currentNode] + weight;

                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    previous[neighbor] = currentNode;
                    pq.enqueue(neighbor, distance);
                }
            }
        }

        return null; // No path found
    }

    /**
     * Add an accessibility issue report
     * @param {Object} issue - Issue object with location, type, and description
     */
    addIssue(issue) {
        const newIssue = {
            id: Date.now(),
            timestamp: new Date(),
            active: true,
            ...issue
        };
        this.issues.push(newIssue);
        return newIssue;
    }

    /**
     * Get all active issues
     * @returns {Array} - Array of active issues
     */
    getActiveIssues() {
        return this.issues.filter(issue => issue.active);
    }

    /**
     * Get issues for a specific location
     * @param {string} location - Location identifier
     * @returns {Array} - Array of issues at that location
     */
    getIssuesForLocation(location) {
        return this.issues.filter(issue => 
            issue.location === location && issue.active
        );
    }

    /**
     * Resolve an issue
     * @param {number} issueId - Issue ID to resolve
     */
    resolveIssue(issueId) {
        const issue = this.issues.find(i => i.id === issueId);
        if (issue) {
            issue.active = false;
        }
    }
}
