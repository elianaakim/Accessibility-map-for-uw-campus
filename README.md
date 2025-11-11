# UW Campus Accessibility Map

A web application that helps students and visitors find the most accessible routes across the University of Washington campus. The application uses an extended Dijkstra's algorithm that considers accessibility features like ramps, elevators, and lighting, and includes a crowdsourced feedback system for reporting accessibility issues in real-time.

## Features

### 🗺️ Intelligent Pathfinding
- **Shortest Route Mode**: Finds the quickest path between two locations based on distance
- **Most Accessible Route Mode**: Prioritizes paths with:
  - Wheelchair ramps
  - Elevators
  - Well-lit walkways
  - Smooth surfaces

### 🔄 Extended Dijkstra's Algorithm
The pathfinding algorithm has been extended with accessibility weights:
- **Ramps**: +10 accessibility score
- **Elevators**: +15 accessibility score
- **Good Lighting**: +5 accessibility score
- **Reported Issues**: Negative scores that dynamically adjust based on user feedback

### 📣 Crowdsourced Feedback System
Users can report accessibility issues in real-time:
- **Broken Elevators**: Out-of-service elevators that impact accessibility
- **Steep Stairs**: Difficult or inaccessible stairways
- **Poor Lighting**: Unsafe or poorly lit paths
- **Ramp Issues**: Broken or blocked wheelchair ramps
- **Other Issues**: Any other accessibility concerns

### 🎨 Interactive Map
- Visual representation of UW campus buildings and pathways
- Click-to-select buildings for route planning
- Color-coded routes (blue for shortest, orange for accessible)
- Issue markers showing reported accessibility problems
- Real-time route visualization

## How It Works

### Accessibility Weight Calculation
The algorithm calculates path weights based on:

```javascript
weight = distance - (accessibilityScore × accessibilityFactor)
```

Where:
- `distance`: Physical distance between two points
- `accessibilityScore`: Sum of positive features (ramps, elevators, lighting) minus penalties from reported issues
- `accessibilityFactor`: Multiplier (2.0) that makes accessibility features significant

### Issue Impact
When users report issues, they automatically affect route calculations:
- Broken elevators: -20 points on paths with elevators
- Steep stairs: -10 points
- Poor lighting: -8 points on paths without good lighting
- Ramp issues: -12 points on paths with ramps

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server or installation required - runs entirely in the browser!

### Running the Application

1. Clone the repository:
```bash
git clone https://github.com/elianaakim/Accessibility-map-for-uw-campus.git
cd Accessibility-map-for-uw-campus
```

2. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Linux
xdg-open index.html

# On Windows
start index.html
```

Or simply double-click the `index.html` file.

## Usage

### Finding a Route

1. **Select Start Location**: Choose your starting building from the dropdown menu
2. **Select End Location**: Choose your destination building
3. **Choose Route Type**: Select "Shortest Distance" or "Most Accessible"
4. **Find Route**: Click the "Find Route" button to see your path
5. **View Results**: The route will be displayed on the map with detailed information including:
   - Path through buildings
   - Distance score
   - Number of segments
   - Available accessibility features
   - Any reported issues along the route

### Reporting Issues

1. **Select Location**: Choose the building or area with the accessibility issue
2. **Select Issue Type**: Pick the type of problem from the dropdown
3. **Add Description**: Provide details about the issue
4. **Submit Report**: Click "Report Issue" to help others

### Interactive Map

- **Click buildings** to select them as start/end points
- **Hover over buildings** to see names and descriptions
- **View issue markers** (red circles) to see reported problems
- **Follow colored lines** to see your calculated route

## Project Structure

```
Accessibility-map-for-uw-campus/
├── index.html          # Main HTML structure
├── styles.css          # Styling and responsive design
├── dijkstra.js         # Extended Dijkstra's algorithm implementation
├── campusData.js       # Campus graph data with accessibility attributes
├── app.js              # Main application logic and UI interactions
└── README.md           # Project documentation
```

## Campus Data

The application includes data for 12 major UW campus locations:
- Suzzallo Library
- Odegaard Library
- HUB (Student Union)
- Paul G. Allen Center (CSE)
- Bill & Melinda Gates Center (CSE2)
- Engineering Library
- Paccar Hall (Foster School of Business)
- Communications Building
- Red Square
- Drumheller Fountain
- Health Sciences Building
- Meany Hall

Each path between buildings includes:
- Distance measurement
- Ramp availability
- Elevator access
- Lighting quality

## Technologies Used

- **HTML5**: Structure and semantics
- **CSS3**: Styling with gradients, animations, and responsive design
- **Vanilla JavaScript**: No frameworks required
- **SVG**: Interactive campus map rendering
- **Custom Algorithms**: Extended Dijkstra's pathfinding

## Future Enhancements

- [ ] Integration with real-time campus data APIs
- [ ] User authentication and persistent issue tracking
- [ ] Mobile app version
- [ ] Indoor navigation for multi-floor buildings
- [ ] Weather condition integration (snow, ice affecting accessibility)
- [ ] Community voting on reported issues
- [ ] Accessibility profiles for different mobility needs
- [ ] Voice-guided navigation
- [ ] Integration with UW's official campus maps

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- University of Washington campus community
- Accessibility advocates and users who provided feedback
- Open source pathfinding algorithm implementations

## Contact

For questions, suggestions, or accessibility feedback, please open an issue on GitHub.

---

**Note**: This is a demonstration application. For official UW campus navigation and accessibility information, please visit the official UW website.