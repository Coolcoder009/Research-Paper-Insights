export interface Paper {
  // BASIC
  title?: string;
  authors?: string[];             // split by comma on ingest
  publishedDate?: string;         // ISO string
  journal?: string;
  doi?: string;
  domain?: string;

  // METRICS
  citationCount?: number;

  // CONTENT
  abstract?: string;
  findings?: string[];
  methodology?: string[];
  keywords?: string[];
  limitations?: string[];
  replicationSuggestions?: string[];
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