// import React, { useState } from 'react';
// import { Upload as UploadIcon, FileText, ExternalLink, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
// import LoadingSpinner from '../components/LoadingSpinner';

// const Upload: React.FC = () => {
//   const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
//   const [dragActive, setDragActive] = useState(false);
//   const [pubmedId, setPubmedId] = useState('');
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileUpload = (file: File) => {
//     setSelectedFile(file);
//     setUploadStatus('uploading');
    
//     // Simulate upload and processing
//     setTimeout(() => {
//       setUploadStatus('processing');
//       setTimeout(() => {
//         setUploadStatus('success');
//       }, 3000);
//     }, 2000);
//   };

//   const handlePubMedFetch = () => {
//     if (!pubmedId.trim()) return;
    
//     setUploadStatus('processing');
//     setTimeout(() => {
//       setUploadStatus('success');
//     }, 3000);
//   };

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);

//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
//       handleFileUpload(e.dataTransfer.files[0]);
//     }
//   };

//   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       handleFileUpload(e.target.files[0]);
//     }
//   };

//   const resetUpload = () => {
//     setUploadStatus('idle');
//     setSelectedFile(null);
//     setPubmedId('');
//   };

//   const renderUploadStatus = () => {
//     switch (uploadStatus) {
//       case 'uploading':
//         return (
//           <div className="text-center py-8">
//             <LoadingSpinner size="lg" className="mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading File...</h3>
//             <p className="text-gray-600">Please wait while we upload your document.</p>
//           </div>
//         );
      
//       case 'processing':
//         return (
//           <div className="text-center py-8">
//             <div className="relative mb-4">
//               <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
//                 <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
//               </div>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Document...</h3>
//             <p className="text-gray-600 mb-4">Our AI is extracting insights from your research paper.</p>
//             <div className="max-w-md mx-auto">
//               <div className="flex justify-between text-sm text-gray-600 mb-2">
//                 <span>Progress</span>
//                 <span>78%</span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: '78%' }}></div>
//               </div>
//             </div>
//           </div>
//         );
      
//       case 'success':
//         return (
//           <div className="text-center py-8">
//             <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Complete!</h3>
//             <p className="text-gray-600 mb-6">Your research paper has been successfully analyzed.</p>
//             <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
//               <h4 className="font-semibold text-green-800 mb-2">Extracted Information:</h4>
//               <ul className="text-sm text-green-700 space-y-1">
//                 <li>✓ 4 methodology steps identified</li>
//                 <li>✓ 6 key findings extracted</li>
//                 <li>✓ 3 study limitations noted</li>
//                 <li>✓ 2 replication suggestions generated</li>
//               </ul>
//             </div>
//             <div className="flex gap-3 justify-center">
//               <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
//                 View Analysis
//               </button>
//               <button
//                 onClick={resetUpload}
//                 className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
//               >
//                 Upload Another
//               </button>
//             </div>
//           </div>
//         );
      
//       case 'error':
//         return (
//           <div className="text-center py-8">
//             <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Failed</h3>
//             <p className="text-gray-600 mb-6">There was an error processing your document. Please try again.</p>
//             <button
//               onClick={resetUpload}
//               className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
//             >
//               Try Again
//             </button>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   if (uploadStatus !== 'idle') {
//     return (
//       <div className="min-h-screen bg-gray-50 py-8">
//         <div className="max-w-2xl mx-auto px-4">
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
//             {renderUploadStatus()}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Research Paper</h1>
//           <p className="text-lg text-gray-600">
//             Upload your research papers or fetch them directly from PubMed Central for AI-powered analysis
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* File Upload */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center space-x-2 mb-4">
//               <UploadIcon className="h-5 w-5 text-blue-600" />
//               <h2 className="text-xl font-semibold text-gray-900">Upload File</h2>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Upload your research paper in PDF, XML, or HTML format for analysis.
//             </p>

//             <div
//               className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
//                 dragActive
//                   ? 'border-blue-500 bg-blue-50'
//                   : 'border-gray-300 hover:border-gray-400'
//               }`}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//             >
//               <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 Drop your file here, or browse
//               </h3>
//               <p className="text-sm text-gray-500 mb-4">
//                 Supports PDF, XML, HTML files up to 50MB
//               </p>
//               <input
//                 type="file"
//                 id="file-upload"
//                 className="hidden"
//                 accept=".pdf,.xml,.html"
//                 onChange={handleFileSelect}
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
//               >
//                 Browse Files
//               </label>
//             </div>

//             <div className="mt-4 text-xs text-gray-500">
//               <p><strong>Supported formats:</strong> PDF, XML, HTML</p>
//               <p><strong>Max file size:</strong> 50MB</p>
//             </div>
//           </div>

//           {/* PubMed Central */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//             <div className="flex items-center space-x-2 mb-4">
//               <ExternalLink className="h-5 w-5 text-green-600" />
//               <h2 className="text-xl font-semibold text-gray-900">Fetch from PubMed Central</h2>
//             </div>
//             <p className="text-gray-600 mb-6">
//               Enter a PubMed ID, DOI, or URL to automatically fetch and analyze a paper.
//             </p>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">
//                   PubMed ID, DOI, or URL
//                 </label>
//                 <input
//                   type="text"
//                   value={pubmedId}
//                   onChange={(e) => setPubmedId(e.target.value)}
//                   placeholder="e.g., PMC1234567, 10.1038/nature12345, or full URL"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                 />
//               </div>
//               <button
//                 onClick={handlePubMedFetch}
//                 disabled={!pubmedId.trim()}
//                 className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
//               >
//                 Fetch Paper
//               </button>
//             </div>

//             <div className="mt-6 p-4 bg-green-50 rounded-lg">
//               <h4 className="font-medium text-green-800 mb-2">Examples:</h4>
//               <ul className="text-sm text-green-700 space-y-1">
//                 <li>• PubMed ID: PMC1234567</li>
//                 <li>• DOI: 10.1038/nature12345</li>
//                 <li>• URL: https://pubmed.ncbi.nlm.nih.gov/...</li>
//               </ul>
//             </div>
//           </div>
//         </div>

//         {/* Recent Uploads */}
//         <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Uploads</h2>
//           <div className="space-y-3">
//             {[
//               {
//                 title: 'Machine Learning Applications in Neuroimaging',
//                 status: 'Processed',
//                 date: '2 hours ago',
//                 type: 'PDF'
//               },
//               {
//                 title: 'CRISPR-Cas9 Gene Editing Efficacy in Huntington\'s Disease',
//                 status: 'Processing',
//                 date: '1 day ago',
//                 type: 'PubMed'
//               },
//               {
//                 title: 'Climate Change Impact on Pollinator Diversity',
//                 status: 'Processed',
//                 date: '2 days ago',
//                 type: 'PDF'
//               }
//             ].map((upload, index) => (
//               <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
//                 <div className="flex-1">
//                   <h3 className="font-medium text-gray-900">{upload.title}</h3>
//                   <p className="text-sm text-gray-500">{upload.type} • {upload.date}</p>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <span className={`px-2 py-1 text-xs font-medium rounded-full ${
//                     upload.status === 'Processed'
//                       ? 'bg-green-100 text-green-800'
//                       : 'bg-yellow-100 text-yellow-800'
//                   }`}>
//                     {upload.status}
//                   </span>
//                   <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
//                     View
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Upload;


import React, { useState } from 'react';
import axios from 'axios';
import {
  Upload as UploadIcon,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import PaperDetail from '../components/PaperDetail';
import { Paper } from '../types';

const API_BASE = 'http://localhost:8000/api/v1/upload';

const Upload: React.FC = () => {
  const [uploadStatus, setUploadStatus] =
    useState<'idle' | 'uploading' | 'processing' | 'success' | 'error'>('idle');
  const [dragActive, setDragActive] = useState(false);
  const [pubmedId, setPubmedId] = useState('');
  const [paper, setPaper] = useState<Paper | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // ───────────────────────── helpers ─────────────────────────

  const mapApiToPaper = (data: any): Paper => ({
    title: data.title ?? '',
    authors: data.authors ? data.authors.split(/,\s*/) : [],
    journal: data.journal ?? '',
    doi: data.doi ?? '',
    domain: data.domain ?? '',
    citationCount: data.citations_count ?? 0,
    abstract: data.abstract ?? '',
    methodology: data.methodology?.split(/\. ?/) ?? [],
    findings: data.key_findings?.split(/\. ?/) ?? [],
    limitations: data.limitations?.split(/\. ?/) ?? [],
    replicationSuggestions: data.replication_suggestions?.split(/\. ?/) ?? [],
    keywords: data.keywords?.split(/,\s*/) ?? [],
  });

  // ───────────────── file upload ─────────────────

  const uploadFile = async (file: File) => {
    setUploadStatus('uploading');
    try {
      const form = new FormData();
      form.append('file', file);

      const res = await axios.post(`${API_BASE}/upload_main`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setUploadStatus('processing');
      const raw = res.data?.response ?? res.data;
      setPaper(mapApiToPaper(raw));
      setIsDetailOpen(true);
      setUploadStatus('success');
    } catch (e) {
      console.error(e);
      setUploadStatus('error');
    }
  };

  // ───────────── PubMed / DOI fetch (optional) ──────────────

  const fetchFromPubMed = async () => {
    if (!pubmedId.trim()) return;
    setUploadStatus('processing');
    try {
      const res = await axios.get(`${API_BASE}/fetch_pubmed`, {
        params: { query: pubmedId.trim() },
      });
      const raw = res.data?.response ?? res.data;
      setPaper(mapApiToPaper(raw));
      setIsDetailOpen(true);
      setUploadStatus('success');
    } catch (e) {
      console.error(e);
      setUploadStatus('error');
    }
  };

  // ───────────────────── drag-n-drop helpers ─────────────────────

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) uploadFile(e.dataTransfer.files[0]);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) uploadFile(e.target.files[0]);
  };

  const reset = () => {
    setUploadStatus('idle');
    setPaper(null);
    setPubmedId('');
  };

  // ───────────────────────── UI pieces ─────────────────────────

  const renderStatus = () => {
    switch (uploadStatus) {
      case 'uploading':
        return (
          <StatusCard
            icon={<LoadingSpinner size="lg" className="mx-auto mb-4" />}
            title="Uploading file…"
            subtitle="Please wait while we upload your document."
          />
        );

      case 'processing':
        return (
          <StatusCard
            icon={
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
            }
            title="Processing document…"
            subtitle="Our AI is extracting insights from your research paper."
          />
        );

      case 'success':
        return (
          <StatusCard
            icon={<CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />}
            title="Processing complete!"
            subtitle="Click below to review / edit the extracted data."
            extra={
              <button
                onClick={() => setIsDetailOpen(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                View Analysis
              </button>
            }
          />
        );

      case 'error':
        return (
          <StatusCard
            icon={<AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />}
            title="Something went wrong"
            subtitle="Please try again."
            extra={
              <button
                onClick={reset}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Try Again
              </button>
            }
          />
        );

      default:
        return null;
    }
  };

  // ───────────────────────── render ─────────────────────────

  if (uploadStatus !== 'idle') {
    return (
      <>
        {paper && (
          <PaperDetail
            paper={paper}
            isOpen={isDetailOpen}
            onClose={() => setIsDetailOpen(false)}
            onUpdate={setPaper}
          />
        )}
        <CenteredCard>{renderStatus()}</CenteredCard>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <Header />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File upload panel */}
          <UploadPanel
            dragActive={dragActive}
            handleDrag={handleDrag}
            handleDrop={handleDrop}
            handleSelect={handleSelect}
          />

          {/* PubMed / DOI panel */}
          <PubMedPanel
            pubmedId={pubmedId}
            setPubmedId={setPubmedId}
            handleFetch={fetchFromPubMed}
          />
        </div>
      </div>
    </div>
  );
};

/* ——————————————————————————————————————————————————————————————
   Tiny presentational helpers
—————————————————————————————————————————————————————————————— */

const Header = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Research Paper</h1>
    <p className="text-lg text-gray-600">
      Upload a PDF or fetch it from PubMed; then fill in any missing details.
    </p>
  </div>
);

const CenteredCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen bg-gray-50 py-8">
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        {children}
      </div>
    </div>
  </div>
);

const StatusCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  extra?: React.ReactNode;
}> = ({ icon, title, subtitle, extra }) => (
  <div className="text-center py-8">
    {icon}
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 mb-6">{subtitle}</p>
    {extra}
  </div>
);

const UploadPanel = ({
  dragActive,
  handleDrag,
  handleDrop,
  handleSelect,
}: {
  dragActive: boolean;
  handleDrag: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center space-x-2 mb-4">
      <UploadIcon className="h-5 w-5 text-blue-600" />
      <h2 className="text-xl font-semibold text-gray-900">Upload File</h2>
    </div>
    <p className="text-gray-600 mb-6">
      Upload your research paper in PDF, XML, or HTML format for analysis.
    </p>

    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition ${
        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Drop your file here, or browse
      </h3>
      <p className="text-sm text-gray-500 mb-4">PDF, XML, HTML • 50 MB max</p>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".pdf,.xml,.html"
        onChange={handleSelect}
      />
      <label
        htmlFor="file-upload"
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition"
      >
        Browse Files
      </label>
    </div>
  </div>
);

const PubMedPanel = ({
  pubmedId,
  setPubmedId,
  handleFetch,
}: {
  pubmedId: string;
  setPubmedId: (s: string) => void;
  handleFetch: () => void;
}) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <div className="flex items-center space-x-2 mb-4">
      <ExternalLink className="h-5 w-5 text-green-600" />
      <h2 className="text-xl font-semibold text-gray-900">Fetch from PubMed</h2>
    </div>
    <p className="text-gray-600 mb-6">
      Enter a PubMed ID, DOI, or URL; we’ll fetch the paper and let you fill any blanks.
    </p>

    <div className="space-y-4">
      <input
        type="text"
        value={pubmedId}
        onChange={(e) => setPubmedId(e.target.value)}
        placeholder="e.g. PMC1234567 or 10.1038/nature12345"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
      />
      <button
        onClick={handleFetch}
        disabled={!pubmedId.trim()}
        className="w-full px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
      >
        Fetch Paper
      </button>
    </div>
  </div>
);

export default Upload;
