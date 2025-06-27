import React from 'react';
import { Brain, Zap, Target, Shield, Users, Lightbulb, ArrowRight, CheckCircle } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'Advanced AI Analysis',
      description: 'State-of-the-art natural language processing to extract methodology, findings, and limitations from research papers with high accuracy.'
    },
    {
      icon: Zap,
      title: 'Rapid Processing',
      description: 'Upload papers and get comprehensive analysis in minutes, not hours. Our optimized algorithms ensure fast turnaround times.'
    },
    {
      icon: Target,
      title: 'Replication Insights',
      description: 'Intelligent suggestions for potential replication studies based on identified research gaps and methodological limitations.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your research data is protected with enterprise-grade security. We never share or sell your uploaded documents.'
    },
    {
      icon: Users,
      title: 'Collaboration Tools',
      description: 'Discover potential research collaborators and identify complementary studies in your field of interest.'
    },
    {
      icon: Lightbulb,
      title: 'Research Discovery',
      description: 'Uncover hidden insights and connections across multiple papers with our advanced search and filtering capabilities.'
    }
  ];

  const benefits = [
    'Reduce literature review time by 70%',
    'Identify research gaps more efficiently',
    'Generate replication study ideas automatically',
    'Connect with relevant researchers globally',
    'Track research trends in real-time',
    'Extract insights from thousands of papers'
  ];

  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief AI Officer',
      background: 'Former Google AI researcher with 10+ years in NLP and scientific computing'
    },
    {
      name: 'Prof. Michael Rodriguez',
      role: 'Head of Research',
      background: 'Published 200+ papers in computational biology and research methodology'
    },
    {
      name: 'Dr. Elena Vasquez',
      role: 'Product Director',
      background: 'Former academic researcher turned product leader, PhD in Cognitive Science'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-violet-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl">
                <Brain className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Accelerating Scientific Discovery with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Insight Engine transforms how researchers interact with scientific literature, using cutting-edge AI 
              to extract, analyze, and synthesize knowledge from academic papers at unprecedented speed and scale.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                We believe that scientific progress should not be limited by the time it takes to review and synthesize 
                existing research. Our mission is to empower researchers with AI-driven tools that unlock insights 
                from the world's scientific literature.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                By automating the extraction of key information from research papers, we're helping scientists 
                identify research gaps, suggest replication studies, and accelerate the pace of discovery across all fields.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
                  <div className="text-sm text-gray-600">Papers Analyzed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-violet-600 mb-2">1,200+</div>
                  <div className="text-sm text-gray-600">Active Researchers</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Benefits</h3>
              <div className="space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powered by Advanced AI</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform combines the latest advances in natural language processing, machine learning, 
              and research methodology to provide unparalleled insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technology Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Technology Behind Insight Engine</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Language Processing</h3>
                  <p className="text-gray-600">
                    Advanced transformer models trained specifically on scientific literature to understand 
                    research terminology, methodology, and findings with high precision.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Knowledge Graph Construction</h3>
                  <p className="text-gray-600">
                    Automatically builds connections between research concepts, methodologies, and findings 
                    to enable sophisticated analysis and discovery.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Intelligent Synthesis</h3>
                  <p className="text-gray-600">
                    Combines information from multiple sources to generate comprehensive insights and 
                    identify research opportunities across different studies.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Processing Pipeline</h3>
              <div className="space-y-4">
                {[
                  'Document ingestion and preprocessing',
                  'Section identification and extraction',
                  'Entity recognition and classification',
                  'Relationship extraction and mapping',
                  'Insight generation and synthesis',
                  'Quality validation and scoring'
                ].map((step, index) => (
                  <div key={step} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our team combines deep expertise in AI research, academic publishing, and product development 
              to create tools that truly serve the research community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-violet-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.background}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-violet-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Research?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the growing community of researchers who are accelerating their discoveries with Insight Engine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2">
              <span>Start Free Trial</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;