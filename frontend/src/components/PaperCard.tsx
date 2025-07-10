// import React from 'react';
// import { Calendar, Users, ExternalLink, BookOpen, TrendingUp } from 'lucide-react';
// import { Paper } from '../types';

// interface PaperCardProps {
//   paper: Paper;
//   onClick?: () => void;
//   showActions?: boolean;
// }

// const PaperCard: React.FC<PaperCardProps> = ({ paper, onClick, showActions = true }) => {
//   return (
//     <div 
//       className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer group"
//       onClick={onClick}
//     >
//       <div className="flex justify-between items-start mb-4">
//         <div className="flex-1">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-200">
//             {paper.title}
//           </h3>
//           <div className="flex flex-wrap gap-2 mb-3">
//             {paper.keywords.slice(0, 3).map((keyword) => (
//               <span
//                 key={keyword}
//                 className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
//               >
//                 {keyword}
//               </span>
//             ))}
//             {paper.keywords.length > 3 && (
//               <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full">
//                 +{paper.keywords.length - 3} more
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="flex items-center space-x-2 text-sm text-gray-500">
//           <TrendingUp className="h-4 w-4" />
//           <span>{paper.citationCount} citations</span>
//         </div>
//       </div>

//       <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
//         {paper.abstract}
//       </p>

//       <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-1">
//             <Users className="h-4 w-4" />
//             <span>{paper.authors.length} authors</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <Calendar className="h-4 w-4" />
//             <span>{new Date(paper.publishedDate).toLocaleDateString()}</span>
//           </div>
//           <div className="flex items-center space-x-1">
//             <BookOpen className="h-4 w-4" />
//             <span>{paper.domain}</span>
//           </div>
//         </div>
//       </div>

//       <div className="border-t border-gray-100 pt-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
//           <div>
//             <span className="font-medium text-gray-700">Key Findings:</span>
//             <p className="text-gray-600 mt-1">{paper.findings[0]?.substring(0, 60)}...</p>
//           </div>
//           <div>
//             <span className="font-medium text-gray-700">Methodology:</span>
//             <p className="text-gray-600 mt-1">{paper.methodology[0]?.substring(0, 60)}...</p>
//           </div>
//         </div>
//       </div>

//       {showActions && (
//         <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
//           <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1 transition-colors duration-200">
//             <span>View Details</span>
//             <ExternalLink className="h-3 w-3" />
//           </button>
//           <div className="flex space-x-2">
//             <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors duration-200">
//               Extract Insights
//             </button>
//             <button className="px-3 py-1 text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-full transition-colors duration-200">
//               Suggest Replication
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PaperCard;

import React from 'react';
import {
  Calendar,
  Users,
  ExternalLink,
  BookOpen,
  TrendingUp,
} from 'lucide-react';
import { Paper } from '../types';

interface PaperCardProps {
  paper: Paper;
  onClick?: () => void;
  showActions?: boolean;
}

const PaperCard: React.FC<PaperCardProps> = ({
  paper,
  onClick,
  showActions = true,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition cursor-pointer group"
      onClick={onClick}
    >
      {/* header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition">
            {paper.title}
          </h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {paper.keywords?.slice(0, 3).map((k) => (
              <span
                key={k}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
              >
                {k}
              </span>
            ))}
            {paper.keywords && paper.keywords.length > 3 && (
              <span className="px-2 py-1 bg-gray-50 text-gray-500 text-xs font-medium rounded-full">
                +{paper.keywords.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="h-4 w-4" />
          <span>{paper.citationCount ?? 0} citations</span>
        </div>
      </div>

      {/* abstract */}
      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {paper.abstract}
      </p>

      {/* meta row */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{paper.authors?.length ?? 0} authors</span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>
              {paper.publishedDate
                ? new Date(paper.publishedDate).toLocaleDateString()
                : '—'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span>{paper.domain ?? '—'}</span>
          </div>
        </div>
      </div>

      {/* quick peek */}
      <div className="border-t border-gray-100 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="font-medium text-gray-700">Key Findings:</span>
            <p className="text-gray-600 mt-1">
              {paper.findings?.[0]?.substring(0, 60) ?? '—'}…
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Methodology:</span>
            <p className="text-gray-600 mt-1">
              {paper.methodology?.[0]?.substring(0, 60) ?? '—'}…
            </p>
          </div>
        </div>
      </div>

      {/* actions */}
      {showActions && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
            <span>View Details</span>
            <ExternalLink className="h-3 w-3" />
          </button>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full">
              Extract Insights
            </button>
            <button className="px-3 py-1 text-xs font-medium text-violet-600 bg-violet-50 hover:bg-violet-100 rounded-full">
              Suggest Replication
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperCard;
