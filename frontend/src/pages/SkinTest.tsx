import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, CheckCircle, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { apiRequest } from '../config/api';
import toast from 'react-hot-toast';

const SkinTest: React.FC = () => {
  const [step, setStep] = useState(1);
  const [capturedImages, setCapturedImages] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();

  const handleStartCapture = async () => {
    try {
      // Simulate camera capture
      const mockImages = Array.from({ length: 7 }, (_, i) => `mock_image_${i + 1}.jpg`);
      setCapturedImages(mockImages);
      setStep(3);
      
      // Auto-analyze after capture
      setTimeout(() => {
        analyzeImages(mockImages);
      }, 1000);
    } catch (error) {
      toast.error('Failed to access camera');
    }
  };

  const analyzeImages = async (images: string[]) => {
    setAnalyzing(true);
    try {
      const response = await apiRequest('/scan/skin', {
        method: 'POST',
        body: JSON.stringify({ images }),
      });
      setResults(response.results);
      setStep(4);
    } catch (error) {
      toast.error('Analysis failed');
    } finally {
      setAnalyzing(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black-force mb-6">Skin Care Prevention Test</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-2 flex-shrink-0">
                    <Camera className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black-force">Camera Setup</h3>
                    <p className="text-black-force">Ensure you have good lighting and a stable surface</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2 flex-shrink-0">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black-force">Positioning</h3>
                    <p className="text-black-force">Hold your face/body part steady for 7 seconds</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-100 rounded-full p-2 flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black-force">Important</h3>
                    <p className="text-black-force">Keep the area clean and avoid makeup or filters</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-gray-50 rounded-lg p-6">
                <img
                  src="https://images.pexels.com/photos/5938391/pexels-photo-5938391.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Skin test illustration"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-black-force text-center">
                  Example: Position your face in the center of the frame
                </p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => navigate('/home')}
                  className="flex items-center px-4 py-2 text-black-force hover:text-black-force"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </button>
                <button
                  onClick={() => setStep(2)}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold text-black-force mb-6">Camera Capture</h2>
              
              <div className="bg-gray-900 rounded-lg p-8 mb-6">
                <div className="w-64 h-64 bg-gray-700 rounded-lg mx-auto flex items-center justify-center">
                  <Camera className="h-16 w-16 text-gray-400" />
                </div>
                <p className="text-white mt-4">Camera will activate automatically</p>
              </div>
              
              <p className="text-black-force mb-8">
                We'll capture 7 frames automatically. Hold your position steady.
              </p>
              
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center px-4 py-2 text-black-force hover:text-black-force"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={handleStartCapture}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Start Capture
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-black-force mb-4">Analyzing Your Skin</h2>
              <p className="text-black-force">
                Our AI is analyzing your skin images for potential issues...
              </p>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black-force mb-6">Skin Analysis Results</h2>
              
              {results && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="font-medium text-black-force">Risk Level</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      results.riskLevel === 'low' ? 'bg-green-100 text-green-800' :
                      results.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {results.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-black-force mb-2">Confidence Score</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${results.confidence}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-black-force mt-1">{results.confidence}% confidence</p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-black-force mb-4">Personalized Recommendations</h3>
                    <div className="space-y-3">
                      {results.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                          <span className="text-black-force">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => navigate('/home')}
                  className="flex items-center px-4 py-2 text-black-force hover:text-black-force"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-black-force">Step {step} of 4</span>
            <span className="text-sm font-medium text-black-force">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default SkinTest;