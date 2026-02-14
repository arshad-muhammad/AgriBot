
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-primary tracking-tight">
            AgriDiagnost
          </Link>
          <div className="flex items-center space-x-8 text-sm font-medium text-mutedGray">
            <Link to="/dashboard" className={`hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary border-b-2 border-primary' : ''}`}>Dashboard</Link>
            <Link to="/history" className={`hover:text-primary ${location.pathname === '/history' ? 'text-primary border-b-2 border-primary' : ''}`}>Report History</Link>
            <Link to="/admin" className={`hover:text-primary ${location.pathname === '/admin' ? 'text-primary border-b-2 border-primary' : ''}`}>Administration</Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-charcoal text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h4 className="text-lg font-serif mb-4">AgriDiagnost</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Institutional-grade crop condition assessment platform for agricultural experts and research organizations.
            </p>
          </div>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <span className="text-white font-medium mb-2">Platform</span>
            <Link to="/dashboard" className="hover:text-white">New Assessment</Link>
            <Link to="/history" className="hover:text-white">Historical Records</Link>
            <Link to="/admin" className="hover:text-white">Admin Panel</Link>
          </div>
          <div className="flex flex-col space-y-2 text-sm text-gray-400">
            <span className="text-white font-medium mb-2">Legal</span>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Institutional Support</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-gray-800 mt-12 pt-8 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} AgriDiagnost Research Systems. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
