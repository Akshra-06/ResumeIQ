import { useState, useEffect, useCallback } from 'react';
import { 
  analyzeResume, 
  getAnalysisHistory, 
  saveAnalysisToHistory 
} from '../services/analysisService';
import { DEFAULT_MOCK_ANALYSIS } from '../data/mockAnalysis';

export function useResumeAnalysis() {
  const [currentAnalysis, setCurrentAnalysis] = useState(() => {
    // Check if we have cached latest analysis
    const cached = localStorage.getItem('resumeiq_latest_analysis');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch (e) {
        console.error('Failed to parse cached analysis', e);
      }
    }
    return DEFAULT_MOCK_ANALYSIS;
  });

  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [progressState, setProgressState] = useState({ stage: 'idle', step: 0, message: '' });
  const [error, setError] = useState(null);

  // Load history on mount
  useEffect(() => {
    getAnalysisHistory().then(data => {
      if (data) setHistory(data);
    });
  }, []);

  const runAnalysis = useCallback(async (file, jobDescription) => {
    setIsLoading(true);
    setError(null);
    setProgressState({ stage: 'starting', step: 1, message: 'Initiating AI resume evaluation engine...' });

    try {
      const result = await analyzeResume(file, jobDescription, (progress) => {
        setProgressState(progress);
      });

      setCurrentAnalysis(result);
      saveAnalysisToHistory(result);
      
      // Update local history state
      const updatedHistory = await getAnalysisHistory();
      setHistory(updatedHistory);
      
      setIsLoading(false);
      return result;
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'An error occurred during resume analysis.');
      throw err;
    }
  }, []);

  const loadAnalysisById = useCallback((id) => {
    if (id === DEFAULT_MOCK_ANALYSIS.id || id === currentAnalysis.id) {
      return currentAnalysis;
    }
    // Return current or default for mock demo
    return currentAnalysis;
  }, [currentAnalysis]);

  const deleteHistoryItem = useCallback((id) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== id);
      localStorage.setItem('resumeiq_history', JSON.stringify(filtered));
      return filtered;
    });
  }, []);

  return {
    currentAnalysis,
    history,
    isLoading,
    progressState,
    error,
    runAnalysis,
    loadAnalysisById,
    deleteHistoryItem,
    setCurrentAnalysis
  };
}

