import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Stethoscope, Mail, Lock, User, Eye, EyeOff, Shield, Activity, AlertTriangle, CheckCircle, Github } from 'lucide-react';
import toast from 'react-hot-toast';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    medicalId: '',
    department: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState('INITIALIZING');
  const [validationStep, setValidationStep] = useState(0);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSocialSignup = async (provider: string) => {
    setLoading(true);
    toast.loading(`REGISTERING WITH ${provider.toUpperCase()}...`, { id: 'social-signup' });
    
    // Simulate social signup
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      await signup(`Demo User`, `demo@${provider}.com`, 'demo123');
      toast.dismiss('social-signup');
      toast.success(`${provider.toUpperCase()} REGISTRATION SUCCESSFUL`, {
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
      toast.dismiss('social-signup');
      toast.error(`${provider.toUpperCase()} REGISTRATION FAILED`);
    } finally {
      setLoading(false);
    }
  };
  const departments = [
    'EMERGENCY MEDICINE',
    'CARDIOLOGY',
    'DERMATOLOGY',
    'OPHTHALMOLOGY',
    'GENERAL PRACTICE',
    'RADIOLOGY',
    'PATHOLOGY',
    'SURGERY'
  ];

  useEffect(() => {
    const statusTimer = setTimeout(() => {
      setSystemStatus('OPERATIONAL');
    }, 2000);

    return () => clearTimeout(statusTimer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('SECURITY CODES DO NOT MATCH', {
        style: {
          background: '#FF3B30',
          color: '#FFFFFF',
          fontFamily: 'JetBrains Mono',
          fontWeight: 'bold',
          border: '4px solid #000000'
        }
      });
      return;
    }

    setLoading(true);
    setValidationStep(1);

    // Realistic registration simulation
    const registrationSteps = [
      'VALIDATING MEDICAL CREDENTIALS',
      'CHECKING DEPARTMENT AUTHORIZATION',
      'VERIFYING BIOMETRIC DATA',
      'CREATING SECURE PROFILE',
      'INITIALIZING SYSTEM ACCESS',
      'GENERATING SECURITY TOKENS'
    ];

    for (let i = 0; i < registrationSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.loading(registrationSteps[i], { id: 'registration-step' });
      setValidationStep(i + 1);
    }

    try {
      await signup(formData.username, formData.email, formData.password);
      toast.dismiss('registration-step');
      toast.success('REGISTRATION SUCCESSFUL - ACCESS GRANTED', {
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
      toast.dismiss('registration-step');
      toast.error('REGISTRATION FAILED - ACCESS DENIED', {
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
      setValidationStep(0);
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
              <div className="font-mono text-xs font-bold text-white-force">MEDICAL DISCLAIMER</div>
              <div className="text-xs text-white-force">
                This system is for demonstration purposes only.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
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
              <div className="w-16 h-16 bg-medical-green border-4 border-brutal-black mx-auto flex items-center justify-center heartbeat">
                <Stethoscope className="h-8 w-8 text-brutal-white" />
              </div>
            </motion.div>
            
            <h1 className="medical-title text-4xl mb-2">SYSTEM REGISTRATION</h1>
            <p className="font-mono text-sm text-brutal-black mb-6">MEDICAL PERSONNEL ONLY</p>
            
            {/* Security Notice */}
            <div className="brutal-card p-4 mb-6 bg-medical-teal text-brutal-white">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-mono text-xs font-bold text-white">DEMO SYSTEM</div>
                  <div className="text-xs text-white">
                    Use any credentials to create a demonstration account.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form */}
          <div className="brutal-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="medical-subtitle text-black">NEW REGISTRATION</div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-medical-green" />
                <span className="font-mono text-xs font-bold text-black">SECURE</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block font-mono text-sm font-bold text-black-force mb-2">
                    FULL NAME
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-4 h-5 w-5 text-brutal-gray" />
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="brutal-input pl-12 w-full px-4 py-3 font-mono font-semibold"
                      placeholder="Dr. Smith"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="medicalId" className="block font-mono text-sm font-bold text-black-force mb-2">
                    MEDICAL ID
                  </label>
                  <input
                    id="medicalId"
                    name="medicalId"
                    type="text"
                    value={formData.medicalId}
                    onChange={handleChange}
                    required
                    className="brutal-input w-full px-4 py-3 font-mono font-semibold"
                    placeholder="MD12345"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block font-mono text-sm font-bold text-black-force mb-2">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-4 h-5 w-5 text-brutal-gray" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="brutal-input pl-12 w-full px-4 py-3 font-mono font-semibold"
                    placeholder="doctor@hospital.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="department" className="block font-mono text-sm font-bold text-black-force mb-2">
                  DEPARTMENT
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                  className="brutal-input w-full px-4 py-3 font-mono font-semibold"
                >
                  <option value="">SELECT DEPARTMENT</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="password" className="block font-mono text-sm font-bold text-black-force mb-2">
                  SECURITY CODE
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-brutal-gray" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
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

              <div>
                <label htmlFor="confirmPassword" className="block font-mono text-sm font-bold text-black-force mb-2">
                  CONFIRM CODE
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-4 h-5 w-5 text-brutal-gray" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="brutal-input pl-12 w-full px-4 py-3 font-mono font-semibold"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Validation Progress */}
              {loading && (
                <div className="brutal-card p-4 bg-brutal-light-gray">
                  <div className="flex items-center space-x-3 mb-2">
                    <Activity className="h-5 w-5 text-medical-blue medical-pulse" />
                    <div className="font-mono text-sm font-bold text-black-force">VALIDATION IN PROGRESS</div>
                  </div>
                  <div className="w-full bg-brutal-white border-2 border-brutal-black h-2">
                    <div 
                      className="h-full bg-medical-green transition-all duration-1000"
                      style={{ width: `${(validationStep / 6) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`brutal-button brutal-button-success w-full py-4 text-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-brutal-white border-t-transparent rounded-full animate-spin"></div>
                    <span>PROCESSING...</span>
                  </div>
                ) : (
                  'REQUEST ACCESS'
                )}
              </button>
            </form>

            {/* Social Signup */}
            <div className="mt-6 pt-6 border-t-4 border-brutal-black">
              <div className="medical-subtitle text-black-force mb-4 text-center">QUICK REGISTRATION</div>
              <div className="space-y-3">
                <button
                  onClick={() => handleSocialSignup('google')}
                  disabled={loading}
                  className="brutal-button w-full py-3 bg-white text-black border-4 border-brutal-black hover:bg-brutal-light-gray disabled:opacity-50"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 bg-medical-red rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">G</span>
                    </div>
                    <span className="font-mono font-bold">REGISTER WITH GOOGLE</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleSocialSignup('github')}
                  disabled={loading}
                  className="brutal-button w-full py-3 bg-black text-white border-4 border-brutal-black disabled:opacity-50"
                >
                  <div className="flex items-center justify-center space-x-3">
                    <Github className="h-5 w-5" />
                    <span className="font-mono font-bold">REGISTER WITH GITHUB</span>
                  </div>
                </button>
              </div>
            </div>

            {/* System Info */}
            <div className="mt-6 pt-6 border-t-2 border-brutal-gray">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="brutal-card p-2 bg-medical-blue text-white">
                  <div className="font-mono text-xs text-white-force">USERS</div>
                  <div className="font-bold text-sm text-white-force">2.8K</div>
                </div>
                <div className="brutal-card p-2 bg-medical-green text-white">
                  <div className="font-mono text-xs text-white-force">ACTIVE</div>
                  <div className="font-bold text-sm text-white-force">847</div>
                </div>
                <div className="brutal-card p-2 bg-medical-purple text-white">
                  <div className="font-mono text-xs text-white-force">SCANS</div>
                  <div className="font-bold text-sm text-white-force">94K</div>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-mono text-sm text-black-force">
                ALREADY REGISTERED?{' '}
                <Link to="/login" className="font-bold text-medical-blue hover:text-medical-red transition-colors">
                  ACCESS SYSTEM
                </Link>
              </p>
            </div>
          </div>

          {/* Medical Disclaimer */}
          <div className="brutal-card p-4 bg-medical-orange text-white text-center">
            <div className="font-mono text-xs font-bold mb-1 text-white">MEDICAL DISCLAIMER</div>
            <div className="text-xs text-white">
              This system is for demonstration purposes only. Not for actual medical use.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;