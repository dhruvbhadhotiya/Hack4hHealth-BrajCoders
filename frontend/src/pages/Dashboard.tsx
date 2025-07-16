import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Activity, Heart, Clock, Footprints, Flame, Brain, Stethoscope, AlertTriangle, TrendingUp, Shield, Zap, Thermometer, Droplets, Wifi, Database, Cpu } from 'lucide-react';
import Navigation from '../components/Navigation';
import { apiRequest } from '../config/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface HealthData {
  date: string;
  steps: number;
  calories: number;
  sleep_hours: number;
  heart_rate: number;
  stress_level: number;
}

interface DashboardData {
  healthData: HealthData[];
  testResults: any[];
  recommendations: any[];
}

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [realTimeData, setRealTimeData] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    temperature: 98.6,
    oxygenSat: 98,
    respiratoryRate: 16,
    glucoseLevel: 95,
    hydrationLevel: 85,
    stressIndex: 3.2,
    ecgWaveform: [] as number[],
    brainActivity: [] as number[],
    bloodFlow: 85
  });
  const [realtimeChartData, setRealtimeChartData] = useState<any[]>([]);
  const [ecgData, setEcgData] = useState<any[]>([]);
  const [brainWaveData, setBrainWaveData] = useState<any[]>([]);
  const [networkData, setNetworkData] = useState({
    bandwidth: 847,
    latency: 12,
    uptime: 99.97,
    activeConnections: 2847
  });
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
    
    // Initialize real-time chart data
    const initialData = Array.from({ length: 20 }, (_, i) => ({
      time: new Date(Date.now() - (19 - i) * 1000).toLocaleTimeString(),
      heartRate: 72 + Math.sin(i * 0.5) * 8 + Math.random() * 4,
      bloodPressure: 120 + Math.sin(i * 0.3) * 10 + Math.random() * 5,
      temperature: 98.6 + Math.sin(i * 0.2) * 0.5 + Math.random() * 0.2
    }));
    setRealtimeChartData(initialData);
    
    // Initialize ECG data
    const initialEcgData = Array.from({ length: 50 }, (_, i) => ({
      time: i,
      value: Math.sin(i * 0.3) * 50 + Math.sin(i * 0.8) * 20 + Math.random() * 10
    }));
    setEcgData(initialEcgData);
    
    // Initialize brain wave data
    const initialBrainData = Array.from({ length: 30 }, (_, i) => ({
      time: i,
      alpha: Math.sin(i * 0.2) * 30 + 50,
      beta: Math.sin(i * 0.4) * 25 + 40,
      theta: Math.sin(i * 0.1) * 20 + 30
    }));
    setBrainWaveData(initialBrainData);
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        heartRate: Math.max(60, Math.min(100, prev.heartRate + (Math.random() - 0.5) * 4)),
        bloodPressure: `${120 + Math.floor((Math.random() - 0.5) * 10)}/${80 + Math.floor((Math.random() - 0.5) * 6)}`,
        temperature: Math.max(97, Math.min(100, 98.6 + (Math.random() - 0.5) * 0.8)),
        oxygenSat: Math.max(95, Math.min(100, 98 + Math.floor((Math.random() - 0.5) * 4))),
        respiratoryRate: Math.max(12, Math.min(20, 16 + Math.floor((Math.random() - 0.5) * 4))),
        glucoseLevel: Math.max(80, Math.min(120, 95 + Math.floor((Math.random() - 0.5) * 20))),
        hydrationLevel: Math.max(70, Math.min(100, 85 + Math.floor((Math.random() - 0.5) * 20))),
        stressIndex: Math.max(1, Math.min(5, 3.2 + (Math.random() - 0.5) * 1)),
        ecgWaveform: Array.from({ length: 10 }, () => Math.random() * 100),
        brainActivity: Array.from({ length: 5 }, () => Math.random() * 80 + 20),
        bloodFlow: Math.max(70, Math.min(100, 85 + Math.floor((Math.random() - 0.5) * 10)))
      }));

      // Update real-time chart
      setRealtimeChartData(prev => {
        const newData = [...prev.slice(1), {
          time: new Date().toLocaleTimeString(),
          heartRate: 72 + Math.sin(Date.now() * 0.001) * 8 + Math.random() * 4,
          bloodPressure: 120 + Math.sin(Date.now() * 0.0008) * 10 + Math.random() * 5,
          temperature: 98.6 + Math.sin(Date.now() * 0.0005) * 0.5 + Math.random() * 0.2
        }];
        return newData;
      });

      // Update ECG data
      setEcgData(prev => {
        const newEcg = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          value: Math.sin(Date.now() * 0.01) * 50 + Math.sin(Date.now() * 0.03) * 20 + Math.random() * 10
        }];
        return newEcg;
      });
      
      // Update brain wave data
      setBrainWaveData(prev => {
        const newBrain = [...prev.slice(1), {
          time: prev[prev.length - 1].time + 1,
          alpha: Math.sin(Date.now() * 0.002) * 30 + 50 + Math.random() * 5,
          beta: Math.sin(Date.now() * 0.004) * 25 + 40 + Math.random() * 5,
          theta: Math.sin(Date.now() * 0.001) * 20 + 30 + Math.random() * 5
        }];
        return newBrain;
      });

      // Update network data
      setNetworkData(prev => ({
        bandwidth: Math.max(500, Math.min(1200, prev.bandwidth + (Math.random() - 0.5) * 100)),
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() - 0.5) * 5)),
        uptime: Math.max(99.5, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.01)),
        activeConnections: Math.max(2000, Math.min(3500, prev.activeConnections + Math.floor((Math.random() - 0.5) * 100)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await apiRequest('/health/dashboard');
      setDashboardData(data);
    } catch (error) {
      toast.error('FAILED TO LOAD MEDICAL DATA', {
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
    }
  };

  const generateMockData = async () => {
    try {
      await apiRequest('/health/generate-mock', { method: 'POST' });
      toast.success('MEDICAL DATA GENERATED SUCCESSFULLY', {
        style: {
          background: '#34C759',
          color: '#FFFFFF',
          fontFamily: 'JetBrains Mono',
          fontWeight: 'bold',
          border: '4px solid #000000'
        }
      });
      fetchDashboardData();
    } catch (error) {
      toast.error('DATA GENERATION FAILED');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brutal-white">
        <div className="fixed inset-0 medical-grid pointer-events-none"></div>
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="brutal-card p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-medical-blue border-4 border-brutal-black flex items-center justify-center">
              <Stethoscope className="h-8 w-8 text-brutal-white medical-pulse" />
            </div>
            <div className="font-mono text-sm font-bold mb-2 text-black">LOADING MEDICAL DATA</div>
            <div className="w-48 h-2 bg-brutal-light-gray border-2 border-brutal-black mx-auto">
              <div className="h-full bg-medical-blue data-stream"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const healthData = dashboardData?.healthData || [];
  const recommendations = dashboardData?.recommendations || [];
  const latestHealth = healthData[0] || {
    steps: 0,
    calories: 0,
    sleep_hours: 0,
    heart_rate: 0,
    stress_level: 0
  };

  const healthGrade = Math.min(100, Math.floor((latestHealth.steps / 100) + (latestHealth.sleep_hours * 10) + (100 - latestHealth.stress_level * 10)));

  return (
    <div className="min-h-screen bg-brutal-white">
      <div className="fixed inset-0 medical-grid pointer-events-none"></div>
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="medical-title text-4xl mb-2 text-black-force">MEDICAL DASHBOARD</h1>
            <p className="font-mono text-sm text-black-force">PATIENT: {user?.username?.toUpperCase()}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="brutal-card p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-medical-green rounded-full status-online"></div>
                <div>
                  <div className="font-mono text-xs text-white">LATENCY</div>
                  <div className="font-bold text-white">{networkData.latency.toFixed(0)}ms</div>
                </div>
              </div>
            </div>
            <button
              onClick={generateMockData}
              className="brutal-button brutal-button-primary px-6 py-3"
            >
              GENERATE DATA
            </button>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="brutal-card p-4 mb-8 bg-brutal-black text-white">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Wifi className="h-5 w-5 text-medical-green" />
              <div>
                <div className="font-mono text-xs text-white">NETWORK</div>
                <div className="font-bold text-white">{networkData.bandwidth.toFixed(0)} Mbps</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-medical-blue" />
              <div>
                <div className="font-mono text-xs text-white">LATENCY</div>
                <div className="font-bold text-white">{networkData.latency.toFixed(0)}ms</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-medical-green" />
              <div>
                <div className="font-mono text-xs text-white">UPTIME</div>
                <div className="font-bold text-white">{networkData.uptime.toFixed(2)}%</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Cpu className="h-5 w-5 text-medical-orange" />
              <div>
                <div className="font-mono text-xs text-white">CONNECTIONS</div>
                <div className="font-bold text-white">{networkData.activeConnections.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Real-time Vitals */}
        <div className="brutal-card p-6 mb-8 bg-brutal-black text-brutal-white">
          <div className="flex items-center justify-between mb-4">
            <div className="medical-subtitle text-white">REAL-TIME VITALS</div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-medical-red rounded-full status-critical"></div>
              <span className="font-mono text-xs font-bold text-white">LIVE MONITORING</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="brutal-card p-4 bg-medical-red text-brutal-white">
              <Heart className="h-6 w-6 mb-2 heartbeat text-white" />
              <div className="font-mono text-xs text-white">HEART RATE</div>
              <div className="medical-title text-2xl text-white">{Math.round(realTimeData.heartRate)}</div>
              <div className="font-mono text-xs text-white">BPM</div>
            </div>
            
            <div className="brutal-card p-4 bg-medical-blue text-brutal-white">
              <Activity className="h-6 w-6 mb-2 vital-sign text-white" />
              <div className="font-mono text-xs text-white">BLOOD PRESSURE</div>
              <div className="medical-title text-xl text-white">{realTimeData.bloodPressure}</div>
              <div className="font-mono text-xs text-white">mmHg</div>
            </div>
            
            <div className="brutal-card p-4 bg-medical-orange text-brutal-white">
              <Flame className="h-6 w-6 mb-2 medical-pulse text-white" />
              <div className="font-mono text-xs text-white">TEMPERATURE</div>
              <div className="medical-title text-xl text-white">{realTimeData.temperature.toFixed(1)}°F</div>
              <div className="font-mono text-xs text-white">FAHRENHEIT</div>
            </div>
            
            <div className="brutal-card p-4 bg-medical-green text-brutal-white">
              <Shield className="h-6 w-6 mb-2 text-white" />
              <div className="font-mono text-xs text-white">OXYGEN SAT</div>
              <div className="medical-title text-2xl text-white">{realTimeData.oxygenSat}%</div>
              <div className="font-mono text-xs text-white">SpO2</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="brutal-card p-4 bg-medical-purple text-brutal-white">
              <Activity className="h-6 w-6 mb-2 vital-sign text-white" />
              <div className="font-mono text-xs text-white">RESPIRATORY</div>
              <div className="medical-title text-xl text-white">{Math.round(realTimeData.respiratoryRate)}</div>
              <div className="font-mono text-xs text-white">BPM</div>
            </div>
            
            <div className="brutal-card p-4 bg-medical-yellow">
              <Zap className="h-6 w-6 mb-2 medical-pulse text-black" />
              <div className="font-mono text-xs text-black">GLUCOSE</div>
              <div className="medical-title text-xl text-black">{Math.round(realTimeData.glucoseLevel)}</div>
              <div className="font-mono text-xs text-black">mg/dL</div>
            </div>
            
            <div className="brutal-card p-4 bg-medical-teal text-brutal-white">
              <Droplets className="h-6 w-6 mb-2 text-white" />
              <div className="font-mono text-xs text-white">HYDRATION</div>
              <div className="medical-title text-xl text-white">{Math.round(realTimeData.hydrationLevel)}%</div>
              <div className="font-mono text-xs text-white">LEVEL</div>
            </div>
            
            <div className="brutal-card p-4 bg-medical-pink text-brutal-white">
              <Brain className="h-6 w-6 mb-2 heartbeat text-white" />
              <div className="font-mono text-xs text-white">STRESS INDEX</div>
              <div className="medical-title text-xl text-white">{realTimeData.stressIndex.toFixed(1)}</div>
              <div className="font-mono text-xs text-white">SCALE 1-5</div>
            </div>
          </div>
        </div>

        {/* Advanced Medical Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* ECG Monitor */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="brutal-card p-6 bg-brutal-black text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="medical-subtitle text-white">ECG MONITOR</div>
              <div className="w-2 h-2 bg-medical-red rounded-full status-critical"></div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={ecgData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#FF3B30" 
                  strokeWidth={2} 
                  dot={false}
                  animationDuration={100}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 text-center">
              <div className="font-mono text-xs text-white">RHYTHM: NORMAL SINUS</div>
            </div>
          </motion.div>

          {/* Brain Wave Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="brutal-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="medical-subtitle text-black">BRAIN WAVES</div>
              <div className="w-2 h-2 bg-medical-purple rounded-full status-online"></div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={brainWaveData}>
                <Line type="monotone" dataKey="alpha" stroke="#AF52DE" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="beta" stroke="#007AFF" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="theta" stroke="#34C759" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
              <div className="text-center">
                <div className="w-2 h-2 bg-medical-purple rounded-full mx-auto mb-1"></div>
                <div className="font-mono text-black">ALPHA</div>
              </div>
              <div className="text-center">
                <div className="w-2 h-2 bg-medical-blue rounded-full mx-auto mb-1"></div>
                <div className="font-mono text-black">BETA</div>
              </div>
              <div className="text-center">
                <div className="w-2 h-2 bg-medical-green rounded-full mx-auto mb-1"></div>
                <div className="font-mono text-black">THETA</div>
              </div>
            </div>
          </motion.div>

          {/* Blood Flow Monitor */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="brutal-card p-6 bg-medical-teal text-white"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="medical-subtitle text-white">BLOOD FLOW</div>
              <div className="w-2 h-2 bg-white rounded-full status-online"></div>
            </div>
            <div className="text-center mb-4">
              <div className="medical-title text-4xl text-white">{realTimeData.bloodFlow}%</div>
              <div className="font-mono text-xs text-white">CIRCULATION RATE</div>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-4">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-1000 pulse-data"
                style={{ width: `${realTimeData.bloodFlow}%` }}
              ></div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-mono text-white">SYSTOLIC</div>
                <div className="font-bold text-white">120 mmHg</div>
              </div>
              <div>
                <div className="font-mono text-white">DIASTOLIC</div>
                <div className="font-bold text-white">80 mmHg</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Real-time Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="brutal-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="medical-subtitle text-black">LIVE HEART RATE</div>
              <div className="brutal-card p-2 bg-medical-red">
                <div className="font-mono text-xs font-bold text-white">REAL-TIME</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={realtimeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                <XAxis dataKey="time" stroke="#000000" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis stroke="#000000" fontSize={10} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF', 
                    border: '4px solid #000000',
                    fontFamily: 'JetBrains Mono',
                    fontWeight: 'bold',
                    color: '#000000'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="heartRate" 
                  stroke="#FF3B30" 
                  strokeWidth={3} 
                  dot={false}
                  strokeDasharray="5,5"
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="brutal-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="medical-subtitle text-black">TEMPERATURE TREND</div>
              <div className="brutal-card p-2 bg-medical-orange">
                <div className="font-mono text-xs font-bold text-white">LIVE</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={realtimeChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                <XAxis dataKey="time" stroke="#000000" fontSize={10} fontFamily="JetBrains Mono" />
                <YAxis stroke="#000000" fontSize={10} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF', 
                    border: '4px solid #000000',
                    fontFamily: 'JetBrains Mono',
                    fontWeight: 'bold',
                    color: '#000000'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="#FF9500" 
                  fill="#FF9500" 
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {[
            { icon: Footprints, label: 'STEPS', value: latestHealth.steps?.toLocaleString() || '0', color: 'medical-blue', unit: 'TODAY' },
            { icon: Flame, label: 'CALORIES', value: latestHealth.calories || 0, color: 'medical-orange', unit: 'BURNED' },
            { icon: Clock, label: 'SLEEP', value: latestHealth.sleep_hours?.toFixed(1) || '0.0', color: 'medical-purple', unit: 'HOURS' },
            { icon: Heart, label: 'AVG HR', value: latestHealth.heart_rate || 0, color: 'medical-red', unit: 'BPM' },
            { icon: Brain, label: 'STRESS', value: `${latestHealth.stress_level || 0}/5`, color: 'medical-teal', unit: 'LEVEL' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="brutal-card p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 bg-${metric.color} border-4 border-brutal-black flex items-center justify-center`}>
                  <metric.icon className="h-6 w-6 text-white-force" />
                </div>
                <TrendingUp className="h-4 w-4 text-medical-green" />
              </div>
              <div className="font-mono text-xs text-black-force mb-1">{metric.label}</div>
              <div className="medical-title text-2xl text-black-force mb-1">{metric.value}</div>
              <div className="font-mono text-xs text-black-force">{metric.unit}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="brutal-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="medical-subtitle text-black-force">ACTIVITY TREND</div>
              <div className="brutal-card p-2 bg-medical-blue text-brutal-white">
                <div className="font-mono text-xs font-bold text-white-force">7 DAYS</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={healthData} className="medical-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                <XAxis dataKey="date" stroke="#000000" fontSize={12} fontFamily="JetBrains Mono" />
                <YAxis stroke="#000000" fontSize={12} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF', 
                    border: '4px solid #000000',
                    fontFamily: 'JetBrains Mono',
                    fontWeight: 'bold',
                    color: '#000000'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#007AFF" 
                  strokeWidth={4} 
                  dot={{ fill: '#007AFF', strokeWidth: 4, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="brutal-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="medical-subtitle text-black-force">SLEEP PATTERN</div>
              <div className="brutal-card p-2 bg-medical-purple text-brutal-white">
                <div className="font-mono text-xs font-bold text-white-force">WEEKLY</div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={healthData} className="medical-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#000000" />
                <XAxis dataKey="date" stroke="#000000" fontSize={12} fontFamily="JetBrains Mono" />
                <YAxis stroke="#000000" fontSize={12} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ 
                    background: '#FFFFFF', 
                    border: '4px solid #000000',
                    fontFamily: 'JetBrains Mono',
                    fontWeight: 'bold',
                    color: '#000000'
                  }} 
                />
                <Bar dataKey="sleep_hours" fill="#AF52DE" stroke="#000000" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Medical Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="brutal-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="medical-subtitle text-black">MEDICAL RECOMMENDATIONS</div>
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-medical-orange" />
              <span className="font-mono text-xs font-bold text-black">PRIORITY</span>
            </div>
          </div>
          
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              {recommendations.slice(0, 3).map((rec, index) => (
                <div key={index} className="brutal-card p-4 bg-brutal-light-gray">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 bg-medical-${index === 0 ? 'red' : index === 1 ? 'orange' : 'green'} border-2 border-brutal-black flex items-center justify-center`}>
                      <span className="font-mono text-xs font-bold text-white">!</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-mono text-xs font-bold text-black mb-1">
                        {rec.category?.toUpperCase() || 'GENERAL'} RECOMMENDATION
                      </div>
                      <div className="text-black font-medium">{rec.recommendation}</div>
                    </div>
                    <div className="brutal-card p-2 bg-medical-blue text-brutal-white">
                      <div className="font-mono text-xs font-bold text-white">ACTION</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-brutal-light-gray border-4 border-brutal-black mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-black" />
              </div>
              <div className="font-mono text-sm font-bold text-black mb-2">NO RECOMMENDATIONS</div>
              <p className="text-black">Complete medical scans to receive personalized recommendations</p>
            </div>
          )}
          
          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t-4 border-brutal-black">
            <div className="medical-subtitle text-black mb-4">QUICK ACTIONS</div>
            <div className="grid grid-cols-2 gap-4">
              <button className="brutal-button brutal-button-primary p-3 text-sm">
                SCHEDULE SCAN
              </button>
              <button className="brutal-button p-3 text-sm">
                EXPORT DATA
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;