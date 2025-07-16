import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, Eye, Heart, Brain, ArrowRight, Activity, Shield, Zap } from 'lucide-react';
import Navigation from '../components/Navigation';

const HomePage: React.FC = () => {
  const tests = [
    {
      id: 'skin',
      title: 'DERMATOLOGICAL SCAN',
      description: 'AI-powered skin analysis for early cancer detection and disease prevention',
      icon: Camera,
      color: 'medical-blue',
      path: '/skin-test',
      status: 'OPERATIONAL',
      accuracy: '99.2%',
      scanTime: '15 SEC'
    },
    {
      id: 'vision',
      title: 'OPHTHALMOLOGICAL SCAN',
      description: 'Comprehensive eye health assessment and visual acuity analysis',
      icon: Eye,
      color: 'medical-green',
      path: '/vision-test',
      status: 'OPERATIONAL',
      accuracy: '98.7%',
      scanTime: '3 MIN'
    },
    {
      id: 'heart',
      title: 'CARDIOVASCULAR SCAN',
      description: 'Heart rate variability and cardiovascular risk assessment protocol',
      icon: Heart,
      color: 'medical-red',
      path: '#',
      status: 'DEVELOPMENT',
      accuracy: '99.5%',
      scanTime: '2 MIN'
    },
    {
      id: 'mental',
      title: 'NEUROLOGICAL SCAN',
      description: 'Stress analysis and mental wellness evaluation system',
      icon: Brain,
      color: 'medical-purple',
      path: '#',
      status: 'DEVELOPMENT',
      accuracy: '97.8%',
      scanTime: '5 MIN'
    }
  ];

  return (
    <div className="min-h-screen bg-brutal-white">
      <div className="fixed inset-0 medical-grid pointer-events-none"></div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="brutal-card p-2 mb-6 inline-block">
            <div className="bg-medical-red text-white px-4 py-2 font-mono text-sm font-bold">
              DIAGNOSTIC MODULES
            </div>
          </div>
          <h1 className="medical-title text-6xl mb-4">
            MEDICAL SCANS
          </h1>
          <div className="brutal-card p-6 max-w-3xl mx-auto">
            <p className="text-xl font-semibold">
              Select from our comprehensive suite of AI-powered medical diagnostic tests. 
              Receive comprehensive results and personalized treatment protocols
            </p>
          </div>
        </motion.div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {tests.map((test, index) => {
            const Icon = test.icon;
            const isOperational = test.status === 'OPERATIONAL';
            
            return (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`brutal-card p-8 ${isOperational ? 'hover:scale-105 cursor-pointer' : 'opacity-75'} transition-all`}
              >
                {isOperational ? (
                  <Link to={test.path} className="block">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 bg-${test.color} border-4 border-brutal-black flex items-center justify-center`}>
                        <Icon className="h-8 w-8 text-brutal-white" />
                      </div>
                      <div className="brutal-card p-2">
                        <div className="bg-medical-green text-brutal-white px-3 py-1 font-mono text-xs font-bold">
                          <span className="text-white-force">{test.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="medical-subtitle text-2xl mb-4">{test.title}</h3>
                    <p className="text-black-force font-medium mb-6">{test.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="brutal-card p-3 bg-brutal-light-gray">
                        <div className="font-mono text-xs text-black-force">ACCURACY</div>
                        <div className="font-bold text-lg text-medical-green">{test.accuracy}</div>
                      </div>
                      <div className="brutal-card p-3 bg-brutal-light-gray">
                        <div className="font-mono text-xs text-black-force">SCAN TIME</div>
                        <div className="font-bold text-lg text-medical-blue">{test.scanTime}</div>
                      </div>
                    </div>
                    
                    <div className="brutal-card p-3 bg-medical-green text-brutal-white mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-xs text-white-force">STATUS</div>
                          <div className="font-bold text-sm text-white-force">READY FOR SCAN</div>
                        </div>
                        <div className="w-3 h-3 bg-brutal-white rounded-full status-online"></div>
                      </div>
                    </div>
                    
                    <div className="brutal-button brutal-button-primary w-full py-3 text-center">
                      INITIATE SCAN <ArrowRight className="ml-2 h-4 w-4 inline" />
                    </div>
                  </Link>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-16 h-16 bg-${test.color} border-4 border-brutal-black flex items-center justify-center opacity-50`}>
                        <Icon className="h-8 w-8 text-brutal-white" />
                      </div>
                      <div className="brutal-card p-2">
                        <div className="bg-medical-orange text-brutal-white px-3 py-1 font-mono text-xs font-bold">
                          <span className="text-white-force">{test.status}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="medical-subtitle text-2xl mb-4">{test.title}</h3>
                    <p className="text-black-force font-medium mb-6">{test.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="brutal-card p-3 bg-brutal-light-gray">
                        <div className="font-mono text-xs text-black-force">ACCURACY</div>
                        <div className="font-bold text-lg text-black-force">{test.accuracy}</div>
                      </div>
                      <div className="brutal-card p-3 bg-brutal-light-gray">
                        <div className="font-mono text-xs text-black-force">SCAN TIME</div>
                        <div className="font-bold text-lg text-black-force">{test.scanTime}</div>
                      </div>
                    </div>
                    
                    <div className="brutal-card p-3 bg-medical-orange text-brutal-white mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-mono text-xs text-white-force">STATUS</div>
                          <div className="font-bold text-sm text-white-force">IN DEVELOPMENT</div>
                        </div>
                        <div className="w-3 h-3 bg-brutal-white rounded-full status-warning"></div>
                      </div>
                    </div>
                    
                    <div className="brutal-button w-full py-3 text-center opacity-50 cursor-not-allowed">
                      COMING SOON
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* How SPC Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="brutal-card p-8"
        >
          <div className="text-center mb-8">
            <div className="brutal-card p-2 mb-4 inline-block">
              <div className="bg-medical-blue text-brutal-white px-4 py-2 font-mono text-sm font-bold">
                <span className="text-white-force">SYSTEM PROTOCOL</span>
              </div>
            </div>
            <h2 className="medical-title text-4xl mb-4">HOW SPC WORKS</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="brutal-card p-6 mb-4 bg-medical-blue text-brutal-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-brutal-white border-4 border-brutal-black flex items-center justify-center">
                  <span className="medical-title text-2xl text-medical-blue">1</span>
                </div>
                <Activity className="h-8 w-8 mx-auto mb-2 text-white-force" />
              </div>
              <h3 className="medical-subtitle text-xl mb-2">INITIATE SCAN</h3>
              <p className="text-brutal-black font-medium">
                <span className="text-black-force">Follow medical protocols to complete your diagnostic assessment</span>
              </p>
            </div>
            
            <div className="text-center">
              <div className="brutal-card p-6 mb-4 bg-medical-green text-brutal-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-brutal-white border-4 border-brutal-black flex items-center justify-center">
                  <span className="medical-title text-2xl text-medical-green">2</span>
                </div>
                <Brain className="h-8 w-8 mx-auto mb-2 text-white-force" />
              </div>
              <h3 className="medical-subtitle text-xl mb-2">AI ANALYSIS</h3>
              <p className="text-black-force font-medium">
                Advanced neural networks process your data with medical-grade accuracy
              </p>
            </div>
            
            <div className="text-center">
              <div className="brutal-card p-6 mb-4 bg-medical-purple text-brutal-white">
                <div className="w-16 h-16 mx-auto mb-4 bg-brutal-white border-4 border-brutal-black flex items-center justify-center">
                  <span className="medical-title text-2xl text-medical-purple">3</span>
                </div>
                <Shield className="h-8 w-8 mx-auto mb-2 text-white-force" />
              </div>
              <h3 className="medical-subtitle text-xl mb-2">MEDICAL REPORT</h3>
              <p className="text-black-force font-medium">
                Receive comprehensive results and personalized treatment protocols
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;