import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MentorService, TrainingModule, Mentee, ConsultationSession } from '../../../services/mentor.service';
import { PointsService } from '../../../services/points.service';
import { XPService } from '../../../services/xp.service';

@Component({
  selector: 'app-mentor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mentor-dashboard.component.html',
  styleUrl: './mentor-dashboard.component.css'
})
export class MentorDashboardComponent implements OnInit {
  userName = 'Mentor';
  greenPoints = 1250;
  userLevel = 3;
  levelName = 'Expert';
  levelIcon = 'school';
  totalTreesPlanted = 0;
  
  trainingModules: TrainingModule[] = [];
  recentMentees: Mentee[] = [];
  upcomingSessions: ConsultationSession[] = [];

  stats = [
    { label: 'Training Modules', value: 0, icon: 'library_books', color: '#667eea' },
    { label: 'Active Mentees', value: 0, icon: 'people', color: '#f093fb' },
    { label: 'Trees Planted', value: 0, icon: 'park', color: '#00d084' },
    { label: 'Total Enrollments', value: 0, icon: 'school', color: '#43e97b' },
    { label: 'Avg Rating', value: 0, icon: 'star', color: '#fa709a' }
  ];

  quickActions = [
    { label: 'Create Training', icon: 'add_circle', route: '/mentor/create-training' },
    { label: 'Manage Modules', icon: 'library_books', route: '/mentor/modules' },
    { label: 'View Mentees', icon: 'people', route: '/mentor/mentees' },
    { label: 'Schedule Session', icon: 'event', route: '/mentor/sessions' },
    { label: 'My Profile', icon: 'person', route: '/profile-settings' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private mentorService: MentorService,
    private pointsService: PointsService,
    private xpService: XPService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.firstName;
    }

    // Subscribe to points and XP
    this.pointsService.points$.subscribe(points => {
      this.greenPoints = points;
    });

    this.xpService.xp$.subscribe(() => {
      this.updateLevelInfo();
    });

    this.updateLevelInfo();
    this.loadMentorData();
  }

  private updateLevelInfo() {
    const currentLevel = this.xpService.getCurrentLevel();
    this.userLevel = currentLevel.level;
    this.levelName = currentLevel.name;
    this.levelIcon = currentLevel.icon;
  }

  private loadMentorData() {
    // Get current mentor ID
    const currentUser = this.authService.getCurrentUser();
    const mentorId = currentUser?.id || 'mentor-1';

    // Load mentor's training modules
    this.trainingModules = this.mentorService.getModulesByMentor(mentorId);

    // Load mentees
    this.recentMentees = this.mentorService.getMenteesByMentor(mentorId)
      .sort((a, b) => b.lastActive.getTime() - a.lastActive.getTime())
      .slice(0, 5);

    // Load upcoming sessions
    this.upcomingSessions = this.mentorService.getSessionsByMentor(mentorId)
      .filter(session => session.status === 'scheduled' && session.date > new Date())
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 3);

    // Calculate and update stats
    const totalEnrollments = this.trainingModules.reduce((sum, m) => sum + m.enrolledCount, 0);
    const avgRating = this.trainingModules.length > 0 
      ? this.trainingModules.reduce((sum, m) => sum + m.rating, 0) / this.trainingModules.length 
      : 0;

    // Load trees planted
    this.loadTreesPlanted();

    this.stats[0].value = this.trainingModules.length;
    this.stats[1].value = this.recentMentees.length;
    this.stats[2].value = this.totalTreesPlanted;
    this.stats[3].value = totalEnrollments;
    this.stats[4].value = parseFloat(avgRating.toFixed(1));
  }

  private loadTreesPlanted() {
    const logs = localStorage.getItem('treePlantingLogs');
    if (logs) {
      const treeLogs = JSON.parse(logs);
      this.totalTreesPlanted = treeLogs.reduce((total: number, log: any) => total + log.count, 0);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  viewModule(moduleId: string) {
    this.router.navigate(['/mentor/modules', moduleId]);
  }

  viewMentee(menteeId: string) {
    this.router.navigate(['/mentor/mentees', menteeId]);
  }

  viewSession(sessionId: string) {
    this.router.navigate(['/mentor/sessions', sessionId]);
  }

  getTimeUntilSession(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Soon';
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#43e97b';
    if (progress >= 50) return '#f093fb';
    if (progress >= 25) return '#fa709a';
    return '#667eea';
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }

  navigateToClimateNews() {
    this.router.navigate(['/climate-news']);
  }

  logout() {
    this.authService.logout();
  }
}