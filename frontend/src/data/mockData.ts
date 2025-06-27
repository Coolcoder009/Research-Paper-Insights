import { Paper, DashboardMetrics } from '../types';

export const mockPapers: Paper[] = [
  {
    id: '1',
    title: 'Machine Learning Applications in Neuroimaging: A Comprehensive Meta-Analysis',
    authors: ['Dr. Sarah Chen', 'Prof. Michael Rodriguez', 'Dr. Elena Vasquez'],
    journal: 'Nature Neuroscience',
    publishedDate: '2024-01-15',
    doi: '10.1038/nn.2024.001',
    abstract: 'This comprehensive meta-analysis examines the application of machine learning techniques in neuroimaging studies across multiple domains. We analyzed 247 studies published between 2020-2023, focusing on classification accuracy, methodology robustness, and clinical applicability.',
    methodology: [
      'Systematic literature review following PRISMA guidelines',
      'Meta-analysis using random-effects model',
      'Quality assessment using Newcastle-Ottawa Scale',
      'Statistical heterogeneity analysis using I² statistic'
    ],
    findings: [
      'Deep learning models achieved 89.3% average accuracy in brain tumor classification',
      'Convolutional Neural Networks outperformed traditional ML by 12.7%',
      'Transfer learning reduced training time by 65% while maintaining accuracy',
      'Ensemble methods showed superior performance in multi-class problems'
    ],
    limitations: [
      'High heterogeneity across imaging protocols (I² = 78%)',
      'Limited diversity in patient populations',
      'Lack of standardized evaluation metrics',
      'Insufficient external validation studies'
    ],
    domain: 'Neuroscience',
    sampleSize: 247,
    keywords: ['machine learning', 'neuroimaging', 'deep learning', 'brain tumor', 'CNN'],
    replicationSuggestions: [
      'Implement standardized imaging protocols across studies',
      'Conduct multi-center validation with diverse populations',
      'Develop common evaluation framework for fair comparison'
    ],
    citationCount: 145
  },
  {
    id: '2',
    title: 'CRISPR-Cas9 Gene Editing Efficacy in Treating Huntington\'s Disease: Phase II Clinical Trial Results',
    authors: ['Dr. James Wilson', 'Prof. Lisa Chang', 'Dr. Robert Kim', 'Dr. Maria Santos'],
    journal: 'Cell Therapy and Regenerative Medicine',
    publishedDate: '2024-02-08',
    doi: '10.1016/j.ctrm.2024.002',
    abstract: 'We present results from a Phase II clinical trial evaluating CRISPR-Cas9 gene editing therapy for Huntington\'s disease. This randomized, double-blind, placebo-controlled study involved 156 patients across 12 medical centers.',
    methodology: [
      'Randomized controlled trial (RCT) design',
      'Double-blind, placebo-controlled methodology',
      'Stratified randomization by disease severity',
      'Primary endpoint: UHDRS motor score improvement',
      'Secondary endpoints: cognitive and functional assessments'
    ],
    findings: [
      '23% reduction in motor symptoms at 6-month follow-up',
      'Significant improvement in cognitive function (p<0.001)',
      'Sustained therapeutic effect observed at 12 months',
      'No serious adverse events related to gene editing',
      '78% of patients showed clinical improvement'
    ],
    limitations: [
      'Short follow-up period (12 months)',
      'Limited to early-stage HD patients only',
      'High treatment cost may limit accessibility',
      'Long-term safety profile still unknown'
    ],
    domain: 'Genetics',
    sampleSize: 156,
    keywords: ['CRISPR', 'gene editing', 'Huntington disease', 'clinical trial', 'neurodegenerative'],
    replicationSuggestions: [
      'Extend follow-up period to 5+ years for long-term safety',
      'Include patients with advanced disease stages',
      'Conduct cost-effectiveness analysis'
    ],
    citationCount: 89
  },
  {
    id: '3',
    title: 'Climate Change Impact on Pollinator Diversity: A Global Systematic Review',
    authors: ['Dr. Emma Thompson', 'Prof. David Miller', 'Dr. Sophie Laurent'],
    journal: 'Global Ecology and Biogeography',
    publishedDate: '2024-01-22',
    doi: '10.1111/geb.2024.003',
    abstract: 'This systematic review synthesizes evidence from 189 studies examining the relationship between climate change variables and pollinator diversity across different ecosystems worldwide.',
    methodology: [
      'Systematic review following ROSES reporting standards',
      'Global literature search across 8 databases',
      'Meta-regression analysis for continuous outcomes',
      'Subgroup analysis by ecosystem type and geographic region'
    ],
    findings: [
      '34% decline in pollinator species richness per 1°C temperature increase',
      'Mediterranean ecosystems show highest vulnerability',
      'Native bee species more affected than introduced species',
      'Urban areas provide climate refugia for some species'
    ],
    limitations: [
      'Taxonomic bias toward bee species (67% of studies)',
      'Geographic bias toward temperate regions',
      'Limited long-term monitoring data',
      'Inconsistent sampling methodologies across studies'
    ],
    domain: 'Ecology',
    sampleSize: 189,
    keywords: ['climate change', 'pollinators', 'biodiversity', 'ecosystem', 'conservation'],
    replicationSuggestions: [
      'Increase representation of tropical and Arctic regions',
      'Standardize pollinator monitoring protocols globally',
      'Include broader range of pollinator taxa'
    ],
    citationCount: 67
  },
  {
    id: '4',
    title: 'Quantum Computing Applications in Drug Discovery: Performance Analysis and Future Prospects',
    authors: ['Dr. Alan Turing Jr.', 'Prof. Marie Curie III', 'Dr. Stephen Hawking Jr.'],
    journal: 'Quantum Information Processing',
    publishedDate: '2024-02-14',
    doi: '10.1007/qip.2024.004',
    abstract: 'We evaluate the current state and future potential of quantum computing in pharmaceutical research, analyzing 98 quantum algorithm implementations for molecular simulation and drug-target interaction prediction.',
    methodology: [
      'Comparative analysis of quantum vs classical algorithms',
      'Benchmark testing on quantum simulators and hardware',
      'Computational complexity analysis',
      'Performance metrics: accuracy, speed, resource requirements'
    ],
    findings: [
      'Quantum algorithms show 100x speedup for molecular simulations >50 atoms',
      'Variational Quantum Eigensolver achieves 95% accuracy in protein folding',
      'Current quantum hardware limited by decoherence times',
      'Hybrid quantum-classical approaches most promising near-term'
    ],
    limitations: [
      'Limited availability of quantum hardware',
      'High error rates in current quantum processors',
      'Scalability challenges for real-world molecules',
      'Lack of quantum software development expertise'
    ],
    domain: 'Quantum Computing',
    sampleSize: 98,
    keywords: ['quantum computing', 'drug discovery', 'molecular simulation', 'NISQ', 'VQE'],
    replicationSuggestions: [
      'Implement algorithms on fault-tolerant quantum computers',
      'Develop quantum error correction specific to molecular simulation',
      'Create standardized benchmarks for quantum drug discovery'
    ],
    citationCount: 112
  }
];

export const mockDashboardMetrics: DashboardMetrics = {
  totalPapers: 1247,
  uniqueDomains: 28,
  avgSampleSize: 189,
  topMethodologies: [
    { name: 'Randomized Controlled Trial', count: 342 },
    { name: 'Meta-Analysis', count: 198 },
    { name: 'Systematic Review', count: 156 },
    { name: 'Cross-sectional Study', count: 134 },
    { name: 'Longitudinal Study', count: 98 }
  ],
  recentFindings: [
    'AI models in medical imaging show 94% diagnostic accuracy',
    'CRISPR gene therapy demonstrates 78% success rate in trials',
    'Climate change accelerating species extinction by 23%',
    'Quantum computing breakthrough in protein folding prediction'
  ],
  collaborationOpportunities: 89
};