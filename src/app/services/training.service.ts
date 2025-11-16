import { Injectable } from '@angular/core';

export interface Training {
  id: string;
  title: string;
  description: string;
  duration: string;
  participants: number;
  level: string;
  gradient: string;
  enrolled?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private trainings: Training[] = [
    {
      id: '1',
      title: 'Waste Management Basics',
      description: 'Learn the fundamentals of proper waste segregation and recycling techniques.',
      duration: '2 weeks',
      participants: 245,
      level: 'Beginner',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      enrolled: false
    },
    {
      id: '2',
      title: 'Community Leadership',
      description: 'Develop skills to lead environmental initiatives in your community.',
      duration: '4 weeks',
      participants: 189,
      level: 'Intermediate',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      enrolled: false
    },
    {
      id: '3',
      title: 'Sustainable Practices',
      description: 'Discover sustainable living practices and reduce your carbon footprint.',
      duration: '3 weeks',
      participants: 312,
      level: 'Beginner',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      enrolled: false
    },
    {
      id: '4',
      title: 'Water Conservation',
      description: 'Master techniques for water conservation and pollution prevention.',
      duration: '2 weeks',
      participants: 156,
      level: 'Beginner',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      enrolled: false
    }
  ];

  private enrolledCourses: string[] = [];

  constructor() {
    const saved = localStorage.getItem('enrolledCourses');
    if (saved) {
      this.enrolledCourses = JSON.parse(saved);
      this.updateEnrollmentStatus();
    }
  }

  getAllTrainings(): Training[] {
    return this.trainings;
  }

  getOngoingTrainings(): Training[] {
    return this.trainings.filter(t => this.enrolledCourses.includes(t.id));
  }

  getAvailableTrainings(): Training[] {
    return this.trainings.filter(t => !this.enrolledCourses.includes(t.id));
  }

  enrollInTraining(trainingId: string, pointsService?: any): boolean {
    if (!this.enrolledCourses.includes(trainingId)) {
      this.enrolledCourses.push(trainingId);
      this.saveEnrollments();
      this.updateEnrollmentStatus();
      
      const training = this.trainings.find(t => t.id === trainingId);
      if (training) {
        training.participants++;
      }
      
      // Award points for enrolling
      if (pointsService) {
        pointsService.addPoints(50, `Enrolled in ${training?.title}`);
      }
      
      return true;
    }
    return false;
  }

  private updateEnrollmentStatus() {
    this.trainings.forEach(training => {
      training.enrolled = this.enrolledCourses.includes(training.id);
    });
  }

  private saveEnrollments() {
    localStorage.setItem('enrolledCourses', JSON.stringify(this.enrolledCourses));
  }
}
