# ResumeIQ – AI-Powered Resume Analyzer

> **Tagline:** *"Know Your Match. Land Your Next Role."*

ResumeIQ is a premium, modern SaaS web application that empowers job candidates to benchmark, analyze, and optimize their resumes against specific job descriptions using AI and applicant tracking system (ATS) algorithms.

Inspired by the design aesthetics of **Linear**, **Vercel**, and **Stripe**, ResumeIQ features a minimal, sophisticated UI with electric violet/indigo accents, typography, micro-interactions, and visual data representations.

---

## 🚀 Key Features

### 1. ATS Compatibility Scoring
- **Dynamic Circular Progress Gauge:** Visual 0–100 weighted ATS score with algorithmic pass rates.
- **Score Tiering:** Immediate status classification (*Strong Match*, *Good Match*, *Needs Improvement*).
- **Executive AI Summary:** High-level narrative highlighting candidate strengths and primary gap areas.

### 2. Category-Wise Multi-Dimensional Scoring
- **5 Evaluation Dimensions:**
  - **Skills Match (30% weight):** Core programming language and framework overlap.
  - **Experience Relevance (25% weight):** Seniority, domain experience, and career trajectory.
  - **Education Match (15% weight):** Academic credentials and degree alignment.
  - **Keyword Optimization (20% weight):** Critical ATS token density and technical vocabulary.
  - **Resume Structure (10% weight):** Hierarchy, formatting parseability, and standard section tagging.
- **Radar Match Matrix:** Interactive spider chart powered by Recharts comparing candidate dimensions against target role benchmarks.

### 3. Skills Gap & Alignment Analysis
- **Matched Skills:** Verified technical competencies detected in the resume with occurrence counters and category tags (e.g., Python, React, SQL, TypeScript, REST APIs).
- **Missing Skills:** Detected skill requirements missing from the resume, categorized by priority (*High Priority*, *Core Requirement*, *Bonus Qualification*) with amber/rose indicators (e.g., AWS Lambda, Amazon S3, Docker, CI/CD).
- **Category Filters:** Quickly toggle between Technical, Cloud/DevOps, Architecture, and All skills.

### 4. AI-Powered Strategic Recommendations
- **Actionable Advice:** High-impact recommendations covering AWS cloud experience, Docker containerization, measurable impact metrics, and keyword density.
- **1-Click Bullet Point Copy:** Ready-to-use resume bullet points tailored to the target role with one-click clipboard copying.

### 5. Keyword Density & Frequency Analysis
- **Coverage Meter:** Overall keyword match percentage and count.
- **Searchable Keyword Table:** Detailed breakdown of token importance (*Critical*, *High*, *Medium*), job posting frequency, and resume match count.

### 6. PDF Upload & Sample Quick Loaders
- **Drag-and-Drop Area:** Validates PDF format, file size (<10MB), and displays progress animations.
- **Pre-Loaded Sample Resumes:** 1-click test profiles (e.g., Alex Morgan – Senior Full-Stack Engineer, Sarah Chen – AI Specialist) for instant evaluation without uploading a file.
- **Sample Job Descriptions:** Pre-filled job postings for Senior Full-Stack Cloud Engineer, AI/ML Specialist, and Staff Frontend Engineer.

### 7. Downloadable ATS Diagnostic Dossier
- **Print & PDF Export:** Clean, formatted print layout compatible with standard browser print-to-PDF (`window.print()`).
- **JSON Export:** Download structured evaluation data.

### 8. Historical Scans & Collapsible Sidebar
- **Previous Analyses:** Searchable scan history stored in user session storage.
- **Collapsible Sidebar:** Responsive navigation between Overview, Analyze, History, and Settings.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite |
| **Styling** | Tailwind CSS with custom brand palette & soft shadows |
| **Routing** | React Router DOM v6 |
| **Icons** | Lucide React |
| **Visualizations** | Recharts (Radar charts, Responsive containers) & custom SVG gauges |
| **Networking** | Axios HTTP client (configured for future backend deployment) |
| **Typography** | Plus Jakarta Sans & Inter |

---

## 📁 Project Architecture

```
ResumeIQ/
├── public/
│   └── Alex_Morgan_Senior_Software_Engineer.pdf   # Sample resume PDF
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               # Brand logo, nav links, auth trigger
│   │   ├── Footer.jsx               # Product links, copyright, compliance status
│   │   ├── Sidebar.jsx              # Collapsible dashboard sidebar
│   │   ├── ResumeUpload.jsx         # Drag-and-drop PDF dropzone & sample selector
│   │   ├── JobDescriptionInput.jsx  # Textarea with counters & sample job loaders
│   │   ├── ATSScore.jsx             # Circular animated gauge & AI summary
│   │   ├── ScoreBreakdown.jsx       # Category progress bars & Recharts radar chart
│   │   ├── SkillsAnalysis.jsx       # Matched vs missing skills with category filtering
│   │   ├── Recommendations.jsx      # AI recommendation cards with 1-click copy bullets
│   │   ├── KeywordAnalysis.jsx      # Keyword coverage table & search filter
│   │   ├── FeatureCard.jsx          # Feature highlights card for landing page
│   │   ├── AnalysisLoadingModal.jsx # Step-by-step AI progress modal
│   │   ├── ReportModal.jsx          # Printable ATS diagnostic dossier modal
│   │   └── AuthModal.jsx            # Sign in / account modal
│   ├── pages/
│   │   ├── LandingPage.jsx          # Marketing page with hero, mockup, and features
│   │   ├── AnalyzePage.jsx          # Two-column upload & job description interface
│   │   ├── ResultsPage.jsx          # Complete dashboard with score, skills, & advice
│   │   ├── HistoryPage.jsx          # Past scan records with search and review
│   │   └── SettingsPage.jsx         # Profile preferences & AWS cloud architecture tab
│   ├── services/
│   │   └── analysisService.js       # API client & mock engine (ready for AWS Gateway)
│   ├── data/
│   │   └── mockAnalysis.js          # Realistic default and sample datasets
│   ├── hooks/
│   │   └── useResumeAnalysis.js     # State hook for scan orchestration and history
│   ├── App.jsx                      # Route definitions
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Tailwind directives and delicate scrollbars
├── index.html                       # HTML template with fonts and favicon
├── tailwind.config.js               # Design tokens, electric indigo colors, and shadows
├── vite.config.js                   # Optimized rollup manual chunking
└── package.json
```

---

## ☁️ Future AWS Cloud Architecture

ResumeIQ is designed with a service-oriented architecture (`src/services/analysisService.js`) prepared for seamless integration with AWS serverless services:

```
[Candidate Browser]
       │
       ▼ (1. Request Presigned URL)
[Amazon API Gateway] ────► [AWS Lambda Orchestrator]
                                  │
       ◄──────────────────────────┘ (2. Returns S3 Presigned URL)
       │
       ▼ (3. Direct Secure PDF Upload)
[Amazon S3 Bucket] (AES-256 Server-Side Encryption)
       │
       ▼ (4. Triggers Asynchronous OCR)
[Amazon Textract] (Extracts layout, columns, tables, raw text)
       │
       ▼ (5. Text sent to LLM prompt)
[Amazon Bedrock] (Claude 3.5 Sonnet / Amazon Titan)
       │   - Compares candidate experience against JD
       │   - Generates ATS score, skill gaps & rewrites
       ▼
[Amazon DynamoDB] (Stores persistent scan result)
       │
       ▼
[ResumeIQ Client Dashboard]
```

> **Security Note:** AWS credentials and IAM roles remain strictly on the backend. The frontend communicates exclusively via authenticated API Gateway REST endpoints.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Generates an optimized bundle with code-split vendor, chart, and icon chunks in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Design Philosophy
- **Colors:** Deep slate/black typography (`#0F172A`), white card surfaces (`#FFFFFF`), light backgrounds (`#FAFAFB`), and electric indigo/violet accents (`#4F46E5`).
- **Cards & Borders:** Rounded (`rounded-2xl`), crisp borders (`border-slate-200/80`), soft shadows (`shadow-subtle` and `shadow-premium`).
- **Icons:** Consistent, clean Lucide React stroke icons. No cheap emojis.
- **Feedback:** Real-time character counts, loading step modals, error alerts, and copy confirmations.

