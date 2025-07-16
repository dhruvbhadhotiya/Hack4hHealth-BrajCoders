import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Stethoscope, Home, Activity, LogOut, User, Shield } from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/home', label: 'SCANS', icon: Home },
    { path: '/dashboard', label: 'DASHBOARD', icon: Activity },
  ];

  return (
    <nav className="bg-brutal-white border-b-4 border-brutal-black sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/home" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-medical-red border-4 border-brutal-black flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white-force" />
              </div>
              <div>
                <div className="medical-title text-2xl text-black">SPC</div>
                <div className="font-mono text-xs text-black">MEDICAL AI v2.1</div>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`brutal-card px-4 py-2 transition-all ${
                    isActive
                      ? 'bg-medical-blue text-brutal-white'
                      : 'hover:bg-brutal-light-gray text-black'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-black'}`} />
                    <span className={`font-mono text-sm font-bold ${isActive ? 'text-white' : 'text-black'}`}>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="brutal-card p-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-medical-green border-2 border-brutal-black flex items-center justify-center">
                  <User className="h-4 w-4 text-white-force" />
                </div>
                <div>
                  <div className="font-mono text-xs text-black-force">PATIENT</div>
                  <div className="font-mono text-sm font-bold text-black-force">{user?.username?.toUpperCase()}</div>
                </div>
              </div>
            </div>
            
            <div className="brutal-card p-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-medical-green" />
                <span className="font-mono text-xs font-bold text-black-force">SECURE</span>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="brutal-button brutal-button-danger px-4 py-2"
            >
              <div className="flex items-center space-x-2">
                <LogOut className="h-4 w-4 text-white-force" />
                <span className="font-mono text-sm font-bold text-white-force">LOGOUT</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;