# 🗺️ Accessibility Map for Campus & City Navigation

An innovative web application designed to help users find the shortest and most accessible routes across campus and city environments. This project extends traditional pathfinding algorithms to prioritize accessibility factors like ramps, elevators, and adequate lighting, while also incorporating real-time, crowdsourced data.


## ✨ Features

* **Accessible Pathfinding:** Computes the **most accessible route** between two points by extending **Dijkstra’s algorithm**. The algorithm incorporates custom accessibility weights (e.g., penalties for steep stairs, preference for paths with ramps and elevators).
* **Crowdsourced Feedback:** Enables real-time community reporting through an interactive map interface. Users can flag:
    * **⚠️ Broken Elevators/Ramps**
    * **🚧 Steep/Hazardous Paths**
    * **💡 Poorly Lit Areas**
* **Dual Route Computation:** Provides options to calculate the **Shortest Route** (traditional distance) and the **Most Accessible Route** for user comparison.
* **Modern Web Stack:** Built with **TypeScript** and **React** for a robust, scalable, and responsive user experience.
* **Data-Driven Decisions:** Utilizes custom-parsed geographical data (CSV) for campus paths and building locations.


## 💻 Technologies Used

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React** / **TypeScript** | Building the user interface and ensuring type-safe development. |
| **Pathfinding** | **TypeScript** | Implementation of **Dijkstra's Algorithm** with custom weighting logic. |
| **Backend** | **Node.js** / **Express** | Serving the application and handling route computation API requests. |
| **Mapping** | (Add your specific map library here, e.g., **Leaflet** or **Google Maps API**) | Interactive display of paths, buildings, and accessibility flags. |
| **Data** | **CSV Parsing** | Ingesting and modeling geographical and accessibility data. |


## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/elianaakim/Accessibility-map-for-uw-campus.git](https://github.com/elianaakim/Accessibility-map-for-uw-campus.git)
    cd hw3-campuspaths-main
    ```

2.  **Install dependencies for both client and server:**
    ```bash
    # Install server dependencies
    cd server
    npm install 
    
    # Install client dependencies
    cd ../client
    npm install
    ```

3.  **Run the application:**
    Start the server and client simultaneously (you may need two separate terminal tabs).

    **Server (Backend):**
    ```bash
    cd server
    npm start 
    # The server will run on http://localhost:4000
    ```

    **Client (Frontend):**
    ```bash
    cd client
    npm start 
    # The client will typically run on http://localhost:8080 or similar
    ```

Open your browser to the client URL (e.g., `http://localhost:8080`) to view the application.


## 💡 Accessibility Weighting Logic

The core of this project lies in the modified pathfinding cost function. When computing the Accessible Route, the cost of an edge is calculated as:

$$
\text{Cost} = \text{Distance} + \sum (\text{Accessibility Weights})
$$

Where:
* **Distance:** The physical length of the path segment.
* **Accessibility Weights:** Custom penalties or bonuses applied based on path characteristics:
    * **Elevator/Ramp:** Small negative penalty (a "bonus" for accessibility).
    * **Stairs:** Large positive penalty (deterrent).
    * **Poor Lighting:** Moderate positive penalty.
    * **User-Flagged Issues:** High positive penalty (e.g., for a broken elevator).

This system ensures that paths with high accessibility features are prioritized, even if they are slightly longer than the physically shortest route.


## 👥 Contributing

Feedback, suggestions, and contributions are welcome! If you'd like to contribute, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.
