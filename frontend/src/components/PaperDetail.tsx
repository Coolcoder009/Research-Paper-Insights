import React from 'react';
import { X, Calendar, Users, ExternalLink, BookOpen, TrendingUp, FileText, Lightbulb, AlertTriangle } from 'lucide-react';
import { Paper } from '../types';

interface PaperDetailProps {
  paper: Paper;
  isOpen: boolean;
  onClose: () => void;
}

const PaperDetail: React.FC<PaperDetailProps> = ({ paper, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{paper.title}</h2>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{paper.authors.join(', ')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(paper.publishedDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="h-4 w-4" />
                <span>{paper.citationCount} citations</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Journal:</span>
                <span className="text-gray-700">{paper.journal}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ExternalLink className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">DOI:</span>
                <a href={`https://doi.org/${paper.doi}`} className="text-blue-600 hover:text-blue-700 transition-colors duration-200">
                  {paper.doi}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">Domain:</span>
                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full">
                  {paper.domain}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <span className="font-medium text-gray-900">Sample Size:</span>
                <span className="ml-2 text-gray-700">{paper.sampleSize.toLocaleString()} participants</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Keywords:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {paper.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="px-2 py-1 bg-gray-50 text-gray-700 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Abstract */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Abstract</h3>
            <p className="text-gray-700 leading-relaxed">{paper.abstract}</p>
          </div>

          {/* Methodology */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <FileText className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-900">Methodology</h3>
            </div>
            <ul className="space-y-2">
              {paper.methodology.map((method, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Findings */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900">Key Findings</h3>
            </div>
            <ul className="space-y-2">
              {paper.findings.map((finding, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{finding}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900">Study Limitations</h3>
            </div>
            <ul className="space-y-2">
              {paper.limitations.map((limitation, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Replication Suggestions */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Replication Suggestions</h3>
            </div>
            <ul className="space-y-2">
              {paper.replicationSuggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-700">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Analyze with AI
            </button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors duration-200">
              Generate Replication Study
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Export Summary
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Add to Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetail;