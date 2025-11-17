import { Injectable } from '@angular/core';

export type ExpertiseArea = 'environmental-law' | 'forestry' | 'climate-science' | 'renewable-energy' | 'waste-management' | 'conservation' | 'sustainable-agriculture' | 'water-resources';

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  expertiseArea: ExpertiseArea;
  duration: number; // in minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  mentorId: string;
  mentorName: string;
  resources: Resource[];
  enrolledCount: number;
  rating: number;
  createdDate: Date;
  status: 'draft' | 'published' | 'archived';
  topics: string[];
}

export interface Resource {
  id: string;
  type: 'video' | 'document' | 'link' | 'quiz';
  title: string;
  url: string;
  description?: string;
}

export interface Mentee {
  id: string;
  name: string;
  email: string;
  enrolledModules: string[];
  completedModules: string[];
  progress: { [moduleId: string]: number };
  joinedDate: Date;
  lastActive: Date;
  questionsAsked: number;
}

export interface ConsultationSession {
  id: string;
  title: string;
  description: string;
  expertiseArea: ExpertiseArea;
  mentorId: string;
  mentorName: string;
  date: Date;
  duration: number; // in minutes
  maxAttendees: number;
  currentAttendees: number;
  attendees: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meetingLink?: string;
  topics: string[];
}

export interface Question {
  id: string;
  menteeId: string;
  menteeName: string;
  moduleId: string;
  moduleName: string;
  question: string;
  answer?: string;
  askedDate: Date;
  answeredDate?: Date;
  status: 'pending' | 'answered';
}

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private modules: TrainingModule[] = [
    {
      id: '1',
      title: 'Environmental Law Basics for Communities',
      description: 'Understanding environmental regulations, rights, and legal frameworks for community environmental protection.',
      expertiseArea: 'environmental-law',
      duration: 90,
      level: 'beginner',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Sarah Johnson',
      resources: [
        { id: 'r1', type: 'video', title: 'Introduction to Environmental Law', url: 'https://example.com/video1', description: 'Overview of key environmental laws' },
        { id: 'r2', type: 'document', title: 'Legal Framework Guide', url: 'https://example.com/doc1', description: 'Comprehensive guide to environmental regulations' }
      ],
      enrolledCount: 45,
      rating: 4.8,
      createdDate: new Date('2024-10-01'),
      status: 'published',
      topics: ['Environmental Rights', 'Regulations', 'Community Protection', 'Legal Compliance']
    },
    {
      id: '2',
      title: 'Sustainable Forestry Management',
      description: 'Best practices for sustainable forest management, conservation techniques, and community forestry programs.',
      expertiseArea: 'forestry',
      duration: 120,
      level: 'intermediate',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Sarah Johnson',
      resources: [
        { id: 'r3', type: 'video', title: 'Forest Conservation Techniques', url: 'https://example.com/video2' },
        { id: 'r4', type: 'link', title: 'Forestry Resources Database', url: 'https://example.com/forestry' }
      ],
      enrolledCount: 32,
      rating: 4.9,
      createdDate: new Date('2024-09-15'),
      status: 'published',
      topics: ['Forest Management', 'Conservation', 'Biodiversity', 'Community Forestry']
    }
  ];

  private mentees: Mentee[] = [
    {
      id: 'mentee-1',
      name: 'John Doe',
      email: 'john@example.com',
      enrolledModules: ['1', '2'],
      completedModules: ['1'],
      progress: { '1': 100, '2': 45 },
      joinedDate: new Date('2024-09-01'),
      lastActive: new Date('2024-11-15'),
      questionsAsked: 5
    },
    {
      id: 'mentee-2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      enrolledModules: ['1'],
      completedModules: [],
      progress: { '1': 60 },
      joinedDate: new Date('2024-10-10'),
      lastActive: new Date('2024-11-16'),
      questionsAsked: 3
    }
  ];

  private sessions: ConsultationSession[] = [
    {
      id: 's1',
      title: 'Q&A: Environmental Law for Activists',
      description: 'Open consultation session for community activists on environmental legal matters.',
      expertiseArea: 'environmental-law',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Sarah Johnson',
      date: new Date('2024-11-25T14:00:00'),
      duration: 60,
      maxAttendees: 20,
      currentAttendees: 12,
      attendees: ['mentee-1', 'mentee-2'],
      status: 'scheduled',
      meetingLink: 'https://meet.example.com/session1',
      topics: ['Legal Rights', 'Community Action', 'Environmental Protection']
    }
  ];

  private questions: Question[] = [
    {
      id: 'q1',
      menteeId: 'mentee-1',
      menteeName: 'John Doe',
      moduleId: '2',
      moduleName: 'Sustainable Forestry Management',
      question: 'What are the best practices for community-led reforestation projects?',
      askedDate: new Date('2024-11-14'),
      status: 'pending'
    }
  ];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedModules = localStorage.getItem('mentorModules');
    if (savedModules) {
      this.modules = JSON.parse(savedModules).map((m: any) => ({
        ...m,
        createdDate: new Date(m.createdDate)
      }));
    }

    const savedSessions = localStorage.getItem('mentorSessions');
    if (savedSessions) {
      this.sessions = JSON.parse(savedSessions).map((s: any) => ({
        ...s,
        date: new Date(s.date)
      }));
    }

    const savedMentees = localStorage.getItem('mentees');
    if (savedMentees) {
      this.mentees = JSON.parse(savedMentees).map((m: any) => ({
        ...m,
        joinedDate: new Date(m.joinedDate),
        lastActive: new Date(m.lastActive)
      }));
    }

    const savedQuestions = localStorage.getItem('mentorQuestions');
    if (savedQuestions) {
      this.questions = JSON.parse(savedQuestions).map((q: any) => ({
        ...q,
        askedDate: new Date(q.askedDate),
        answeredDate: q.answeredDate ? new Date(q.answeredDate) : undefined
      }));
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('mentorModules', JSON.stringify(this.modules));
    localStorage.setItem('mentorSessions', JSON.stringify(this.sessions));
    localStorage.setItem('mentees', JSON.stringify(this.mentees));
    localStorage.setItem('mentorQuestions', JSON.stringify(this.questions));
  }

  // Module Methods
  getModulesByMentor(mentorId: string): TrainingModule[] {
    return this.modules.filter(m => m.mentorId === mentorId);
  }

  getModuleById(id: string): TrainingModule | undefined {
    return this.modules.find(m => m.id === id);
  }

  createModule(module: Omit<TrainingModule, 'id' | 'enrolledCount' | 'rating' | 'createdDate'>): TrainingModule {
    const newModule: TrainingModule = {
      ...module,
      id: this.generateId(),
      enrolledCount: 0,
      rating: 0,
      createdDate: new Date()
    };
    this.modules.push(newModule);
    this.saveToStorage();
    return newModule;
  }

  updateModule(id: string, updates: Partial<TrainingModule>): boolean {
    const index = this.modules.findIndex(m => m.id === id);
    if (index > -1) {
      this.modules[index] = { ...this.modules[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteModule(id: string): boolean {
    const index = this.modules.findIndex(m => m.id === id);
    if (index > -1) {
      this.modules.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Mentee Methods
  getMenteesByMentor(mentorId: string): Mentee[] {
    const mentorModules = this.getModulesByMentor(mentorId).map(m => m.id);
    return this.mentees.filter(mentee => 
      mentee.enrolledModules.some(moduleId => mentorModules.includes(moduleId))
    );
  }

  getMenteeById(id: string): Mentee | undefined {
    return this.mentees.find(m => m.id === id);
  }

  // Session Methods
  getSessionsByMentor(mentorId: string): ConsultationSession[] {
    return this.sessions.filter(s => s.mentorId === mentorId);
  }

  createSession(session: Omit<ConsultationSession, 'id' | 'currentAttendees' | 'attendees'>): ConsultationSession {
    const newSession: ConsultationSession = {
      ...session,
      id: this.generateId(),
      currentAttendees: 0,
      attendees: []
    };
    this.sessions.push(newSession);
    this.saveToStorage();
    return newSession;
  }

  updateSession(id: string, updates: Partial<ConsultationSession>): boolean {
    const index = this.sessions.findIndex(s => s.id === id);
    if (index > -1) {
      this.sessions[index] = { ...this.sessions[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteSession(id: string): boolean {
    const index = this.sessions.findIndex(s => s.id === id);
    if (index > -1) {
      this.sessions.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Question Methods
  getQuestionsByMentor(mentorId: string): Question[] {
    const mentorModules = this.getModulesByMentor(mentorId).map(m => m.id);
    return this.questions.filter(q => mentorModules.includes(q.moduleId));
  }

  answerQuestion(questionId: string, answer: string): boolean {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      question.answer = answer;
      question.answeredDate = new Date();
      question.status = 'answered';
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getExpertiseAreaLabel(area: ExpertiseArea): string {
    const labels: { [key in ExpertiseArea]: string } = {
      'environmental-law': 'Environmental Law',
      'forestry': 'Forestry & Conservation',
      'climate-science': 'Climate Science',
      'renewable-energy': 'Renewable Energy',
      'waste-management': 'Waste Management',
      'conservation': 'Wildlife Conservation',
      'sustainable-agriculture': 'Sustainable Agriculture',
      'water-resources': 'Water Resources'
    };
    return labels[area];
  }
}
