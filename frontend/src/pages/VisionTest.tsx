import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { apiRequest } from '../config/api';
import toast from 'react-hot-toast';

const VisionTest: React.FC = () => {
  const [step, setStep] = useState(1);
  const [questionnaire, setQuestionnaire] = useState({
    eyeStrain: '',
    screenTime: 0,
    difficulty: '',
  });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [colorBlindTest, setColorBlindTest] = useState({
    answers: [] as string[],
    correctAnswers: 0,
  });
  const [results, setResults] = useState<any>(null);
  const navigate = useNavigate();

  const questionnaireQuestions = [
    {
      question: "How often do you feel eye strain?",
      options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
      key: "eyeStrain"
    },
    {
      question: "How many hours do you spend on screens daily?",
      options: ["Less than 2", "2-4", "4-6", "6-8", "More than 8"],
      key: "screenTime"
    },
    {
      question: "Do you have difficulty seeing far or near objects?",
      options: ["No difficulty", "Slight difficulty", "Moderate difficulty", "Significant difficulty", "Severe difficulty"],
      key: "difficulty"
    }
  ];

  const colorBlindQuestions = [
    { number: "12", correct: "12" },
    { number: "8", correct: "8" },
    { number: "29", correct: "29" },
    { number: "5", correct: "5" },
    { number: "3", correct: "3" },
    { number: "15", correct: "15" },
    { number: "74", correct: "74" },
    { number: "2", correct: "2" },
  ];

  const handleQuestionnaireAnswer = (answer: string) => {
    const currentQ = questionnaireQuestions[currentQuestion];
    setQuestionnaire(prev => ({
      ...prev,
      [currentQ.key]: answer
    }));

    if (currentQuestion < questionnaireQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep(2);
    }
  };

  const handleColorBlindAnswer = (answer: string) => {
    const correct = colorBlindQuestions[colorBlindTest.answers.length];
    const newAnswers = [...colorBlindTest.answers, answer];
    const correctCount = colorBlindTest.correctAnswers + (answer === correct.correct ? 1 : 0);

    setColorBlindTest({
      answers: newAnswers,
      correctAnswers: correctCount
    });

    if (newAnswers.length < colorBlindQuestions.length) {
      // Continue to next question
    } else {
      setStep(3);
      analyzeResults(correctCount);
    }
  };

  const analyzeResults = async (correctAnswers: number) => {
    try {
      const response = await apiRequest('/scan/vision', {
        method: 'POST',
        body: JSON.stringify({
          questionnaire,
          colorBlindTest: { correctAnswers }
        }),
      });
      setResults(response.results);
      setStep(4);
    } catch (error) {
      toast.error('Analysis failed');
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
              <h2 className="text-2xl font-bold text-black-force mb-6">Vision Health Questionnaire</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-black-force">Question {currentQuestion + 1} of {questionnaireQuestions.length}</span>
                  <span className="text-sm font-medium text-black-force">{Math.round(((currentQuestion + 1) / questionnaireQuestions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((currentQuestion + 1) / questionnaireQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-black-force mb-4">
                  {questionnaireQuestions[currentQuestion].question}
                </h3>
                <div className="space-y-3">
                  {questionnaireQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionnaireAnswer(option)}
                      className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-black-force"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => navigate('/home')}
                  className="flex items-center px-4 py-2 text-black-force hover:text-black-force"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
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
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black-force mb-6">Color Blindness Test</h2>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-black-force">
                    Question {colorBlindTest.answers.length + 1} of {colorBlindQuestions.length}
                  </span>
                  <span className="text-sm font-medium text-black-force">
                    {Math.round(((colorBlindTest.answers.length + 1) / colorBlindQuestions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${((colorBlindTest.answers.length + 1) / colorBlindQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-black-force mb-4">
                  What number do you see?
                </h3>
                
                {/* Mock Ishihara plate */}
                <div className="w-64 h-64 bg-gradient-to-br from-red-300 to-green-300 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-gray-300">
                  <span className="text-6xl font-bold text-gray-700">
                    {colorBlindQuestions[colorBlindTest.answers.length].number}
                  </span>
                </div>
                
                <p className="text-black-force mb-4">
                  Look at the circle above and enter the number you see
                </p>
                
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '12', '29', '74'].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleColorBlindAnswer(num)}
                      className="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-black-force"
                    >
                      {num}
                    </button>
                  ))}
                </div>
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
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-black-force mb-4">Analyzing Your Vision</h2>
              <p className="text-black-force">
                Our AI is analyzing your responses to assess your vision health...
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
              <h2 className="text-2xl font-bold text-black-force mb-6">Vision Test Results</h2>
              
              {results && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-black-force mb-2">Eye Strain Level</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        results.eyeStrainLevel === 'low' ? 'bg-green-100 text-green-800' :
                        results.eyeStrainLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {results.eyeStrainLevel.toUpperCase()}
                      </span>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-black-force mb-2">Color Vision</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        results.colorBlindnessRisk === 'low' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {results.colorBlindnessRisk === 'low' ? 'NORMAL' : 'RISK DETECTED'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-black-force mb-2">Score</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${colorBlindTest.correctAnswers * 12.5}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-black-force mt-1">
                      {colorBlindTest.correctAnswers} out of {colorBlindQuestions.length} correct
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-black-force mb-4">Personalized Recommendations</h3>
                    <div className="space-y-3">
                      {results.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
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
                  className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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
              className="bg-green-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default VisionTest;