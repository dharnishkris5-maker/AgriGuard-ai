import * as fs from 'fs';
import * as path from 'path';
import { User, PredictionHistory, Notification, ActivityLog, Feedback } from '../types/index.js';

const DB_FILE_PATH = path.join(process.cwd(), 'db-data.json');

interface DbSchema {
  users: User[];
  predictions: PredictionHistory[];
  notifications: Notification[];
  activityLogs: ActivityLog[];
  feedbacks: Feedback[];
}

const DEFAULT_USERS: User[] = [
  {
    id: 'u-1',
    email: 'farmer@agriguard.ai',
    name: 'Robert Jenkins',
    role: 'Farmer',
    phone: '+91 98765 43210',
    location: 'Punjab, India',
    organization: 'Jenkins Family Farms',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'u-2',
    email: 'officer@agriguard.ai',
    name: 'Dr. Sarah Patel',
    role: 'Agricultural Officer',
    phone: '+1 (555) 014-9988',
    location: 'Midwest Agri-Extension',
    organization: 'Department of Agriculture',
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'u-3',
    email: 'admin@agriguard.ai',
    name: 'Elena Rostova',
    role: 'Admin',
    phone: '+1 (555) 011-2233',
    location: 'AgriGuard Tech Hub',
    organization: 'AgriGuard Core Team',
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_PREDICTIONS: PredictionHistory[] = [
  {
    id: 'p-1',
    userId: 'u-1',
    userName: 'Robert Jenkins',
    input: {
      soilType: 'Loamy',
      soilMoisture: 38,
      nitrogen: 85,
      phosphorus: 42,
      potassium: 35,
      temperature: 24.5,
      humidity: 62,
      rainfall: 120,
      phValue: 6.2,
      location: 'Punjab, India'
    },
    result: {
      bestCrop: 'Maize (Corn)',
      confidence: 94.2,
      suitableFertilizers: ['Urea (46-0-0)', 'Diammonium Phosphate (DAP)', 'Muriate of Potash (MOP)'],
      irrigationRecommendation: 'Moderate watering. Keep soil moisture at 35-45%. Apply sprinkler irrigation every 5-7 days.',
      diseasePrevention: [
        'Apply seed treatment to protect against corn smut.',
        'Ensure crop rotation with legumes to break pest lifecycles.',
        'Monitor for signs of grey leaf spot and apply fungicides if humidity rises.'
      ],
      seasonalAdvice: 'Perfect timing for mid-season side-dressing of Nitrogen. Avoid soil compaction during early vegetative stages.',
      weatherAwareness: 'Expected rainfall is optimal, but watch out for upcoming late-week heavy storms.',
      farmingTips: [
        'Adopt conservation tillage to preserve soil structure and retain organic matter.',
        'Utilize visual pest traps in high-density areas.'
      ],
      riskLevel: 'Low',
      explanation: 'The combination of fertile loamy soil, moderate temperature, and generous Nitrogen content creates an absolutely prime environment for Maize. Soil moisture levels are in the sweet spot for rapid vegetative development.'
    },
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p-2',
    userId: 'u-1',
    userName: 'Robert Jenkins',
    input: {
      soilType: 'Clayey',
      soilMoisture: 55,
      nitrogen: 45,
      phosphorus: 65,
      potassium: 55,
      temperature: 29.0,
      humidity: 78,
      rainfall: 220,
      phValue: 5.8,
      location: 'Punjab, India'
    },
    result: {
      bestCrop: 'Rice (Paddy)',
      confidence: 89.7,
      suitableFertilizers: ['Ammonium Sulfate', 'Single Superphosphate (SSP)', 'Potassium Chloride'],
      irrigationRecommendation: 'High water requirement. Maintain 5-10cm standing water in the field. Drain field 10 days before harvest.',
      diseasePrevention: [
        'Dip seedlings in Pseudomonas fluorescens solution before transplanting.',
        'Keep bunds clean to prevent rodent infestations.',
        'Monitor closely for Rice Blast during early tillering.'
      ],
      seasonalAdvice: 'Prepare transplanting beds with heavy organic compost. Clay soil is ideal for water retention.',
      weatherAwareness: 'Sustained monsoon rains are beneficial, ensure proper drainage outflows are clear to prevent flash flooding.',
      farmingTips: [
        'Practice mechanical weeding to stimulate tillering and aeration.',
        'Maintain level leveling to ensure uniform water depth.'
      ],
      riskLevel: 'Medium',
      explanation: 'High rainfall, elevated humidity, and clayey soil which holds water exceptionally well are standard ideal parameters for Paddy. High moisture makes it unsuitable for root crops.'
    },
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p-3',
    userId: 'u-1',
    userName: 'Robert Jenkins',
    input: {
      soilType: 'Sandy',
      soilMoisture: 15,
      nitrogen: 20,
      phosphorus: 15,
      potassium: 40,
      temperature: 32.1,
      humidity: 45,
      rainfall: 45,
      phValue: 7.4,
      location: 'Punjab, India'
    },
    result: {
      bestCrop: 'Millet (Bajra)',
      confidence: 91.5,
      suitableFertilizers: ['Compost manure', 'NPK 15-15-15', 'Foliar zinc spray'],
      irrigationRecommendation: 'Very low water consumption. Use drip irrigation sparingly. Drip twice a week during vegetative stage only.',
      diseasePrevention: [
        'Treat seeds with metalaxyl for downy mildew protection.',
        'Perform rogueing of infected plants immediately.',
        'Avoid stagnant water around root collars.'
      ],
      seasonalAdvice: 'Ideal for arid/dry season crops. Use mulching around plants to reduce water evaporation in sandy beds.',
      weatherAwareness: 'High temperatures and dry spells require defensive soil mulching.',
      farmingTips: [
        'Sow seed deeper in sandy soils to leverage deeper moisture channels.',
        'Incorporate heavy green manure during the post-harvest cycle.'
      ],
      riskLevel: 'Low',
      explanation: 'With low rainfall, high temperatures, and poor nutrient retention of sandy soil, highly drought-resistant crops like Pearl Millet are optimal. Traditional cash crops will suffer severe moisture stress.'
    },
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_NOTIFICATIONS: Notification[] = [
  {
    id: 'n-1',
    title: 'Extreme Weather Warning',
    message: 'Flash storm advisory for Punjab region. Check irrigation canals and ensure proper drainage exits are open.',
    type: 'alert',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n-2',
    title: 'AI Model Upgraded',
    message: 'AgriGuard Crop Intelligence Model updated to v3.5. Recommendation accuracy for arid regions increased by 12%.',
    type: 'success',
    read: false,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'n-3',
    title: 'Seasonal Crop Planning Active',
    message: 'Agricultural officers are now conducting online advisory sessions for the upcoming fall harvest planning.',
    type: 'info',
    read: true,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_LOGS: ActivityLog[] = [
  {
    id: 'l-1',
    userId: 'u-1',
    userName: 'Robert Jenkins',
    action: 'CROP_PREDICTION',
    details: 'Generated recommendation for Maize (Corn) - 94.2% confidence.',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'l-2',
    userId: 'u-1',
    userName: 'Robert Jenkins',
    action: 'CROP_PREDICTION',
    details: 'Generated recommendation for Rice (Paddy) - 89.7% confidence.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'l-3',
    userId: 'u-2',
    userName: 'Dr. Sarah Patel',
    action: 'FEEDBACK_SUBMIT',
    details: 'Reviewed and validated AI crop prediction parameters for millet.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
];

const DEFAULT_FEEDBACKS: Feedback[] = [
  {
    id: 'f-1',
    userId: 'u-1',
    userName: 'Robert Jenkins',
    rating: 5,
    comment: 'The Maize prediction matches my experience perfectly! The fertilizer suggestions saved me considerable cost this season.',
    predictionId: 'p-1',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export class DatabaseService {
  private static instance: DatabaseService;
  private memoryDb: DbSchema;

  private constructor() {
    this.memoryDb = {
      users: [...DEFAULT_USERS],
      predictions: [...DEFAULT_PREDICTIONS],
      notifications: [...DEFAULT_NOTIFICATIONS],
      activityLogs: [...DEFAULT_LOGS],
      feedbacks: [...DEFAULT_FEEDBACKS]
    };
    this.loadDatabase();
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  private loadDatabase(): void {
    try {
      if (fs.existsSync(DB_FILE_PATH)) {
        const fileContent = fs.readFileSync(DB_FILE_PATH, 'utf-8');
        const parsed = JSON.parse(fileContent);
        this.memoryDb = {
          users: parsed.users || [...DEFAULT_USERS],
          predictions: parsed.predictions || [...DEFAULT_PREDICTIONS],
          notifications: parsed.notifications || [...DEFAULT_NOTIFICATIONS],
          activityLogs: parsed.activityLogs || [...DEFAULT_LOGS],
          feedbacks: parsed.feedbacks || [...DEFAULT_FEEDBACKS]
        };
      } else {
        this.saveDatabase();
      }
    } catch (e) {
      console.error('Error loading local database:', e);
    }
  }

  private saveDatabase(): void {
    try {
      fs.writeFileSync(DB_FILE_PATH, JSON.stringify(this.memoryDb, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving local database:', e);
    }
  }

  // --- Users CRUD ---
  public getUsers(): User[] {
    return this.memoryDb.users;
  }

  public getUserByEmail(email: string): User | undefined {
    return this.memoryDb.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    return this.memoryDb.users.find(u => u.id === id);
  }

  public createUser(user: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...user,
      id: `u-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.memoryDb.users.push(newUser);
    this.saveDatabase();
    this.logActivity(newUser.id, newUser.name, 'USER_REGISTER', `Created account with role: ${newUser.role}`);
    return newUser;
  }

  public updateUser(id: string, updates: Partial<Omit<User, 'id' | 'role' | 'createdAt'>>): User | null {
    const index = this.memoryDb.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    this.memoryDb.users[index] = { ...this.memoryDb.users[index], ...updates };
    this.saveDatabase();
    return this.memoryDb.users[index];
  }

  public deleteUser(id: string): boolean {
    const initialLength = this.memoryDb.users.length;
    this.memoryDb.users = this.memoryDb.users.filter(u => u.id !== id);
    if (this.memoryDb.users.length < initialLength) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Crop Predictions ---
  public getPredictions(): PredictionHistory[] {
    return this.memoryDb.predictions;
  }

  public getPredictionsByUserId(userId: string): PredictionHistory[] {
    return this.memoryDb.predictions.filter(p => p.userId === userId);
  }

  public createPrediction(prediction: Omit<PredictionHistory, 'id' | 'timestamp'>): PredictionHistory {
    const newPrediction: PredictionHistory = {
      ...prediction,
      id: `p-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.memoryDb.predictions.unshift(newPrediction);
    this.saveDatabase();
    this.logActivity(prediction.userId, prediction.userName, 'CROP_PREDICTION', `Generated recommendations for ${prediction.result.bestCrop} (${prediction.result.confidence}% confidence)`);
    return newPrediction;
  }

  public deletePrediction(id: string): boolean {
    const initialLength = this.memoryDb.predictions.length;
    this.memoryDb.predictions = this.memoryDb.predictions.filter(p => p.id !== id);
    if (this.memoryDb.predictions.length < initialLength) {
      this.saveDatabase();
      return true;
    }
    return false;
  }

  // --- Notifications ---
  public getNotifications(userId?: string): Notification[] {
    // Return custom or general notifications
    return this.memoryDb.notifications.filter(n => !n.userId || n.userId === userId);
  }

  public createNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: `n-${Date.now()}`,
      read: false,
      timestamp: new Date().toISOString()
    };
    this.memoryDb.notifications.unshift(newNotification);
    this.saveDatabase();
    return newNotification;
  }

  public markAllNotificationsRead(userId?: string): void {
    this.memoryDb.notifications = this.memoryDb.notifications.map(n => {
      if (!n.userId || n.userId === userId) {
        return { ...n, read: true };
      }
      return n;
    });
    this.saveDatabase();
  }

  // --- Feedback ---
  public getFeedback(): Feedback[] {
    return this.memoryDb.feedbacks;
  }

  public createFeedback(feedback: Omit<Feedback, 'id' | 'timestamp'>): Feedback {
    const newFeedback: Feedback = {
      ...feedback,
      id: `f-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.memoryDb.feedbacks.unshift(newFeedback);
    this.saveDatabase();
    this.logActivity(feedback.userId, feedback.userName, 'FEEDBACK_SUBMIT', `Rated ${feedback.rating}/5 with comment: "${feedback.comment.substring(0, 30)}..."`);
    return newFeedback;
  }

  // --- Activity Logging ---
  public getActivityLogs(): ActivityLog[] {
    return this.memoryDb.activityLogs;
  }

  public logActivity(userId: string, userName: string, action: string, details: string): void {
    const newLog: ActivityLog = {
      id: `l-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      userId,
      userName,
      action,
      details,
      timestamp: new Date().toISOString()
    };
    this.memoryDb.activityLogs.unshift(newLog);
    // Maintain a max log size
    if (this.memoryDb.activityLogs.length > 200) {
      this.memoryDb.activityLogs.pop();
    }
    this.saveDatabase();
  }
}
export const db = DatabaseService.getInstance();
