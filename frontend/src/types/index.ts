export interface Paper {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  publishedDate: string;
  doi: string;
  abstract: string;
  methodology: string[];
  findings: string[];
  limitations: string[];
  domain: string;
  sampleSize: number;
  keywords: string[];
  replicationSuggestions: string[];
  citationCount: number;
  pdfUrl?: string;
}

export interface SearchFilters {
  keywords: string;
  domain: string;
  minSampleSize: number;
  maxSampleSize: number;
  dateRange: {
    start: string;
    end: string;
  };
  methodology: string[];
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  paperId?: string;
}

export interface DashboardMetrics {
  totalPapers: number;
  uniqueDomains: number;
  avgSampleSize: number;
  topMethodologies: Array<{ name: string; count: number }>;
  recentFindings: string[];
  collaborationOpportunities: number;
}