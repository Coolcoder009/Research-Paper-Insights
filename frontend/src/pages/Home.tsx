import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, Search, BarChart3, MessageSquare, Zap, Brain, Target, Users } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Upload,
      title: 'Smart Paper Upload',
      description: 'Upload or fetch research papers from PubMed Central with automatic metadata extraction',
      color: 'blue'
    },
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Automatically extract methodology, findings, and limitations using advanced NLP',
      color: 'violet'
    },
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find relevant papers with intelligent filtering by domain, methodology, and sample size',
      color: 'green'
    },
    {
      icon: Target,
      title: 'Replication Insights',
      description: 'Generate suggestions for potential replication studies based on identified gaps',
      color: 'orange'
    },
    {
      icon: BarChart3,
      title: 'Research Dashboard',
      description: 'Visualize research trends and insights across your paper collection',
      color: 'purple'
    },
    {
      icon: MessageSquare,
      title: 'AI Research Chat',
      description: 'Ask questions about papers and get intelligent responses from our AI assistant',
      color: 'teal'
    }
  ];

  const stats = [
    { label: 'Papers Analyzed', value: '1,247+', icon: Brain },
    { label: 'Research Domains', value: '28', icon: Target },
    { label: 'Active Researchers', value: '456', icon: Users },
    { label: 'Insights Generated', value: '2,891', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-violet-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl">
              <Brain className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Unlock the Power of
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"> Scientific Research</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Insight Engine uses advanced AI to extract, analyze, and synthesize key information from academic research papers, 
            helping researchers discover insights faster and identify replication opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Upload Your First Paper
            </Link>
            <Link
              to="/search"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Explore Research Database
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
              <Icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map(({ icon: Icon, title, description, color }) => {
            const colorClasses = {
              blue: 'bg-blue-50 text-blue-600 border-blue-200',
              violet: 'bg-violet-50 text-violet-600 border-violet-200',
              green: 'bg-green-50 text-green-600 border-green-200',
              orange: 'bg-orange-50 text-orange-600 border-orange-200',
              purple: 'bg-purple-50 text-purple-600 border-purple-200',
              teal: 'bg-teal-50 text-teal-600 border-teal-200'
            };

            return (
              <div
                key={title}
                className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group"
              >
                <div className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Research?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of researchers who are already using Insight Engine to accelerate their scientific discoveries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;