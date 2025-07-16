// Mock API responses for demo mode
const mockResponses = {
  '/auth/login': (data: any) => ({
    message: 'Login successful',
    token: 'demo_token_' + Date.now(),
    user: {
      id: Math.floor(Math.random() * 1000) + 1,
      username: data.email?.split('@')[0] || 'Demo User',
      email: data.email || 'demo@example.com'
    }
  }),
  '/auth/signup': (data: any) => ({
    message: 'User created successfully',
    token: 'demo_token_' + Date.now(),
    user: {
      id: Math.floor(Math.random() * 1000) + 1,
      username: data.username || 'Demo User',
      email: data.email || 'demo@example.com'
    }
  }),
  '/health/dashboard': () => ({
    healthData: generateMockHealthData(),
    testResults: generateMockTestResults(),
    recommendations: generateMockRecommendations()
  }),
  '/health/generate-mock': () => ({
    message: 'Mock data generated successfully'
  }),
  '/scan/skin': () => ({
    message: 'Skin analysis completed',
    results: {
      riskLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      conditions: ['acne', 'dryness', 'pigmentation'],
      confidence: Math.floor(Math.random() * 20) + 80,
      recommendations: [
        'Use a gentle cleanser twice daily',
        'Apply sunscreen with SPF 30+',
        'Stay hydrated - drink 3L water daily',
        'Get adequate sleep (7-8 hours)',
        'Avoid touching your face frequently'
      ]
    }
  }),
  '/scan/vision': (data: any) => ({
    message: 'Vision analysis completed',
    results: {
      eyeStrainLevel: data.questionnaire?.eyeStrain || 'moderate',
      colorBlindnessRisk: (data.colorBlindTest?.correctAnswers || 0) < 6 ? 'high' : 'low',
      screenTimeImpact: (data.questionnaire?.screenTime || 0) > 8 ? 'high' : 'moderate',
      recommendations: [
        'Follow 20-20-20 rule for screen time',
        'Take regular breaks every hour',
        'Ensure proper lighting while reading',
        'Blink more frequently during screen use',
        'Consider blue light filtering glasses'
      ]
    }
  })
};

function generateMockHealthData() {
  const data = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      steps: Math.floor(Math.random() * 5000) + 5000,
      calories: Math.floor(Math.random() * 500) + 1800,
      sleep_hours: Math.random() * 2 + 6,
      heart_rate: Math.floor(Math.random() * 30) + 60,
      stress_level: Math.floor(Math.random() * 5) + 1
    });
  }
  return data;
}

function generateMockTestResults() {
  return [
    {
      id: 1,
      test_type: 'skin',
      results: JSON.stringify({
        riskLevel: 'low',
        confidence: 85,
        conditions: ['healthy']
      }),
      score: 85,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      test_type: 'vision',
      results: JSON.stringify({
        eyeStrainLevel: 'low',
        colorBlindnessRisk: 'low'
      }),
      score: 90,
      created_at: new Date().toISOString()
    }
  ];
}

function generateMockRecommendations() {
  return [
    {
      id: 1,
      category: 'skin',
      recommendation: 'Use sunscreen daily with SPF 30+',
      is_completed: false,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      category: 'vision',
      recommendation: 'Take breaks every 20 minutes when using screens',
      is_completed: false,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      category: 'general',
      recommendation: 'Drink at least 8 glasses of water daily',
      is_completed: false,
      created_at: new Date().toISOString()
    }
  ];
}

export const API_BASE_URL = 'http://localhost:5000/api';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  // Always use mock responses for demo
  const mockKey = endpoint as keyof typeof mockResponses;
  
  if (mockResponses[mockKey]) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    let requestData = {};
    if (options.body) {
      try {
        requestData = JSON.parse(options.body as string);
      } catch (e) {
        // Handle non-JSON body
      }
    }
    
    const mockResponse = mockResponses[mockKey];
    return typeof mockResponse === 'function' ? mockResponse(requestData) : mockResponse;
  }
  
  // Fallback for unknown endpoints
  throw new Error('API endpoint not found in demo mode');
};