# 🌱 AgriGuard AI

> **Empowering farmers with intelligent, data-driven crop diagnostics and AI-powered agronomy recommendations.**

---

## 📋 Table of Contents
1. [Project Overview](#-2-project-overview)
2. [Problem Statement](#-3-problem-statement)
3. [Features](#-4-features)
4. [Technology Stack](#-5-technology-stack)
5. [System Architecture](#-6-system-architecture)
6. [Project Workflow](#-7-project-workflow)
7. [Prompt Engineering](#-8-prompt-engineering)
8. [Security Features](#-9-security-features)
9. [Performance Optimizations](#-10-performance-optimizations)
10. [Deployment](#-11-deployment)
11. [Folder Structure](#-12-folder-structure)
12. [Installation Guide](#-13-installation-guide)
13. [Future Enhancements](#-14-future-enhancements)
14. [Contributors](#-15-contributors)
15. [License](#-16-license)

---

## 🔍 2. Project Overview

**AgriGuard AI** is a state-of-the-art, AI-powered agricultural decision support and diagnostic platform. It assists farmers, agronomists, and agricultural extension officers in maximizing crop yield and soil health by analyzing local soil properties and real-time environmental factors.

By leveraging machine learning and advanced generative AI models, the platform provides tailored insights:
* **🌾 AI Crop Recommendation**: Predicts the most suitable crop for cultivation based on soil properties and weather parameters.
* **🧪 Fertilizer Optimization**: Suggests exact N-P-K nutrient blends and organic alternatives with precise measurements.
* **💧 Smart Irrigation Advice**: Calculates water requirements based on real-time soil type and rainfall data.
* **💡 Actionable Farming Tips**: Offers seasonal guidance, soil amendment instructions, and preventative measures.
* **📜 Historical Reporting**: Keeps a comprehensive audit trail of past soil checks and predictions for seasonal comparisons.

---

## ⚠️ 3. Problem Statement

Modern agriculture faces significant yield losses due to unpredictable climate shifts, soil nutrient depletion, and a lack of scientific guidance. Farmers often struggle to make informed decisions because:
* **Soil & Climate Fluctuations**: Unpredictable rain and temperature patterns make traditional crop cycles unreliable.
* **Information Asymmetry**: Access to real-time, localized advice on fertilization dosages and disease diagnostics is limited.
* **Over-fertilization**: Excessive application of fertilizers leads to soil toxicity, high input costs, and environmental pollution.

**AgriGuard AI** bridges this gap. By taking direct measurements of:
1. **Soil Properties**: Nitrogen (N), Phosphorus (P), Potassium (K), soil type, and pH level.
2. **Climate Factors**: Temperature, humidity, rainfall, and geographical location.

It feeds this multi-dimensional data into an advanced rule-engine and AI compiler to recommend the absolute best-matching crop and treatment regime.

---

## ✨ 4. Features

* **🔑 Secure Authentication**: Role-based access control (Farmer, Extension Officer, Admin) supported by JSON Web Tokens.
* **🧠 AI Crop Predictor**: Multi-variable analytical engine for soil chemistry and weather metrics.
* **🥗 Fertilizer & Disease Guide**: Visual database containing diagnostic records, crop/treatment images, and target dosages.
* **📊 Live Telemetry Dashboard**: High-fidelity charts showing soil history, local weather statistics, and notification alerts.
* **📱 Responsive Web Design**: Fully fluid interface using React and Tailwind CSS optimized for desktop, tablet, and mobile browsers.
* **☁️ Cloud-Ready Architecture**: Native support for persistent object storage and secure database infrastructure.
* **⚡ Ultra-low Latency**: Sub-second rendering and fast API endpoints optimized for rural bandwidth settings.

---

## 🛠️ 5. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js + TypeScript + Tailwind CSS | User interface, responsive layout, state management |
| **Backend** | Node.js + Express.js | REST APIs, authentication validation, and business logic |
| **Database** | PostgreSQL + Prisma ORM | Relational data persistence, schema migrations, and optimization |
| **Authentication** | JWT + bcrypt | Secure tokens, password hashing, and endpoint shielding |
| **AI Layer** | Google Gemini API | Structured reasoning, crop predictions, and expert chat interaction |
| **API Protocol** | RESTful HTTP | Inter-component communication and structured JSON response payloads |
| **Cloud Storage** | Google Cloud Storage | Storage of static assets, diagnostic photos, and system logs |
| **Deployment** | Docker + Google Cloud Run | Serverless container hosting and auto-scaling |
| **VCS** | Git + GitHub | Code version control and collaboration |

---

## 🏗️ 6. System Architecture

The following diagram describes the end-to-end data flow and architectural structure of AgriGuard AI:

```mermaid
graph TD
    User([👨‍🌾 Farmer / Extension Officer]) -->|Interacts with UI| FE[💻 React Frontend]
    FE -->|API Request with JWT Auth| BE[⚙️ Express Backend]
    BE -->|Formats Soil & Climate Inputs| PE[🧠 Prompt Engineering Layer]
    PE -->|Sends Structured Prompt| Gemini[🤖 Google Gemini API]
    Gemini -->|Returns AI Recommendation JSON| BE
    BE -->|Audit Log / Saves Output| DB[(🗄️ PostgreSQL Database)]
    BE -->|Returns Finished Analysis| FE
```

### Component Communication
1. **User → Frontend**: User inputs soil metrics (N, P, K, pH) and geographic location in the React dashboard.
2. **Frontend → Backend**: React sends a secure POST request to the Express API backend, authenticated using a Bearer JWT token.
3. **Backend → AI Layer**: The backend formats the inputs into a highly constrained prompt using custom templates.
4. **AI Layer → Backend**: Google Gemini API executes inference and returns a standardized JSON payload.
5. **Backend → Database & Frontend**: The backend saves the telemetry output using Prisma ORM to PostgreSQL and relays the structured analysis to the client dashboard.

---

## 🔄 7. Project Workflow

```
[ User Authentication ]
        │
        ▼
[ Input Agricultural Parameters ]  (N, P, K, Soil Type, pH, Rain, Location)
        │
        ▼
[ Secure API Validation ]           (Backend sanitizes input & verifies session token)
        │
        ▼
[ Prompt Construction ]             (Parameters compiled into structured LLM prompt)
        │
        ▼
[ Gemini API Inference ]            (Structured text/JSON analysis generated by Google AI)
        │
        ▼
[ Database Persistence ]            (Results logged to PostgreSQL for future telemetry)
        │
        ▼
[ Frontend Visualization ]          (Rendered with custom advice, dosages, and warnings)
```

---

## 📝 8. Prompt Engineering

To guarantee the reliability, structure, and medical-grade accuracy of crop recommendations, AgriGuard AI utilizes a strict system instruction prompt template. This formats agricultural parameters before they are sent to the Google Gemini model.

### Sample System Template
```markdown
You are an expert agronomist advisor representing AgriGuard AI. 
Analyze the following soil and climate properties:
- Soil Chemistry: Nitrogen: {nitrogen} ppm, Phosphorus: {phosphorus} ppm, Potassium: {potassium} ppm, pH: {phValue}
- Environmental: Location: {location}, Soil Type: {soilType}, Temperature: {temperature}°C, Rainfall: {rainfall} mm

Provide a JSON output matching this strict schema:
{
  "bestCrop": "string",
  "confidence": 0.0,
  "suitableFertilizers": ["string"],
  "irrigationRecommendation": "string",
  "diseasePrevention": ["string"],
  "seasonalAdvice": "string",
  "riskLevel": "Low | Medium | High",
  "explanation": "string"
}
```

---

## 🔒 9. Security Features

* **JSON Web Tokens (JWT)**: Secure user sessions with short-lived tokens and cryptographically signed headers.
* **bcrypt Password Hashing**: Protects stored credentials against rainbow-table and brute-force cracking.
* **Input Sanitization**: Strict Express validation rules to block SQL injections, XSS vectors, and invalid agronomic readings.
* **Role-Based Access Control (RBAC)**: Distinguishes between Farmers, Inspectors, and Admins to secure access to system-level log records.
* **Environment Variables**: Sensitive API keys and database credentials are kept out of code version control.

---

## ⚡ 10. Performance Optimizations

* **State Cache & Lazy Loading**: Reduces frontend page render overhead by loading large guide pages dynamically.
* **Prisma ORM Indexing**: Database indexes placed on frequently queried fields like `userId` and `timestamp`.
* **Database Connection Pooling**: Prevents request exhaustion by recycling active socket connections in PostgreSQL.
* **CSS Minification**: Uses Tailwind’s build engine to purge unused class definitions and optimize load speeds.

---

## 🚀 11. Deployment

AgriGuard AI is built for containerized microservices and is ready for production hosting:

* **Docker**: The frontend and backend services are compiled into isolated OCI-compliant container images.
* **Google Cloud Run**: Containers are deployed serverless, dynamically scaling down to zero when idle to save resource costs.
* **Google Cloud SQL**: Managed PostgreSQL instance with automated backups, replicas, and private virtual connection tunnels.
* **Google Cloud Storage**: Serves static media assets (crop visuals, disease guides) with globally cached edge delivery.

---

## 📂 12. Folder Structure

```
agriguard-ai/
├── frontend/             # React SPA (TypeScript + Tailwind)
│   ├── src/
│   │   ├── assets/       # Visual UI media
│   │   ├── components/   # Modular dashboard views
│   │   └── types/        # Core TypeScript interfaces
│   └── package.json
├── backend/              # Express REST API Server
│   ├── routes/           # REST endpoints
│   └── server.ts
├── database/             # Prisma schema & SQL migrations
│   └── schema.prisma
├── docker/               # Dockerfiles for multi-stage builds
└── docs/                 # Architectural specifications & guides
```

---

## 💻 13. Installation Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher)
* [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

### Setup Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/dharnishkris5-maker/AgriGuard-ai.git
   cd agriguard-ai
   ```

2. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL="postgresql://user:password@localhost:5432/agriguard"
   GEMINI_API_KEY="your_google_gemini_api_key_here"
   JWT_SECRET="your_cryptographic_secret_hash_here"
   ```

3. **Install Dependencies**
   ```bash
   # Install root and backend dependencies
   npm install
   ```

4. **Initialize Database**
   ```bash
   npx prisma db push
   ```

5. **Start Dev Server**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000` to view the application.

---

## 🔮 14. Future Enhancements

* **🌦️ Live Weather Integration**: Replace mock weather generation with a live OpenWeatherMap API connection.
* **📸 Leaf Disease Scanner**: Enable image upload and use computer vision (Google Vision API) to detect leaf spots instantly.
* **🗣️ Voice Commands**: Integrated voice-to-text features in regional languages to support farmers with low literacy levels.
* **🔌 IoT Sensor Sync**: Auto-fetch N-P-K readings directly from physical IoT soil probes placed in the fields.

---

## 👥 15. Contributors

* **Your Name / Team Lead** - *Full Stack Engineer / AI Specialist* - [GitHub Profile](https://github.com/)
* **Team Member 2** - *Database Architect / Devops Engineer* - [GitHub Profile](https://github.com/)
* **Team Member 3** - *Frontend Engineer / UI UX Designer* - [GitHub Profile](https://github.com/)

---

## 📄 16. License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
