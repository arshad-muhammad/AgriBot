# AgriDiagnost – Crop Disease Assessment System

AgriDiagnost is a professional agricultural research platform designed for structured crop disease assessment and condition reporting. Utilizing advanced AI (Google Gemini), it analyzes crop images to identify pathologies, recommend treatments, and generate institutional-grade reports.

## Features

- **AI-Powered Analysis**: Instant identification of crop diseases using computer vision and pattern analysis (Gemini 3 Flash).
- **Detailed Reporting**: Generates comprehensive reports including diagnosis confidence, severity, symptoms, causes, and treatment protocols (chemical & organic).
- **PDF Generation**: Exportable, printable reports formatted for institutional use.
- **Historical Tracking**: Local storage persistence for past assessments.
- **Institutional Admin Panel**: Dashboard for system monitoring and management.

## Setup Instructions

This application is built using React and TypeScript, leveraging ES Modules for a modern, lightweight architecture.

### Prerequisites

1.  **Google Gemini API Key**: You need a valid API key from [Google AI Studio](https://aistudio.google.com/).
2.  **Web Server**: A local static server to serve the ES modules.

### Running Locally

1.  **Download the Code**: Save the project files to a local directory.

2.  **Environment Configuration**:
    The application expects the API key to be available via `process.env.API_KEY`.
    
    *If running in a local environment where `process.env` is not automatically polyfilled, you may need to manually configure the key in `services/geminiService.ts` for testing purposes (do not commit keys to version control).*

3.  **Start a Local Server**:
    Run a static server in the project root.
    
    Using Python:
    ```bash
    python3 -m http.server 8000
    ```
    
    Using Node.js:
    ```bash
    npx serve
    ```

4.  **Access the Application**:
    Open your browser and navigate to `http://localhost:8000` (or the port shown in your terminal).

## User Flow

### 1. Initiation
*   **Landing Page**: Users are greeted with the platform overview.
*   **Action**: Click "Start Analysis" or "Dashboard" to begin a new assessment.

### 2. Data Collection (Dashboard)
*   **Image Upload**: User uploads a high-resolution image of the crop specimen.
*   **Metadata Entry**:
    *   **Crop Type**: Select from presets (Wheat, Rice, etc.) or specify custom.
    *   **Location**: Field or plot identifier.
    *   **Soil Type**: Contextual soil information.
    *   **Symptoms**: Optional manual observations.
*   **Submission**: Click "Generate Analysis Report" to send data to the AI model.

### 3. Analysis & Reporting
*   **Processing**: The system analyzes the visual patterns against agricultural databases.
*   **Report View**: Displays:
    *   **Diagnosis**: Disease name, confidence score, and description.
    *   **Severity**: Color-coded impact level (Low/Moderate/Severe).
    *   **Interventions**: Specific chemical and organic treatment options.
*   **Export**: Click "Download Full Report (PDF)" to trigger the browser's print-to-PDF dialog with a clean, print-optimized layout.

### 4. Record Keeping
*   **History**: All generated reports are automatically saved to local storage.
*   **Review**: Users can browse the "Report History" table and revisit any past report.

## Technology Stack

*   **Frontend**: React 19, TypeScript
*   **Styling**: Tailwind CSS
*   **AI Model**: Google Gemini (gemini-3-flash-preview)
*   **Architecture**: ES Modules (No build step required for modern browsers)