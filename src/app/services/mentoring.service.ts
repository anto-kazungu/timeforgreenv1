import { Injectable } from '@angular/core';

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  mentorId: string;
  mentorName: string;
  enrolledCount: number;
  rating: number;
  dateCreated: Date;
  content: TrainingContent[];
  isPublished: boolean;
  gradient: string;
  videoLinks?: string[]; // Task 2.1: Video links
  resourceLinks?: string[]; // Task 2.1: Additional resource links
  prerequisites?: string;
  learningObjectives?: string[];
  certificateAwarded?: boolean;
}

export interface TrainingContent {
  id: string;
  type: 'video' | 'article' | 'quiz' | 'assignment';
  title: string;
  content: string;
  order: number;
  duration?: string;
  link?: string; // Task 2.1: External link for content
}

export interface Mentee {
  id: string;
  name: string;
  email: string;
  enrolledModules: string[];
  progress: { [moduleId: string]: number };
  completedModules: string[];
  totalXP: number;
  joinDate: Date;
  lastActive: Date;
}

export interface MentorSession {
  id: string;
  title: string;
  description: string;
  mentorId: string;
  mentorName: string;
  date: Date;
  duration: number;
  maxParticipants: number;
  enrolledParticipants: string[];
  type: 'workshop' | 'webinar' | 'one-on-one' | 'group';
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meetingLink?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MentoringService {
  private trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'Introduction to Sustainable Living',
      description: 'Learn the basics of sustainable living and how to reduce your environmental footprint.',
      category: 'Sustainability',
      difficulty: 'Beginner',
      duration: '2 hours',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Maria Educator',
      enrolledCount: 156,
      rating: 4.8,
      dateCreated: new Date('2024-01-15'),
      isPublished: true,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      content: [
        {
          id: 'c1',
          type: 'video',
          title: 'Welcome to Sustainable Living',
          content: 'Introduction video about sustainable practices',
          order: 1,
          duration: '15 min'
        },
        {
          id: 'c2',
          type: 'article',
          title: 'Understanding Your Carbon Footprint',
          content: 'Detailed article about calculating and reducing carbon footprint',
          order: 2
        }
      ]
    },
    {
      id: '2',
      title: 'Renewable Energy Systems',
      description: 'Comprehensive guide to understanding and implementing renewable energy solutions.',
      category: 'Energy',
      difficulty: 'Intermediate',
      duration: '4 hours',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Maria Educator',
      enrolledCount: 89,
      rating: 4.9,
      dateCreated: new Date('2024-02-20'),
      isPublished: true,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      content: []
    }
  ];

  private mentees: Mentee[] = [
    {
      id: '1',
      name: 'Sarah Green',
      email: 'sarah@example.com',
      enrolledModules: ['1', '2'],
      progress: { '1': 75, '2': 30 },
      completedModules: [],
      totalXP: 450,
      joinDate: new Date('2024-01-20'),
      lastActive: new Date('2024-11-16')
    },
    {
      id: '2',
      name: 'John Eco',
      email: 'john@example.com',
      enrolledModules: ['1'],
      progress: { '1': 100 },
      completedModules: ['1'],
      totalXP: 200,
      joinDate: new Date('2024-02-10'),
      lastActive: new Date('2024-11-15')
    }
  ];

  private mentorSessions: MentorSession[] = [
    {
      id: '1',
      title: 'Solar Panel Installation Workshop',
      description: 'Hands-on workshop for installing residential solar panels',
      mentorId: 'mentor-1',
      mentorName: 'Dr. Maria Educator',
      date: new Date('2024-11-25T14:00:00'),
      duration: 120,
      maxParticipants: 20,
      enrolledParticipants: ['1', '2'],
      type: 'workshop',
      status: 'scheduled',
      meetingLink: 'https://meet.example.com/solar-workshop'
    }
  ];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedModules = localStorage.getItem('trainingModules');
    if (savedModules) {
      this.trainingModules = JSON.parse(savedModules).map((m: any) => ({
        ...m,
        dateCreated: new Date(m.dateCreated)
      }));
    } else {
      this.saveToStorage();
    }

    const savedMentees = localStorage.getItem('mentees');
    if (savedMentees) {
      this.mentees = JSON.parse(savedMentees).map((m: any) => ({
        ...m,
        joinDate: new Date(m.joinDate),
        lastActive: new Date(m.lastActive)
      }));
    }

    const savedSessions = localStorage.getItem('mentorSessions');
    if (savedSessions) {
      this.mentorSessions = JSON.parse(savedSessions).map((s: any) => ({
        ...s,
        date: new Date(s.date)
      }));
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('trainingModules', JSON.stringify(this.trainingModules));
    localStorage.setItem('mentees', JSON.stringify(this.mentees));
    localStorage.setItem('mentorSessions', JSON.stringify(this.mentorSessions));
  }

  // Training Module Methods
  getAllModules(): TrainingModule[] {
    return this.trainingModules;
  }

  getModulesByMentor(mentorId: string): TrainingModule[] {
    return this.trainingModules.filter(m => m.mentorId === mentorId);
  }

  getModuleById(id: string): TrainingModule | undefined {
    return this.trainingModules.find(m => m.id === id);
  }

  createModule(module: Omit<TrainingModule, 'id' | 'dateCreated' | 'enrolledCount' | 'rating'>): TrainingModule {
    const newModule: TrainingModule = {
      ...module,
      id: this.generateId(),
      dateCreated: new Date(),
      enrolledCount: 0,
      rating: 0
    };

    this.trainingModules.push(newModule);
    this.saveToStorage();
    return newModule;
  }

  updateModule(id: string, updates: Partial<TrainingModule>): boolean {
    const index = this.trainingModules.findIndex(m => m.id === id);
    if (index > -1) {
      this.trainingModules[index] = { ...this.trainingModules[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  deleteModule(id: string): boolean {
    const index = this.trainingModules.findIndex(m => m.id === id);
    if (index > -1) {
      this.trainingModules.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Mentee Methods
  getAllMentees(): Mentee[] {
    return this.mentees;
  }

  getMenteeById(id: string): Mentee | undefined {
    return this.mentees.find(m => m.id === id);
  }

  enrollMentee(menteeId: string, moduleId: string): boolean {
    const mentee = this.getMenteeById(menteeId);
    const module = this.getModuleById(moduleId);
    
    if (mentee && module && !mentee.enrolledModules.includes(moduleId)) {
      mentee.enrolledModules.push(moduleId);
      mentee.progress[moduleId] = 0;
      module.enrolledCount++;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  updateProgress(menteeId: string, moduleId: string, progress: number): boolean {
    const mentee = this.getMenteeById(menteeId);
    if (mentee && mentee.enrolledModules.includes(moduleId)) {
      mentee.progress[moduleId] = progress;
      mentee.lastActive = new Date();
      
      if (progress >= 100 && !mentee.completedModules.includes(moduleId)) {
        mentee.completedModules.push(moduleId);
        mentee.totalXP += 100; // Award XP for completion
      }
      
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Session Methods
  getAllSessions(): MentorSession[] {
    return this.mentorSessions;
  }

  getSessionsByMentor(mentorId: string): MentorSession[] {
    return this.mentorSessions.filter(s => s.mentorId === mentorId);
  }

  createSession(session: Omit<MentorSession, 'id' | 'enrolledParticipants'>): MentorSession {
    const newSession: MentorSession = {
      ...session,
      id: this.generateId(),
      enrolledParticipants: []
    };

    this.mentorSessions.push(newSession);
    this.saveToStorage();
    return newSession;
  }

  enrollInSession(sessionId: string, participantId: string): boolean {
    const session = this.mentorSessions.find(s => s.id === sessionId);
    if (session && session.enrolledParticipants.length < session.maxParticipants) {
      if (!session.enrolledParticipants.includes(participantId)) {
        session.enrolledParticipants.push(participantId);
        this.saveToStorage();
        return true;
      }
    }
    return false;
  }

  updateSessionStatus(sessionId: string, status: MentorSession['status']): boolean {
    const session = this.mentorSessions.find(s => s.id === sessionId);
    if (session) {
      session.status = status;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getMentorStats(mentorId: string) {
    const modules = this.getModulesByMentor(mentorId);
    const sessions = this.getSessionsByMentor(mentorId);
    const totalEnrollments = modules.reduce((sum, m) => sum + m.enrolledCount, 0);
    const avgRating = modules.length > 0 ? 
      modules.reduce((sum, m) => sum + m.rating, 0) / modules.length : 0;

    return {
      totalModules: modules.length,
      totalEnrollments,
      totalSessions: sessions.length,
      avgRating: Math.round(avgRating * 10) / 10,
      activeMentees: this.mentees.filter(m => 
        m.enrolledModules.some(moduleId => 
          modules.some(mod => mod.id === moduleId)
        )
      ).length
    };
  }

  // Enhanced Course Management (Task 2)
  
  // Task 2.1: Add course with links and info
  addCourseWithLinks(
    mentorId: string,
    mentorName: string,
    courseData: {
      title: string;
      description: string;
      category: string;
      difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
      duration: string;
      videoLinks?: string[];
      resourceLinks?: string[];
      prerequisites?: string;
      learningObjectives?: string[];
      gradient: string;
    },
    pointsService?: any
  ): TrainingModule {
    const newModule = this.createModule({
      ...courseData,
      mentorId,
      mentorName,
      content: [],
      isPublished: false
    });

    // Award points to mentor for creating course
    if (pointsService) {
      pointsService.addPoints(100, `Created course: ${courseData.title}`);
    }

    return newModule;
  }

  // Task 2.2: View course info and learner progress
  getCourseWithLearnerProgress(moduleId: string) {
    const module = this.getModuleById(moduleId);
    if (!module) return null;

    const enrolledMentees = this.mentees.filter(m => 
      m.enrolledModules.includes(moduleId)
    );

    const learnerProgress = enrolledMentees.map(mentee => ({
      menteeId: mentee.id,
      menteeName: mentee.name,
      menteeEmail: mentee.email,
      progress: mentee.progress[moduleId] || 0,
      isCompleted: mentee.completedModules.includes(moduleId),
      enrollDate: mentee.joinDate,
      lastActive: mentee.lastActive,
      totalXP: mentee.totalXP
    }));

    return {
      module,
      learnerProgress,
      totalEnrolled: enrolledMentees.length,
      completionRate: enrolledMentees.length > 0 
        ? (enrolledMentees.filter(m => m.completedModules.includes(moduleId)).length / enrolledMentees.length) * 100 
        : 0,
      averageProgress: enrolledMentees.length > 0
        ? enrolledMentees.reduce((sum, m) => sum + (m.progress[moduleId] || 0), 0) / enrolledMentees.length
        : 0
    };
  }

  // Task 2.3: Delete course (with points reward)
  deleteCourse(moduleId: string, mentorId: string, pointsService?: any): boolean {
    const module = this.getModuleById(moduleId);
    
    // Verify mentor owns the course
    if (module && module.mentorId === mentorId) {
      const success = this.deleteModule(moduleId);
      
      if (success) {
        // Award points for course management
        if (pointsService) {
          pointsService.addPoints(25, 'Managed course content');
        }
        return true;
      }
    }
    return false;
  }

  // Add content to existing course
  addContentToModule(moduleId: string, content: Omit<TrainingContent, 'id'>): boolean {
    const module = this.getModuleById(moduleId);
    if (module) {
      const newContent: TrainingContent = {
        ...content,
        id: this.generateId()
      };
      module.content.push(newContent);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Update course links
  updateCourseLinks(moduleId: string, videoLinks?: string[], resourceLinks?: string[]): boolean {
    const module = this.getModuleById(moduleId);
    if (module) {
      if (videoLinks) module.videoLinks = videoLinks;
      if (resourceLinks) module.resourceLinks = resourceLinks;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Publish/Unpublish course
  toggleCoursePublish(moduleId: string, mentorId: string): boolean {
    const module = this.getModuleById(moduleId);
    if (module && module.mentorId === mentorId) {
      module.isPublished = !module.isPublished;
      this.saveToStorage();
      return true;
    }
    return false;
  }
}