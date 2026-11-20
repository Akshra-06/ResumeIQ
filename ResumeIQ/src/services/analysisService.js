import axios from 'axios';
import { DEFAULT_MOCK_ANALYSIS } from '../data/mockAnalysis';

/**
 * ResumeIQ API Service Layer
 * 
 * FUTURE PRODUCTION ARCHITECTURE:
 * When connecting to your AWS serverless backend:
 * 1. Client calls POST /api/v1/resumes/upload-url (AWS API Gateway -> Lambda)
 *    to receive an Amazon S3 presigned PUT URL.
 * 2. Client uploads raw PDF directly to Amazon S3 via presigned URL (never passing credentials to frontend).
 * 3. Lambda triggers Amazon Textract asynchronously to extract formatted text, layout, and tables from PDF.
 * 4. Lambda formats prompt & calls Amazon Bedrock (Anthropic Claude 3.5 Sonnet / Amazon Titan) 
 *    with the extracted resume text and target job description.
 * 5. Structured JSON response containing scores, skill breakdowns, and recommendations is saved to DynamoDB
 *    and returned via API Gateway to this service.
 */

// Configurable base URL for when the AWS API Gateway is deployed
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000,
});

/**
 * Parses job description and resume content to generate customized scores and insights
 */
function generateDynamicAnalysis(file, jobDescription, resumeText = '') {
  const jdLower = (jobDescription || '').toLowerCase();
  const resumeLower = (resumeText || file?.name || '').toLowerCase();

  // Known skill definitions
  const skillCatalog = [
    { name: 'Python', category: 'Backend', aliases: ['python', 'fastapi', 'django', 'flask'] },
    { name: 'React', category: 'Frontend', aliases: ['react', 'react.js', 'reactjs', 'nextjs', 'next.js'] },
    { name: 'TypeScript', category: 'Frontend', aliases: ['typescript', 'ts'] },
    { name: 'JavaScript', category: 'Frontend', aliases: ['javascript', 'js', 'es6'] },
    { name: 'SQL', category: 'Databases', aliases: ['sql', 'postgresql', 'postgres', 'mysql'] },
    { name: 'Machine Learning', category: 'AI/Data', aliases: ['machine learning', 'ml', 'pytorch', 'tensorflow', 'scikit'] },
    { name: 'REST APIs', category: 'Architecture', aliases: ['rest', 'restful', 'api', 'apis'] },
    { name: 'GraphQL', category: 'Architecture', aliases: ['graphql', 'apollo'] },
    { name: 'AWS Lambda', category: 'Cloud Infrastructure', aliases: ['lambda', 'serverless'] },
    { name: 'Amazon S3', category: 'Cloud Storage', aliases: ['s3', 'amazon s3', 'cloud storage'] },
    { name: 'Docker', category: 'DevOps / Containers', aliases: ['docker', 'container', 'containers'] },
    { name: 'CI/CD Pipelines', category: 'DevOps', aliases: ['ci/cd', 'cicd', 'github actions', 'jenkins', 'gitlab'] },
    { name: 'Kubernetes', category: 'Cloud Infrastructure', aliases: ['kubernetes', 'k8s'] },
    { name: 'Tailwind CSS', category: 'Frontend', aliases: ['tailwind', 'tailwindcss', 'css3'] },
    { name: 'Node.js', category: 'Backend', aliases: ['node', 'node.js', 'nodejs', 'express'] },
    { name: 'Git', category: 'Workflow', aliases: ['git', 'github', 'gitlab'] },
  ];

  // Detect which skills the job wants
  const requiredByJob = skillCatalog.filter(skill => 
    skill.aliases.some(alias => jdLower.includes(alias))
  );

  const matchedSkills = [];
  const missingSkills = [];

  if (requiredByJob.length > 0) {
    requiredByJob.forEach(skill => {
      const foundInResume = skill.aliases.some(alias => resumeLower.includes(alias)) || 
        // fallback match against default sample if it's Alex Morgan
        (file?.name?.includes('Alex') && ['Python', 'React', 'TypeScript', 'SQL', 'REST APIs', 'Tailwind CSS', 'Git'].includes(skill.name));

      if (foundInResume) {
        matchedSkills.push({
          name: skill.name,
          category: skill.category,
          confidence: 'High',
          countInResume: Math.floor(Math.random() * 3) + 2
        });
      } else {
        missingSkills.push({
          name: skill.name,
          category: skill.category,
          priority: ['AWS Lambda', 'Docker', 'Amazon S3', 'CI/CD Pipelines'].includes(skill.name) ? 'High' : 'Medium',
          impact: `Important keyword for ${skill.category}`
        });
      }
    });
  }

  // Calculate dynamic score based on matches
  let calculatedScore = 84;
  if (requiredByJob.length > 0) {
    const ratio = matchedSkills.length / requiredByJob.length;
    calculatedScore = Math.min(96, Math.max(52, Math.round(55 + (ratio * 40))));
  }

  const scoreLabel = calculatedScore >= 80 ? 'Strong Match' : calculatedScore >= 65 ? 'Good Match' : 'Needs Improvement';
  const scoreTier = calculatedScore >= 80 ? 'excellent' : calculatedScore >= 65 ? 'good' : 'needs-improvement';

  // Extract job title from first line of job description if possible
  const lines = jobDescription.split('\n').filter(l => l.trim().length > 0);
  let extractedTitle = 'Target Role';
  if (lines.length > 0) {
    extractedTitle = lines[0].replace(/^job title:\s*/i, '').replace(/^role:\s*/i, '').trim();
    if (extractedTitle.length > 45) {
      extractedTitle = extractedTitle.substring(0, 42) + '...';
    }
  }

  return {
    ...DEFAULT_MOCK_ANALYSIS,
    id: `scan-${Date.now()}`,
    createdAt: new Date().toISOString(),
    targetRole: extractedTitle || DEFAULT_MOCK_ANALYSIS.targetRole,
    filename: file?.name || DEFAULT_MOCK_ANALYSIS.filename,
    fileSize: file?.size ? `${Math.round(file.size / 1024)} KB` : DEFAULT_MOCK_ANALYSIS.fileSize,
    overallScore: calculatedScore,
    scoreLabel,
    scoreTier,
    skillsAnalysis: {
      matched: matchedSkills.length > 0 ? matchedSkills : DEFAULT_MOCK_ANALYSIS.skillsAnalysis.matched,
      missing: missingSkills.length > 0 ? missingSkills : DEFAULT_MOCK_ANALYSIS.skillsAnalysis.missing,
    },
    categoryScores: [
      {
        name: 'Skills Match',
        score: Math.min(100, Math.round(calculatedScore + 4)),
        benchmark: 75,
        weight: '30%',
        status: calculatedScore >= 80 ? 'high' : 'good',
        description: 'Evaluated against required and preferred technical proficiencies.'
      },
      {
        name: 'Experience Relevance',
        score: Math.min(100, Math.round(calculatedScore - 2)),
        benchmark: 70,
        weight: '25%',
        status: 'good',
        description: 'Analyzed timeline, seniority level, and domain experience.'
      },
      {
        name: 'Education Match',
        score: 95,
        benchmark: 80,
        weight: '15%',
        status: 'high',
        description: 'Degree credentials and academic background align with standard expectations.'
      },
      {
        name: 'Keyword Optimization',
        score: Math.min(100, Math.round(calculatedScore - 10)),
        benchmark: 70,
        weight: '20%',
        status: calculatedScore >= 80 ? 'good' : 'moderate',
        description: 'Identifies frequency of critical terminology and ATS tokens.'
      },
      {
        name: 'Resume Structure',
        score: 90,
        benchmark: 85,
        weight: '10%',
        status: 'high',
        description: 'Standard section formatting, readable font metrics, and parseable headers.'
      }
    ],
    radarData: [
      { subject: 'Skills', resume: Math.min(100, calculatedScore + 4), requirement: 85, fullMark: 100 },
      { subject: 'Experience', resume: Math.min(100, calculatedScore - 2), requirement: 80, fullMark: 100 },
      { subject: 'Education', resume: 95, requirement: 75, fullMark: 100 },
      { subject: 'Keywords', resume: Math.min(100, calculatedScore - 10), requirement: 90, fullMark: 100 },
      { subject: 'Structure', resume: 90, requirement: 80, fullMark: 100 },
      { subject: 'Cloud / DevOps', resume: missingSkills.some(s => s.category.includes('Cloud')) ? 60 : 85, requirement: 85, fullMark: 100 }
    ]
  };
}

/**
 * Asynchronous function to analyze resume against job description.
 * Currently simulates the Amazon Textract + Bedrock extraction pipeline
 * with realistic timing and structured payload generation.
 * 
 * @param {File|Object} file - Uploaded PDF file or sample resume object
 * @param {string} jobDescription - Target job description text
 * @param {Function} onProgress - Optional callback for simulated processing stages
 * @returns {Promise<Object>} Structured analysis report
 */
export async function analyzeResume(file, jobDescription, onProgress = () => {}) {
  // If backend API URL is configured, use real backend
  if (import.meta.env.VITE_USE_REAL_API === 'true') {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);
    const response = await apiClient.post('/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // Simulated AI Pipeline with granular status updates
  return new Promise((resolve, reject) => {
    try {
      onProgress({ stage: 'uploading', step: 1, message: 'Validating and parsing document structure...' });

      setTimeout(() => {
        onProgress({ stage: 'extracting', step: 2, message: 'Extracting resume text & layout via OCR analysis...' });
      }, 700);

      setTimeout(() => {
        onProgress({ stage: 'evaluating', step: 3, message: 'Evaluating candidate qualifications against target job...' });
      }, 1500);

      setTimeout(() => {
        onProgress({ stage: 'scoring', step: 4, message: 'Synthesizing ATS scores, skill gaps & AI recommendations...' });
      }, 2300);

      setTimeout(() => {
        const resumeText = file.textSample || file.name || '';
        const result = generateDynamicAnalysis(file, jobDescription, resumeText);
        resolve(result);
      }, 3000);
    } catch (err) {
      reject(new Error(err.message || 'Failed to analyze resume. Please try again.'));
    }
  });
}

/**
 * Retrieve previous analyses stored in user session
 */
export async function getAnalysisHistory() {
  const stored = localStorage.getItem('resumeiq_history');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse analysis history', e);
    }
  }
  return DEFAULT_MOCK_ANALYSIS.historyList;
}

/**
 * Save an analysis result into local history
 */
export function saveAnalysisToHistory(analysis) {
  try {
    const existing = localStorage.getItem('resumeiq_history');
    let history = existing ? JSON.parse(existing) : [...DEFAULT_MOCK_ANALYSIS.historyList];
    
    // Add new scan item to top
    const newHistoryItem = {
      id: analysis.id,
      role: analysis.targetRole,
      company: analysis.company || 'Direct Submission',
      date: new Date().toISOString().split('T')[0],
      score: analysis.overallScore,
      status: analysis.scoreLabel,
      matchedSkillsCount: analysis.skillsAnalysis.matched.length,
      missingSkillsCount: analysis.skillsAnalysis.missing.length,
      filename: analysis.filename
    };

    // Prevent duplicates
    history = [newHistoryItem, ...history.filter(h => h.id !== analysis.id)];
    localStorage.setItem('resumeiq_history', JSON.stringify(history));
    localStorage.setItem('resumeiq_latest_analysis', JSON.stringify(analysis));
  } catch (e) {
    console.error('Failed to save analysis to history', e);
  }
}

