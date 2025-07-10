
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Brain,
  Upload,
  Search,
  BarChart3,
  Info,
  MessageSquare,
} from 'lucide-react';

/**
 * Top navigation bar.  When the user clicks the “Search” item we pass a little
 * router-state flag ({ autoFetch: true }).  The Search page will see that flag,
 * call the backend once, then immediately clear the flag so a page refresh
 * doesn’t re-trigger the fetch.
 */
const Navigation: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Home', icon: Brain },
    { path: '/upload', label: 'Upload', icon: Upload },
    { path: '/search', label: 'Search', icon: Search, autoFetch: true },
    { path: '/chat', label: 'AI Chat', icon: MessageSquare },
    { path: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* logo / brand */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg group-hover:from-blue-700 group-hover:to-violet-700 transition-all">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">
                Insight Engine
              </span>
              <span className="text-xs text-gray-500">
                AI Research Assistant
              </span>
            </div>
          </Link>

          {/* desktop links */}
          <div className="hidden md:flex space-x-1">
            {navItems.map(({ path, label, icon: Icon, autoFetch }) => (
              <Link
                key={path}
                to={path}
                state={autoFetch ? { autoFetch: true } : undefined}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* mobile icons (first three only) */}
          <div className="md:hidden flex items-center space-x-2">
            {navItems.slice(0, 3).map(({ path, icon: Icon, autoFetch }) => (
              <Link
                key={path}
                to={path}
                state={autoFetch ? { autoFetch: true } : undefined}
                className={`p-2 rounded-lg transition ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
