# Pole Structural Analyzer (KORI BALI)

A web-based structural analysis system designed to calculate mechanical loads, material specifications, and structural integrity for utility poles with high precision and automation.

## 🚀 Key Features

- **Multi-Step Pole Analysis**: Supports configurations of up to 4 pole segments (_Step Poles_) with both _Straight_ and _Tapered_ type support.
- **Environmental & Design Standards**: Dynamic adjustments for design standards and local wind speed conditions.
- **Comprehensive Load Calculation**:
  - **Direct Objects (DO)**: Calculates wind and seismic loads for mounted equipment (up to 25 objects).
  - **Overhead Wires (OHW)**: Analyzes wire tension, sagging, span, and clearance loads.
- **Real-time Validation**: Strict validation engine ensures technical data integrity before processing complex mechanical formulas.
- **Automated Technical Reporting**: Generates comprehensive, print-ready structural analysis reports.
- **Smart Persistence**: Integrated _Session Storage_ auto-save functionality to prevent data loss upon page refresh.

## 🛠️ Tech Stack

- **Framework**: React.js
- **Styling**: Tailwind CSS (Responsive Design)
- **Iconography**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useEffect, useRef) utilizing a _Namespace Logic_ architecture.

## 📂 Architecture Structure

This project follows a strict **Separation of Concerns** between Logic and UI:

- `src/components/pole-analyzer/`: UI Components (Input Forms, Result Tables, Modals).
- `src/utils/pole-analyzer/`: Core Logic (Mechanical calculations, Validation, State handlers).
- `src/pages/`: Main application entry points.

## ⚙️ Getting Started

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/username/pole-structural-analyzer.git](https://github.com/username/pole-structural-analyzer.git)
    ```
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Run in Development Mode**
    ```bash
    npm start
    ```
4.  **Build for Production**
    ```bash
    npm run build
    ```

## 📊 Engineering Calculation Variables

The application processes various critical mechanical parameters, including:

- **Allowable Stress**: $fb, stb, sts, stc$
- **Section Properties**: _Section Area, Section Modulus ($Z$), Moment of Inertia ($I$)_
- **Stability Metrics**: _Radius of Gyration, Taper Ratio_
- **Force Vectors**: _Wind Force ($WL$), Seismic Load ($SL$), Fixed Load ($FL$)_

---

### 📝 Developer's Note

The system is built on **Modular Thinking** principles. All calculation logic is decoupled into standalone utility functions, allowing for independent maintenance and mathematical testing without affecting UI stability.

---

**Developed for High-Precision Engineering Analysis.**
