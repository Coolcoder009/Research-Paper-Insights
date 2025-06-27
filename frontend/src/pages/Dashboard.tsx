import React from 'react';
import { BarChart3, TrendingUp, Users, FileText, Lightbulb, Target, Calendar, Award } from 'lucide-react';
import { mockDashboardMetrics, mockPapers } from '../data/mockData';

const Dashboard: React.FC = () => {
  const { totalPapers, uniqueDomains, avgSampleSize, topMethodologies, recentFindings, collaborationOpportunities } = mockDashboardMetrics;

  const recentPapers = mockPapers.slice(0, 3);

  const domainDistribution = [
    { domain: 'Neuroscience', count: 245, percentage: 39 },
    { domain: 'Genetics', count: 189, percentage: 30 },
    { domain: 'Ecology', count: 156, percentage: 25 },
    { domain: 'Others', count: 37, percentage: 6 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Research Dashboard</h1>
          <p className="text-lg text-gray-600">
            Overview of your research insights and analytics across all analyzed papers
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Papers</p>
                <p className="text-2xl font-bold text-gray-900">{totalPapers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Research Domains</p>
                <p className="text-2xl font-bold text-gray-900">{uniqueDomains}</p>
                <p className="text-sm text-green-600 mt-1">↑ 3 new domains</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Sample Size</p>
                <p className="text-2xl font-bold text-gray-900">{avgSampleSize}</p>
                <p className="text-sm text-blue-600 mt-1">Across all studies</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collaboration Ops</p>
                <p className="text-2xl font-bold text-gray-900">{collaborationOpportunities}</p>
                <p className="text-sm text-orange-600 mt-1">Potential matches</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Methodologies */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Award className="h-5 w-5 text-violet-600" />
              <h2 className="text-xl font-semibold text-gray-900">Top Methodologies</h2>
            </div>
            <div className="space-y-4">
              {topMethodologies.map((methodology, index) => {
                const percentage = (methodology.count / totalPapers) * 100;
                return (
                  <div key={methodology.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">{methodology.name}</span>
                      <span className="text-sm text-gray-500">{methodology.count} papers</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-violet-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Domain Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Research Domain Distribution</h2>
            </div>
            <div className="space-y-4">
              {domainDistribution.map((domain) => (
                <div key={domain.domain}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{domain.domain}</span>
                    <span className="text-sm text-gray-500">{domain.count} papers</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${domain.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{domain.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Findings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Lightbulb className="h-5 w-5 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recent Key Findings</h2>
            </div>
            <div className="space-y-4">
              {recentFindings.map((finding, index) => (
                <div key={index} className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-sm text-yellow-800">{finding}</p>
                  <p className="text-xs text-yellow-600 mt-2">Extracted {index + 1} day(s) ago</p>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-900">Trending Research Topics</h2>
            </div>
            <div className="space-y-3">
              {[
                { topic: 'Machine Learning in Healthcare', growth: '+34%', papers: 89 },
                { topic: 'CRISPR Gene Therapy', growth: '+28%', papers: 67 },
                { topic: 'Climate Change Adaptation', growth: '+23%', papers: 54 },
                { topic: 'Quantum Computing Applications', growth: '+19%', papers: 42 },
                { topic: 'Neuroplasticity Research', growth: '+15%', papers: 38 }
              ].map((trend) => (
                <div key={trend.topic} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trend.topic}</p>
                    <p className="text-xs text-gray-600">{trend.papers} papers</p>
                  </div>
                  <span className="text-sm font-medium text-green-600">{trend.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Papers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Recently Analyzed Papers</h2>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPapers.map((paper) => (
              <div key={paper.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer">
                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{paper.title}</h3>
                  <p className="text-sm text-gray-600">
                    {paper.authors.slice(0, 2).join(', ')} • {paper.journal} • {new Date(paper.publishedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {paper.keywords.slice(0, 2).map((keyword) => (
                    <span key={keyword} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;