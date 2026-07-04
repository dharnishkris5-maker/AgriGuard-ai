export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Farmer' | 'Agricultural Officer';
  phone?: string;
  location?: string;
  organization?: string;
  createdAt: string;
}

export interface PredictionInput {
  soilType: string;
  soilMoisture: number; // percentage
  nitrogen: number; // ppm
  phosphorus: number; // ppm
  potassium: number; // ppm
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm
  phValue: number; // 0-14
  location: string;
}

export interface PredictionResult {
  bestCrop: string;
  confidence: number; // 0-100
  suitableFertilizers: string[];
  irrigationRecommendation: string;
  diseasePrevention: string[];
  seasonalAdvice: string;
  weatherAwareness: string;
  farmingTips: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
  explanation: string;
}

export interface PredictionHistory {
  id: string;
  userId: string;
  userName: string;
  input: PredictionInput;
  result: PredictionResult;
  timestamp: string;
}

export interface WeatherInfo {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: 'Sunny' | 'Rainy' | 'Cloudy' | 'Stormy' | 'Windy';
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
  }>;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  userId?: string; // If undefined, broadcasting to all
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  timestamp: string;
}

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  predictionId?: string;
  timestamp: string;
}

export interface AppState {
  currentUser: User | null;
  token: string | null;
}
