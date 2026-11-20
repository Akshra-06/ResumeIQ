// Mock analysis data and preset samples for ResumeIQ

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: 'fullstack-senior',
    title: 'Senior Full-Stack Cloud Engineer',
    company: 'Vanguard Tech Solutions',
    text: `Job Title: Senior Full-Stack Cloud Engineer
Location: Remote (US / Canada)
Experience: 4-6+ years

About the Role:
We are looking for a Senior Full-Stack Cloud Engineer to architect, build, and maintain our next-generation cloud services and microservices. You will work closely with product managers, UI/UX designers, and platform engineers.

Core Responsibilities:
- Design and develop robust, high-performance web applications using React, TypeScript, and modern state management.
- Build resilient backend APIs and services using Python or Node.js with SQL/NoSQL databases.
- Architect and deploy serverless solutions on AWS, including AWS Lambda, Amazon S3, API Gateway, DynamoDB, and CloudFront.
- Containerize applications with Docker and configure CI/CD automation pipelines for continuous deployment.
- Integrate machine learning or generative AI capabilities via RESTful APIs.
- Lead code reviews, mentor junior engineers, and drive engineering excellence.

Required Qualifications:
- 4+ years of professional full-stack development experience.
- Strong proficiency in React, TypeScript, and modern CSS/Tailwind.
- Proven experience developing APIs using Python, FastApi, or Node.js.
- Solid experience with relational databases (PostgreSQL, MySQL, SQL).
- Hands-on expertise with AWS cloud services (Lambda, S3, IAM, CloudWatch).
- Familiarity with Docker, automated unit testing, and CI/CD pipelines (GitHub Actions).
- Strong understanding of RESTful API design and asynchronous event processing.

Preferred Qualifications:
- Experience with Kubernetes or container orchestration.
- Knowledge of Amazon Bedrock or OpenAI API integrations.
- Experience with performance optimization and ATS/SEO architecture.`
  },
  {
    id: 'ai-engineer',
    title: 'AI / Machine Learning Engineer',
    company: 'Nexus Intelligence Labs',
    text: `Job Title: AI / Machine Learning Systems Engineer
Location: San Francisco, CA / Hybrid

Role Overview:
Join our AI core team to build intelligent agentic systems and production evaluation pipelines.

Key Responsibilities:
- Build and fine-tune LLM pipelines using Python, PyTorch, and LangChain.
- Develop retrieval-augmented generation (RAG) architectures with vector databases.
- Deploy scalable inferencing microservices using FastAPI, Docker, and Kubernetes on AWS.
- Collaborate with frontend engineers to deliver intuitive conversational experiences with React.
- Monitor model latency, drift, and accuracy in production.

Requirements:
- 3+ years experience in Python, PyTorch, NumPy, and Pandas.
- Proven experience in prompt engineering, embedding generation, and vector retrieval.
- Hands-on experience with Docker, AWS (SageMaker, S3, ECS/EKS).
- Familiarity with CI/CD and production ML monitoring.`
  },
  {
    id: 'frontend-lead',
    title: 'Staff Frontend Engineer',
    company: 'Starlight Design Systems',
    text: `Job Title: Staff Frontend Engineer
Location: New York / Remote

We are seeking a Staff Frontend Engineer to own frontend architecture, design system implementation, and web performance.

Requirements:
- 5+ years of production experience in React, TypeScript, Tailwind CSS, and Next.js.
- Mastery of web performance (Core Web Vitals, LCP/CLS optimization, bundle reduction).
- Deep experience building modular UI libraries, accessible components (WCAG AA), and micro-frontends.
- Familiarity with GraphQL, REST APIs, and automated UI testing (Playwright, Jest).`
  }
];

export const SAMPLE_RESUMES = [
  {
    id: 'alex-morgan-fullstack',
    name: 'Alex_Morgan_Senior_Software_Engineer.pdf',
    size: '184 KB',
    applicantName: 'Alex Morgan',
    targetTitle: 'Senior Full-Stack Engineer',
    summary: 'Full-stack software engineer with 5 years experience building scalable web applications with React, TypeScript, Python, and SQL.',
    textSample: `ALEX MORGAN
alex.morgan@email.com • linkedin.com/in/alexmorgan • github.com/alexmorgan

PROFESSIONAL SUMMARY
Senior Software Engineer with 5+ years of experience engineering high-scale web applications, microservices, and reactive user interfaces. Proficient in React, TypeScript, Python, SQL, REST APIs, and modern CI/CD tooling. Experienced in collaborating with cross-functional teams to ship reliable software solutions.

EXPERIENCE
Software Engineer II | ScaleStream Technologies | 2021 – Present
- Architected and shipped 6 core web applications in React and TypeScript used by 150,000+ active monthly users.
- Developed backend microservices using Python (FastAPI) and PostgreSQL, reducing API response times by 32%.
- Integrated machine learning recommendation endpoints into the primary user flow.
- Configured automated test suites with 92% code coverage and managed Git workflows.

Frontend Engineer | BlueSky Creative Media | 2019 – 2021
- Created responsive user interfaces utilizing React, Tailwind CSS, and Redux.
- Collaborated with product designers to implement pixel-perfect Figma designs.
- Optimized frontend asset pipelines, cutting initial page load times by 40%.

SKILLS
Programming: Python, JavaScript, TypeScript, SQL, HTML5, CSS3
Frameworks & Libraries: React, Node.js, FastAPI, Next.js, Tailwind CSS, Redux Toolkit
Databases: PostgreSQL, MySQL, Redis
Tools: Git, Postman, Vite, Webpack, Jest

EDUCATION
B.S. in Computer Science | University of Washington | 2015 – 2019`
  },
  {
    id: 'sarah-chen-ml',
    name: 'Sarah_Chen_AI_Specialist.pdf',
    size: '220 KB',
    applicantName: 'Sarah Chen',
    targetTitle: 'Machine Learning Engineer',
    summary: 'AI specialist with expertise in deep learning, natural language processing, Python, and PyTorch.',
    textSample: `SARAH CHEN
sarah.chen@email.com • San Francisco, CA

SUMMARY
Data Scientist & AI Engineer with 4 years of hands-on experience in machine learning, NLP, and model serving.

EXPERIENCE
AI Engineer | CogniVision Inc. | 2022 – Present
- Implemented RAG search systems using vector stores and transformer models.
- Built REST microservices with Python and FastAPI.
- Deployed models onto Docker containers with automated evaluation benchmarks.`
  }
];

export const DEFAULT_MOCK_ANALYSIS = {
  id: 'scan-789234',
  createdAt: '2026-11-20T19:45:00Z',
  targetRole: 'Senior Full-Stack Cloud Engineer',
  company: 'Vanguard Tech Solutions',
  applicantName: 'Alex Morgan',
  filename: 'Alex_Morgan_Senior_Software_Engineer.pdf',
  fileSize: '184 KB',
  overallScore: 84,
  scoreLabel: 'Strong Match',
  scoreTier: 'excellent', // excellent (80+), good (65-79), needs-improvement (<65)
  executiveSummary:
    'Alex is a strong candidate for the Senior Full-Stack Cloud Engineer position with exceptional marks in frontend architecture (React, TypeScript), backend API design (Python, SQL), and core computer science fundamentals. To maximize ATS ranking and pass technical screening filters, Alex should explicitly emphasize cloud infrastructure (AWS Lambda, Amazon S3), containerization (Docker), and automated CI/CD deployment pipelines.',
  
  categoryScores: [
    {
      name: 'Skills Match',
      score: 88,
      benchmark: 75,
      weight: '30%',
      status: 'high',
      description: 'High overlap with core programming languages and frontend libraries.'
    },
    {
      name: 'Experience Relevance',
      score: 82,
      benchmark: 70,
      weight: '25%',
      status: 'good',
      description: 'Solid 5 years of relevant full-stack software development experience.'
    },
    {
      name: 'Education Match',
      score: 95,
      benchmark: 80,
      weight: '15%',
      status: 'high',
      description: 'B.S. in Computer Science directly meets role requirements.'
    },
    {
      name: 'Keyword Optimization',
      score: 74,
      benchmark: 70,
      weight: '20%',
      status: 'moderate',
      description: 'Missing several specific AWS and DevOps infrastructure keywords.'
    },
    {
      name: 'Resume Structure',
      score: 90,
      benchmark: 85,
      weight: '10%',
      status: 'high',
      description: 'Clean hierarchy, standard section headers, and parseable typography.'
    }
  ],

  radarData: [
    { subject: 'Skills', resume: 88, requirement: 85, fullMark: 100 },
    { subject: 'Experience', resume: 82, requirement: 80, fullMark: 100 },
    { subject: 'Education', resume: 95, requirement: 75, fullMark: 100 },
    { subject: 'Keywords', resume: 74, requirement: 90, fullMark: 100 },
    { subject: 'Structure', resume: 90, requirement: 80, fullMark: 100 },
    { subject: 'Cloud / DevOps', resume: 62, requirement: 85, fullMark: 100 }
  ],

  skillsAnalysis: {
    matched: [
      { name: 'Python', category: 'Backend', confidence: 'High', countInResume: 3 },
      { name: 'React', category: 'Frontend', confidence: 'High', countInResume: 4 },
      { name: 'SQL', category: 'Databases', confidence: 'High', countInResume: 2 },
      { name: 'Machine Learning', category: 'AI/Data', confidence: 'Medium', countInResume: 1 },
      { name: 'REST APIs', category: 'Architecture', confidence: 'High', countInResume: 3 },
      { name: 'TypeScript', category: 'Frontend', confidence: 'High', countInResume: 3 },
      { name: 'PostgreSQL', category: 'Databases', confidence: 'High', countInResume: 2 },
      { name: 'Tailwind CSS', category: 'Frontend', confidence: 'High', countInResume: 2 },
      { name: 'FastAPI', category: 'Backend', confidence: 'High', countInResume: 2 },
      { name: 'Git', category: 'Workflow', confidence: 'High', countInResume: 2 }
    ],
    missing: [
      { name: 'AWS Lambda', category: 'Cloud Infrastructure', priority: 'High', impact: 'Core role requirement' },
      { name: 'Amazon S3', category: 'Cloud Storage', priority: 'High', impact: 'Key asset management requirement' },
      { name: 'Docker', category: 'DevOps / Containers', priority: 'High', impact: 'Containerization standard' },
      { name: 'CI/CD Pipelines', category: 'DevOps', priority: 'Medium', impact: 'Automated deployment requirement' },
      { name: 'Kubernetes', category: 'Cloud Infrastructure', priority: 'Medium', impact: 'Bonus qualification' },
      { name: 'Amazon Bedrock', category: 'AI Integration', priority: 'Low', impact: 'Preferred qualification' }
    ]
  },

  keywordAnalysis: {
    coveragePercentage: 76,
    totalFound: 19,
    totalRequired: 25,
    topKeywords: [
      { keyword: 'React', inResume: true, jobFrequency: 4, resumeCount: 4, importance: 'Critical' },
      { keyword: 'TypeScript', inResume: true, jobFrequency: 3, resumeCount: 3, importance: 'Critical' },
      { keyword: 'Python', inResume: true, jobFrequency: 3, resumeCount: 3, importance: 'Critical' },
      { keyword: 'SQL / PostgreSQL', inResume: true, jobFrequency: 2, resumeCount: 2, importance: 'High' },
      { keyword: 'RESTful APIs', inResume: true, jobFrequency: 3, resumeCount: 3, importance: 'Critical' },
      { keyword: 'AWS Lambda', inResume: false, jobFrequency: 3, resumeCount: 0, importance: 'Critical' },
      { keyword: 'Amazon S3', inResume: false, jobFrequency: 2, resumeCount: 0, importance: 'High' },
      { keyword: 'Docker', inResume: false, jobFrequency: 2, resumeCount: 0, importance: 'Critical' },
      { keyword: 'CI/CD Pipelines', inResume: false, jobFrequency: 2, resumeCount: 0, importance: 'High' },
      { keyword: 'Microservices', inResume: true, jobFrequency: 2, resumeCount: 2, importance: 'High' },
      { keyword: 'Vite / Webpack', inResume: true, jobFrequency: 1, resumeCount: 2, importance: 'Medium' },
      { keyword: 'Machine Learning', inResume: true, jobFrequency: 2, resumeCount: 1, importance: 'Medium' }
    ]
  },

  recommendations: [
    {
      id: 'rec-1',
      category: 'Cloud Experience',
      title: 'Add relevant AWS cloud experience',
      impact: 'High Impact',
      type: 'critical',
      description: 'The job specification explicitly lists AWS services (AWS Lambda, Amazon S3, API Gateway). Even if your cloud experience was exploratory or part of microservice deployments, dedicate bullet points to clarify cloud platform usage.',
      suggestedBullet: 'Designed and deployed serverless cloud functions on AWS Lambda integrated with Amazon S3 for event-driven storage and fast file processing.'
    },
    {
      id: 'rec-2',
      category: 'DevOps & Containers',
      title: 'Highlight Docker & CI/CD deployment automation',
      impact: 'High Impact',
      type: 'critical',
      description: 'The target job highlights containerization with Docker and automated testing via CI/CD pipelines. Incorporate your Docker container builds and automated GitHub Actions workflows.',
      suggestedBullet: 'Containerized multi-tier web applications using Docker, streamlining staging-to-production CI/CD workflows and decreasing build deployment cycles by 45%.'
    },
    {
      id: 'rec-3',
      category: 'Metrics & Impact',
      title: 'Include measurable metrics in your ScaleStream accomplishments',
      impact: 'Medium Impact',
      type: 'enhancement',
      description: 'Recruiters and ATS parsers rank bullet points higher when they pair action verbs with quantifiable business results. You already did this well with "reduced API response times by 32%"; add 1-2 more quantified metrics.',
      suggestedBullet: 'Engineered high-throughput GraphQL & REST API gateways handling 2.5M daily requests with 99.98% uptime SLA.'
    },
    {
      id: 'rec-4',
      category: 'Keyword Density',
      title: 'Improve technical keyword coverage in skills section',
      impact: 'Quick Win',
      type: 'quickwin',
      description: 'Update the Tools & Infrastructure section of your resume to include "AWS (S3, Lambda)", "Docker", and "CI/CD (GitHub Actions)". This simple 2-minute tweak will elevate your ATS score from 84 to ~93.',
      suggestedBullet: 'Infrastructure & Tools: AWS (Lambda, S3, CloudWatch), Docker, Git, CI/CD (GitHub Actions), PostgreSQL, Redis'
    }
  ],

  historyList: [
    {
      id: 'scan-789234',
      role: 'Senior Full-Stack Cloud Engineer',
      company: 'Vanguard Tech Solutions',
      date: '2026-11-20',
      score: 84,
      status: 'Strong Match',
      matchedSkillsCount: 10,
      missingSkillsCount: 6,
      filename: 'Alex_Morgan_Senior_Software_Engineer.pdf'
    },
    {
      id: 'scan-654123',
      role: 'Staff Frontend Engineer',
      company: 'Starlight Design Systems',
      date: '2026-11-18',
      score: 91,
      status: 'Excellent Match',
      matchedSkillsCount: 14,
      missingSkillsCount: 2,
      filename: 'Alex_Morgan_Frontend_Lead.pdf'
    },
    {
      id: 'scan-542109',
      role: 'Backend Systems Architect',
      company: 'Apex Data Cloud',
      date: '2026-11-14',
      score: 68,
      status: 'Needs Improvement',
      matchedSkillsCount: 7,
      missingSkillsCount: 9,
      filename: 'Alex_Morgan_Resume_v2.pdf'
    },
    {
      id: 'scan-431876',
      role: 'AI / Machine Learning Engineer',
      company: 'Nexus Intelligence Labs',
      date: '2026-11-09',
      score: 77,
      status: 'Good Match',
      matchedSkillsCount: 9,
      missingSkillsCount: 5,
      filename: 'Alex_Morgan_Senior_Software_Engineer.pdf'
    }
  ]
};

