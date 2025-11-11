/**
 * UW Campus Graph Data
 * Contains nodes (buildings) and edges (paths) with accessibility information
 */

const campusGraph = {
    nodes: {
        'suzzallo': {
            name: 'Suzzallo Library',
            x: 250,
            y: 200,
            description: 'Main library with multiple floors'
        },
        'odegaard': {
            name: 'Odegaard Library',
            x: 350,
            y: 180,
            description: 'Undergraduate library'
        },
        'hub': {
            name: 'HUB (Student Union)',
            x: 450,
            y: 250,
            description: 'Student union building'
        },
        'cse': {
            name: 'Paul G. Allen Center',
            x: 600,
            y: 180,
            description: 'Computer Science & Engineering'
        },
        'cse2': {
            name: 'Bill & Melinda Gates Center',
            x: 650,
            y: 220,
            description: 'Computer Science & Engineering'
        },
        'engineering': {
            name: 'Engineering Library',
            x: 550,
            y: 300,
            description: 'Engineering resources'
        },
        'paccar': {
            name: 'Paccar Hall',
            x: 400,
            y: 350,
            description: 'Foster School of Business'
        },
        'communications': {
            name: 'Communications Building',
            x: 200,
            y: 300,
            description: 'Communications department'
        },
        'red-square': {
            name: 'Red Square',
            x: 300,
            y: 250,
            description: 'Central campus gathering space'
        },
        'drumheller': {
            name: 'Drumheller Fountain',
            x: 300,
            y: 380,
            description: 'Campus landmark'
        },
        'health-sciences': {
            name: 'Health Sciences Building',
            x: 150,
            y: 400,
            description: 'Health sciences and medical school'
        },
        'meany': {
            name: 'Meany Hall',
            x: 500,
            y: 420,
            description: 'Theater and performance space'
        }
    },

    edges: [
        // Suzzallo connections
        {
            from: 'suzzallo',
            to: 'odegaard',
            distance: 100,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'suzzallo',
            to: 'red-square',
            distance: 80,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'suzzallo',
            to: 'communications',
            distance: 120,
            hasRamp: false,
            hasElevator: false,
            goodLighting: false
        },

        // Odegaard connections
        {
            from: 'odegaard',
            to: 'suzzallo',
            distance: 100,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'odegaard',
            to: 'hub',
            distance: 120,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'odegaard',
            to: 'cse',
            distance: 250,
            hasRamp: false,
            hasElevator: false,
            goodLighting: true
        },

        // HUB connections
        {
            from: 'hub',
            to: 'odegaard',
            distance: 120,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'hub',
            to: 'cse',
            distance: 180,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'hub',
            to: 'engineering',
            distance: 130,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'hub',
            to: 'paccar',
            distance: 110,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'hub',
            to: 'red-square',
            distance: 150,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },

        // CSE connections
        {
            from: 'cse',
            to: 'cse2',
            distance: 60,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'cse',
            to: 'hub',
            distance: 180,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'cse',
            to: 'odegaard',
            distance: 250,
            hasRamp: false,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'cse',
            to: 'engineering',
            distance: 140,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },

        // CSE2 connections
        {
            from: 'cse2',
            to: 'cse',
            distance: 60,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'cse2',
            to: 'engineering',
            distance: 120,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },

        // Engineering connections
        {
            from: 'engineering',
            to: 'cse',
            distance: 140,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'engineering',
            to: 'cse2',
            distance: 120,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'engineering',
            to: 'hub',
            distance: 130,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'engineering',
            to: 'paccar',
            distance: 160,
            hasRamp: true,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'engineering',
            to: 'meany',
            distance: 140,
            hasRamp: false,
            hasElevator: false,
            goodLighting: false
        },

        // Paccar connections
        {
            from: 'paccar',
            to: 'hub',
            distance: 110,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'paccar',
            to: 'engineering',
            distance: 160,
            hasRamp: true,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'paccar',
            to: 'drumheller',
            distance: 100,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'paccar',
            to: 'meany',
            distance: 110,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },

        // Red Square connections
        {
            from: 'red-square',
            to: 'suzzallo',
            distance: 80,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'red-square',
            to: 'hub',
            distance: 150,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'red-square',
            to: 'communications',
            distance: 110,
            hasRamp: false,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'red-square',
            to: 'drumheller',
            distance: 130,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },

        // Communications connections
        {
            from: 'communications',
            to: 'suzzallo',
            distance: 120,
            hasRamp: false,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'communications',
            to: 'red-square',
            distance: 110,
            hasRamp: false,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'communications',
            to: 'drumheller',
            distance: 150,
            hasRamp: true,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'communications',
            to: 'health-sciences',
            distance: 120,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },

        // Drumheller connections
        {
            from: 'drumheller',
            to: 'red-square',
            distance: 130,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'drumheller',
            to: 'paccar',
            distance: 100,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'drumheller',
            to: 'communications',
            distance: 150,
            hasRamp: true,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'drumheller',
            to: 'health-sciences',
            distance: 180,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'drumheller',
            to: 'meany',
            distance: 200,
            hasRamp: false,
            hasElevator: false,
            goodLighting: false
        },

        // Health Sciences connections
        {
            from: 'health-sciences',
            to: 'communications',
            distance: 120,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'health-sciences',
            to: 'drumheller',
            distance: 180,
            hasRamp: true,
            hasElevator: true,
            goodLighting: true
        },
        {
            from: 'health-sciences',
            to: 'meany',
            distance: 350,
            hasRamp: true,
            hasElevator: false,
            goodLighting: false
        },

        // Meany connections
        {
            from: 'meany',
            to: 'paccar',
            distance: 110,
            hasRamp: true,
            hasElevator: false,
            goodLighting: true
        },
        {
            from: 'meany',
            to: 'engineering',
            distance: 140,
            hasRamp: false,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'meany',
            to: 'drumheller',
            distance: 200,
            hasRamp: false,
            hasElevator: false,
            goodLighting: false
        },
        {
            from: 'meany',
            to: 'health-sciences',
            distance: 350,
            hasRamp: true,
            hasElevator: false,
            goodLighting: false
        }
    ]
};
