import React, { useState, useMemo } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { mockPapers } from '../data/mockData';
import { SearchFilters as SearchFiltersType, Paper } from '../types';
import PaperCard from '../components/PaperCard';
import SearchFilters from '../components/SearchFilters';
import PaperDetail from '../components/PaperDetail';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFiltersType>({
    keywords: '',
    domain: '',
    minSampleSize: 0,
    maxSampleSize: 10000,
    dateRange: { start: '', end: '' },
    methodology: []
  });
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredPapers = useMemo(() => {
    return mockPapers.filter(paper => {
      // Text search
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          paper.title.toLowerCase().includes(searchLower) ||
          paper.abstract.toLowerCase().includes(searchLower) ||
          paper.authors.some(author => author.toLowerCase().includes(searchLower)) ||
          paper.keywords.some(keyword => keyword.toLowerCase().includes(searchLower));
        
        if (!matchesSearch) return false;
      }

      // Keywords filter
      if (filters.keywords) {
        const keywordsLower = filters.keywords.toLowerCase();
        const matchesKeywords = paper.keywords.some(keyword => 
          keyword.toLowerCase().includes(keywordsLower)
        );
        if (!matchesKeywords) return false;
      }

      // Domain filter
      if (filters.domain && paper.domain !== filters.domain) {
        return false;
      }

      // Sample size filter
      if (paper.sampleSize < filters.minSampleSize || paper.sampleSize > filters.maxSampleSize) {
        return false;
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const paperDate = new Date(paper.publishedDate);
        if (filters.dateRange.start && paperDate < new Date(filters.dateRange.start)) {
          return false;
        }
        if (filters.dateRange.end && paperDate > new Date(filters.dateRange.end)) {
          return false;
        }
      }

      // Methodology filter
      if (filters.methodology.length > 0) {
        const hasMatchingMethodology = filters.methodology.some(method =>
          paper.methodology.some(paperMethod => 
            paperMethod.toLowerCase().includes(method.toLowerCase())
          )
        );
        if (!hasMatchingMethodology) return false;
      }

      return true;
    });
  }, [searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      keywords: '',
      domain: '',
      minSampleSize: 0,
      maxSampleSize: 10000,
      dateRange: { start: '', end: '' },
      methodology: []
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Research Paper Search</h1>
          <p className="text-lg text-gray-600">
            Discover and analyze research papers with advanced AI-powered search and filtering
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, authors, keywords, or abstract..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            />
          </div>
        </div>

        {/* Results Summary and Filter Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              <strong>{filteredPapers.length}</strong> papers found
            </span>
            {(searchQuery || filters.keywords || filters.domain || filters.methodology.length > 0) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-80 flex-shrink-0`}>
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClear={clearFilters}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {filteredPapers.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to find relevant research papers.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredPapers.map((paper) => (
                  <PaperCard
                    key={paper.id}
                    paper={paper}
                    onClick={() => setSelectedPaper(paper)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Paper Detail Modal */}
      <PaperDetail
        paper={selectedPaper!}
        isOpen={!!selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />
    </div>
  );
};

export default Search;