import React from 'react';
import { SearchFilters as SearchFiltersType } from '../types';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  onClear: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange, onClear }) => {
  const domains = [
    'All Domains',
    'Neuroscience',
    'Genetics',
    'Ecology',
    'Quantum Computing',
    'Medicine',
    'Psychology',
    'Computer Science',
    'Biology',
    'Chemistry'
  ];

  const methodologies = [
    'Randomized Controlled Trial',
    'Meta-Analysis',
    'Systematic Review',
    'Cross-sectional Study',
    'Longitudinal Study',
    'Case Study',
    'Observational Study'
  ];

  const handleMethodologyChange = (methodology: string, checked: boolean) => {
    const updated = checked
      ? [...filters.methodology, methodology]
      : filters.methodology.filter(m => m !== methodology);
    
    onFiltersChange({ ...filters, methodology: updated });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={onClear}
          className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          <X className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Keywords */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Keywords
          </label>
          <input
            type="text"
            value={filters.keywords}
            onChange={(e) => onFiltersChange({ ...filters, keywords: e.target.value })}
            placeholder="Enter keywords..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        {/* Domain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Research Domain
          </label>
          <select
            value={filters.domain}
            onChange={(e) => onFiltersChange({ ...filters, domain: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain === 'All Domains' ? '' : domain}>
                {domain}
              </option>
            ))}
          </select>
        </div>

        {/* Sample Size Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sample Size Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="number"
                value={filters.minSampleSize || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  minSampleSize: parseInt(e.target.value) || 0 
                })}
                placeholder="Min"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="number"
                value={filters.maxSampleSize || ''}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  maxSampleSize: parseInt(e.target.value) || 10000 
                })}
                placeholder="Max"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Publication Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  dateRange: { ...filters.dateRange, start: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => onFiltersChange({ 
                  ...filters, 
                  dateRange: { ...filters.dateRange, end: e.target.value }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Methodology */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Methodology Types
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {methodologies.map((methodology) => (
              <label key={methodology} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.methodology.includes(methodology)}
                  onChange={(e) => handleMethodologyChange(methodology, e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{methodology}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;