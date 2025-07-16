import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Stethoscope, Mail, Lock, Eye, EyeOff, Shield, Activity, AlertTriangle, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const [authStep, setAuthStep] = useState(1);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: string) => {
    setLoading(true);
    toast.loading(`AUTHENTICATING WITH ${provider.toUpperCase()}...`, { id: 'social-auth' });
    
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      await login(`demo@${provider}.com`, 'demo123');
      toast.dismiss('social-auth');
      toast.success(`${provider.toUpperCase()} AUTHENTICATION SUCCESSFUL`, {
        style: {
          background: '#34C759',
          color: '#FFFFFF',
          fontFamily: 'JetBrains Mono',
          fontWeight: 'bold',
          border: '4px solid #000000'
        }
      });
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss('social-auth');
      toast.error(`${provider.toUpperCase()} AUTHENTICATION FAILED`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const statusTimer = setTimeout(() => {
      setSystemStatus('OPERATIONAL');
    }, 2000);

    return () => clearTimeout(statusTimer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAuthStep(2);

    // Realistic authentication simulation
    const authSteps = [
      'VERIFYING CREDENTIALS',
      'CHECKING MEDICAL CLEARANCE',
      'VALIDATING BIOMETRIC DATA',
      'ACCESSING PATIENT DATABASE',
      'INITIALIZING SECURE SESSION'
    ];

    for (let i = 0; i < authSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.loading(authSteps[i], { id: 'auth-step' });
    }

    try {
      await login(email, password);
      toast.dismiss('auth-step');
      toast.success('AUTHENTICATION SUCCESSFUL - ACCESS GRANTED', {
        duration: 2000,
        style: {
          background: '#34C759',
          color: '#FFFFFF',
          fontFamily: 'JetBrains Mono',
          fontWeight: 'bold',
          border: '4px solid #000000'
        }
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (error) {
      toast.dismiss('auth-step');
      toast.error('AUTHENTICATION FAILED - ACCESS DENIED', {
        style: {
          background: '#FF3B30',
          color: '#FFFFFF',
          fontFamily: 'JetBrains Mono',
          fontWeight: 'bold',
          border: '4px solid #000000'
        }
      });
    } finally {
      setLoading(false);
      setAuthStep(1);
    }
  };

  return (
    <div className="min-h-screen bg-brutal-white relative overflow-hidden">
      {/* Medical Grid Background */}
      <div className="fixed inset-0 medical-grid pointer-events-none"></div>
      
      {/* System Status Bar */}
      <div className="fixed top-0 left-0 right-0 bg-brutal-black text-brutal-white p-2 z-50 border-b-4 border-brutal-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="font-mono text-xs text-white-force">SPC MEDICAL AI v2.1.0</div>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${systemStatus === 'OPERATIONAL' ? 'status-online' : 'status-warning'}`}></div>
              <div className="font-mono text-xs text-white-force">SECURE CONNECTION ESTABLISHED</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="brutal-card p-4 mb-6 inline-block"
            >
              <div className="w-16 h-16 bg-medical-red border-4 border-brutal-black mx-auto flex items-center justify-center heartbeat">
                <Stethoscope className="h-8 w-8 text-brutal-white" />
              </div>
            </motion.div>
            
            <h1 className="medical-title text-4xl mb-2">SYSTEM ACCESS</h1>
            <p className="font-mono text-sm text-brutal-black mb-6">AUTHORIZED PERSONNEL ONLY</p>
            
            {/* Security Notice */}
            <div className="brutal-card p-4 mb-6 bg-medical-yellow">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-brutal-black" />
                <div className="text-left">
                  <div className="font-mono text-xs font-bold text-black">SECURITY NOTICE</div>
                  <div className="text-xs text-black">
                    This is a demonstration system. Use any credentials to access.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="brutal-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="medical-subtitle text-black">AUTHENTICATION</div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-medical-green" />
                <span className="font-mono text-xs font-bold text-black">ENCRYPTED</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
               <label htmlFor="email" className="block font-mono text-sm font-bold text-black-force mb-2">
                  MEDICAL ID / EMAIL
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-brutal-gray" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="brutal-input pl-12 w-full px-4 py-3 font-mono font-semibold"
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block font-mono text-sm font-bold text-black-force mb-2">
                  SECURITY CODE
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-brutal-gray" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="brutal-input pl-12 pr-12 w-full px-4 py-3 font-mono font-semibold"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-brutal-gray hover:text-brutal-black"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Biometric Simulation */}
              <div className="brutal-card p-4 bg-brutal-light-gray">
                <div className="flex items-center space-x-3">
                  <Activity className="h-5 w-5 text-medical-blue medical-pulse" />
                  <div>
                    <div className="font-mono text-xs text-black-force">BIOMETRIC STATUS</div>
                    <div className="font-mono text-sm font-bold text-black-force">FINGERPRINT VERIFIED</div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`brutal-button brutal-button-primary w-full py-4 text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-brutal-white border-t-transparent rounded-full animate-spin"></div>
                    <span>AUTHENTICATING...</span>
                  </div>
                ) : (
                  'INITIATE ACCESS'
                )}
              </button>
            </form>

            {/* Social Login */}
            <div className="mt-6 pt-6 border-t-4 border-brutal-black">
              <div className="medical-subtitle text-black-force mb-4 text-center">ALTERNATIVE ACCESS</div>
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialLogin('google')}
                  disabled={loading}
                  className="brutal-button w-full py-3 bg-white text-black border-4 border-brutal-black hover:bg-brutal-light-gray disabled:opacity-50"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 bg-medical-red rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <span className="font-mono font-bold">GOOGLE AUTHENTICATION</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSocialLogin('github')}
                  disabled={loading}
                  className="brutal-button w-full py-3 bg-black text-white border-4 border-brutal-black disabled:opacity-50"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Github className="h-5 w-5" />
                    <span className="font-mono font-bold">GITHUB AUTHENTICATION</span>
                  </div>
                </button>
              </div>
            </div>
            {/* System Info */}
            <div className="mt-6 pt-6 border-t-2 border-brutal-gray">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="brutal-card p-3 bg-medical-green text-white">
                  <div className="font-mono text-xs text-white-force">UPTIME</div>
                  <div className="font-bold text-white-force">99.9%</div>
                </div>
                <div className="brutal-card p-3 bg-medical-blue text-white">
                  <div className="font-mono text-xs text-white-force">RESPONSE</div>
                  <div className="font-bold text-white-force">0.2ms</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-mono text-sm text-black-force">
                NEW TO THE SYSTEM?{' '}
                <Link to="/signup" className="font-bold text-medical-blue hover:text-medical-red transition-colors">
                  REQUEST ACCESS
                </Link>
              </p>
            </div>
          </div>

          {/* Emergency Access */}
          <div className="brutal-card p-4 bg-medical-red text-white text-center">
           <div className="font-mono text-xs font-bold mb-1 text-white-force">EMERGENCY ACCESS</div>
           <div className="text-xs text-white-force">
              For medical emergencies, contact system administrator immediately
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;