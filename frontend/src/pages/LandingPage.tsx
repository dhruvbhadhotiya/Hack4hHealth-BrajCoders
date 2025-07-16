import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Shield, Zap, ArrowRight, Heart, Brain, Eye, Stethoscope } from 'lucide-react';

const LandingPage: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const stats = [
    { label: 'PATIENTS ANALYZED', value: '2,847,392' },
    { label: 'DISEASES PREVENTED', value: '847,293' },
    { label: 'LIVES SAVED', value: '94,847' },
    { label: 'AI ACCURACY', value: '99.7%' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const statTimer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(statTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brutal-white flex items-center justify-center">
        <div className="text-center">
          <div className="brutal-card p-8 mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-medical-red rounded-full flex items-center justify-center heartbeat">
              <Heart className="h-8 w-8 text-brutal-white" />
            </div>
            <div className="font-mono text-sm text-brutal-black mb-2">INITIALIZING SPC SYSTEM</div>
            <div className="w-48 h-2 bg-brutal-light-gray border-2 border-brutal-black mx-auto">
              <div className="h-full bg-medical-blue data-stream"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brutal-white">
      {/* Medical Grid Background */}
      <div className="fixed inset-0 medical-grid pointer-events-none"></div>
      
      {/* Header */}
      <header className="relative z-10 border-b-4 border-brutal-black bg-brutal-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-medical-red border-4 border-brutal-black flex items-center justify-center">
                <Stethoscope className="h-6 -6 text-brutal-white" />
              </div>
              <div>
                <div className="medical-title text-2xl">SPC</div>
                <div className="font-mono text-xs text-brutal-gray">MEDICAL AI v2.1</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="brutal-card px-4 py-2">
                <div className="font-mono text-xs text-brutal-gray">SYSTEM STATUS</div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full status-online"></div>
                  <span className="font-mono text-sm font-bold">OPERATIONAL</span>
                </div>
              </div>
              
              <Link to="/login" className="brutal-button brutal-button-primary px-6 py-3">
                ACCESS SYSTEM
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="brutal-card p-2 mb-6 inline-block">
                <div className="bg-medical-red text-white px-4 py-2 font-mono text-sm font-bold">
                  EMERGENCY PROTOCOL ACTIVE
                </div>
              </div>
              
              <h1 className="medical-title text-6xl lg:text-8xl mb-6 leading-none">
                SMARTER<br />
                <span className="text-medical-blue">PREVENTIVE</span><br />
                <span className="text-medical-red">CURE</span>
              </h1>
              
              <div className="brutal-card p-6 mb-8">
                <p className="text-xl font-semibold mb-4">
                  AI-POWERED MEDICAL ANALYSIS SYSTEM
                </p>
                <p className="text-brutal-black font-medium">
                  Revolutionary healthcare platform using advanced machine learning 
                  to detect diseases before symptoms appear. Save lives through 
                  early intervention and personalized prevention protocols.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="brutal-button brutal-button-primary px-8 py-4 text-lg">
                  INITIATE SCAN <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link to="/signup" className="brutal-button px-8 py-4 text-lg">
                  CREATE PROFILE
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="brutal-card p-8">
                <div className="medical-subtitle mb-4 text-black-force">REAL-TIME ANALYTICS</div>
                
                <div className="space-y-6">
                  <div className="brutal-card p-4 bg-brutal-light-gray">
                    <div className="font-mono text-sm text-black mb-1">CURRENT METRIC</div>
                    <div className="medical-title text-3xl text-medical-red">
                      {stats[currentStat].value}
                    </div>
                    <div className="font-mono text-sm font-bold text-black">
                      {stats[currentStat].label}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="brutal-card p-4 bg-medical-green text-brutal-white">
                      <Activity className="h-6 w-6 mb-2 vital-sign text-white" />
                      <div className="font-mono text-xs text-white">ACTIVE SCANS</div>
                      <div className="font-bold text-lg text-white">1,247</div>
                    </div>
                    <div className="brutal-card p-4 bg-medical-orange text-brutal-white">
                      <Brain className="h-6 w-6 mb-2 medical-pulse text-white" />
                      <div className="font-mono text-xs text-white">AI PROCESSING</div>
                      <div className="font-bold text-lg text-white">847ms</div>
                    </div>
                  </div>
                  
                  <div className="brutal-card p-4 bg-medical-blue text-brutal-white">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-mono text-xs text-white">SYSTEM STATUS</div>
                      <div className="w-2 h-2 bg-brutal-white rounded-full status-online"></div>
                    </div>
                    <div className="medical-title text-xl text-white">OPERATIONAL</div>
                    <div className="font-mono text-xs text-white">ALL SYSTEMS ONLINE</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is SPC Section */}
      <section className="py-20 bg-brutal-light-gray border-t-4 border-b-4 border-brutal-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="brutal-card p-2 mb-6 inline-block">
              <div className="bg-medical-blue text-brutal-white px-4 py-2 font-mono text-sm font-bold">
                <span className="text-white-force">SYSTEM OVERVIEW</span>
              </div>
            </div>
            <h2 className="medical-title text-5xl mb-6">WHAT IS SPC?</h2>
            <div className="brutal-card p-8 max-w-4xl mx-auto">
              <p className="text-xl font-semibold">
                <span className="text-black-force">Smarter Preventive Cure (SPC) is a revolutionary AI-powered medical platform 
                that analyzes health data to predict and prevent diseases before they manifest. 
                Our system processes millions of data points to provide personalized health 
                interventions and save lives through early detection.</span>
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI ANALYSIS',
                description: 'Advanced neural networks process medical data with 99.7% accuracy',
                color: 'medical-purple'
              },
              {
                icon: Shield,
                title: 'EARLY DETECTION',
                description: 'Identify health risks 6-12 months before symptoms appear',
                color: 'medical-green'
              },
              {
                icon: Zap,
                title: 'INSTANT RESULTS',
                description: 'Real-time analysis and personalized treatment protocols',
                color: 'medical-orange'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="brutal-card p-8 hover:scale-105 transition-transform"
              >
                <div className={`w-16 h-16 bg-${feature.color} border-4 border-brutal-black mb-6 flex items-center justify-center`}>
                  <feature.icon className="h-8 w-8 text-white-force" />
                </div>
                <h3 className="medical-subtitle text-xl mb-4">{feature.title}</h3>
                <p className="text-black-force font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* India Healthcare Crisis */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="brutal-card p-2 mb-6 inline-block">
                <div className="bg-medical-red text-brutal-white px-4 py-2 font-mono text-sm font-bold">
                  <span className="text-white-force">CRITICAL SITUATION</span>
                </div>
              </div>
              
              <h2 className="medical-title text-5xl mb-8">
                INDIA'S HEALTHCARE<br />
                <span className="text-medical-red">EMERGENCY</span>
              </h2>
              
              <div className="space-y-6">
                {[
                  { stat: '1.4B', label: 'POPULATION AT RISK', color: 'medical-red' },
                  { stat: '70%', label: 'LACK PREVENTIVE CARE', color: 'medical-orange' },
                  { stat: '2.3M', label: 'PREVENTABLE DEATHS/YEAR', color: 'medical-red' },
                  { stat: '₹8.2T', label: 'HEALTHCARE COST BURDEN', color: 'medical-purple' }
                ].map((item, index) => (
                  <div key={index} className="brutal-card p-6 flex items-center space-x-6">
                    <div className={`text-4xl font-mono font-bold text-${item.color}`}>
                      {item.stat}
                    </div>
                    <div>
                      <div className="font-mono text-sm text-black-force">METRIC</div>
                      <div className="font-bold text-lg text-black-force">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="brutal-card p-8">
                <div className="medical-subtitle mb-6 text-black-force">SOLUTION PROTOCOL</div>
                
                <div className="space-y-4">
                  {[
                    'AI-powered early disease detection',
                    'Personalized prevention protocols',
                    'Real-time health monitoring',
                    'Predictive risk assessment',
                    'Automated health alerts'
                  ].map((solution, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-6 h-6 bg-medical-green border-2 border-brutal-black flex items-center justify-center">
                        <div className="w-2 h-2 bg-brutal-white rounded-full"></div>
                      </div>
                      <span className="font-semibold text-black-force">{solution}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 brutal-card p-4 bg-medical-blue text-brutal-white">
                  <div className="font-mono text-sm mb-2 text-white-force">IMPACT PROJECTION</div>
                  <div className="medical-title text-2xl text-white-force">85% REDUCTION</div>
                  <div className="font-mono text-sm text-white-force">IN PREVENTABLE DEATHS</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Medical Tests Preview */}
      <section className="py-20 bg-brutal-light-gray border-t-4 border-b-4 border-brutal-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="brutal-card p-2 mb-6 inline-block">
              <div className="bg-medical-green text-brutal-white px-4 py-2 font-mono text-sm font-bold">
                <span className="text-white-force">DIAGNOSTIC MODULES</span>
              </div>
            </div>
            <h2 className="medical-title text-5xl mb-6">AVAILABLE SCANS</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Activity,
                title: 'DERMATOLOGICAL SCAN',
                description: 'AI-powered skin analysis for early cancer detection',
                status: 'ACTIVE',
                color: 'medical-blue',
                accuracy: '99.2%'
              },
              {
                icon: Eye,
                title: 'OPHTHALMOLOGICAL SCAN',
                description: 'Comprehensive vision and eye health assessment',
                status: 'ACTIVE',
                color: 'medical-green',
                accuracy: '98.7%'
              }
            ].map((test, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="brutal-card p-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-16 h-16 bg-${test.color} border-4 border-brutal-black flex items-center justify-center`}>
                    <test.icon className="h-8 w-8 text-white-force" />
                  </div>
                  <div className="brutal-card p-2">
                    <div className="bg-medical-green text-brutal-white px-3 py-1 font-mono text-xs font-bold">
                      <span className="text-white-force">{test.status}</span>
                    </div>
                  </div>
                </div>
                
                <h3 className="medical-subtitle text-xl mb-4">{test.title}</h3>
                <p className="text-black-force font-medium mb-6">{test.description}</p>
                
                <div className="brutal-card p-4 bg-brutal-light-gray mb-6">
                  <div className="font-mono text-sm text-black-force mb-1">ACCURACY RATE</div>
                  <div className="medical-title text-2xl text-medical-green">{test.accuracy}</div>
                </div>
                
                <Link to="/login" className={`brutal-button brutal-button-primary w-full py-3 text-center block`}>
                  INITIATE SCAN
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brutal-black text-brutal-white py-12 border-t-4 border-brutal-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-medical-red border-4 border-brutal-white flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-white-force" />
              </div>
              <div>
                <div className="medical-title text-2xl text-white-force">SPC MEDICAL AI</div>
                <div className="font-mono text-xs text-white-force">v2.1.0 - OPERATIONAL</div>
              </div>
            </div>
            
            <div className="brutal-card p-6 mb-8 bg-brutal-white text-brutal-black max-w-2xl mx-auto">
              <p className="font-semibold">
                <span className="text-black-force">EMERGENCY MEDICAL AI SYSTEM - AUTHORIZED PERSONNEL ONLY</span>
              </p>
              <p className="text-sm text-black-force mt-2">
                This system is designed for medical professionals and authorized users only. 
                All diagnostic results must be verified by qualified healthcare providers.
              </p>
            </div>
            
            <div className="flex justify-center space-x-6">
              <Link to="/login" className="brutal-button brutal-button-primary px-6 py-3">
                SYSTEM ACCESS
              </Link>
              <Link to="/signup" className="brutal-button px-6 py-3">
                REGISTER
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;