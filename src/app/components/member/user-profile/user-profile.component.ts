import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommunityService } from '../../../services/community.service';
import { TrainingService } from '../../../services/training.service';
import { PointsService } from '../../../services/points.service';
import { XPService } from '../../../services/xp.service';
import { TreeLoggerComponent } from '../../shared/tree-logger/tree-logger.component';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule, TreeLoggerComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any;
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  bio = '';
  greenPoints = 850;
  userLevel = 1;
  levelName = 'Rookie';
  levelIcon = '🌱';
  levelColor = '#81C784';
  levelProgress = 0;
  xpToNextLevel = 0;
  nextLevelName = '';
  userXP = 850;
  communitiesCount = 0;
  eventsAttended = 0;
  trainingsCompleted = 0;
  updateMessage = '';
  updateSuccess = false;
  editMode = false;
  totalTreesPlanted = 0;

  achievements = [
    {
      icon: '🌱',
      title: 'First Steps',
      description: 'Join your first community',
      unlocked: true
    },
    {
      icon: '♻️',
      title: 'Recycling Champion',
      description: 'Participate in 5 recycling events',
      unlocked: false
    },
    {
      icon: '🌳',
      title: 'Tree Planter',
      description: 'Plant 10 trees',
      unlocked: true
    },
    {
      icon: '💧',
      title: 'Water Warrior',
      description: 'Complete water conservation training',
      unlocked: false
    },
    {
      icon: '👥',
      title: 'Community Leader',
      description: 'Lead a community initiative',
      unlocked: false
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private communityService: CommunityService,
    private trainingService: TrainingService,
    private pointsService: PointsService,
    private xpService: XPService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.username = this.user.username;
      this.email = this.user.email;
      this.bio = this.user.bio || '';
    }

    this.communitiesCount = this.communityService.getUserCommunities().length;
    
    // Get events attended count
    const joinedEvents = localStorage.getItem('joinedEvents');
    if (joinedEvents) {
      this.eventsAttended = JSON.parse(joinedEvents).length;
    }
    
    // Get trainings completed count
    this.trainingsCompleted = this.trainingService.getOngoingTrainings().length;
    
    // Subscribe to green points changes
    this.pointsService.points$.subscribe(points => {
      this.greenPoints = points;
    });
    
    // Subscribe to XP and level changes
    this.xpService.xp$.subscribe(xp => {
      this.userXP = xp;
      this.updateLevelInfo();
    });
    
    // Load tree planting data
    this.loadTreesPlanted();
  }
  
  private updateLevelInfo() {
    const currentLevel = this.xpService.getCurrentLevel();
    const nextLevel = this.xpService.getNextLevel();
    
    this.userLevel = currentLevel.level;
    this.levelName = currentLevel.name;
    this.levelIcon = currentLevel.icon;
    this.levelColor = currentLevel.color;
    this.levelProgress = this.xpService.getLevelProgress();
    this.xpToNextLevel = this.xpService.getXPToNextLevel();
    this.nextLevelName = nextLevel ? nextLevel.name : 'Max Level';
  }

  updateProfile() {
    if (!this.firstName || !this.lastName || !this.username || !this.email) {
      this.updateMessage = 'Please fill in all required fields';
      this.updateSuccess = false;
      return;
    }

    // Update user info (in a real app, this would call an API)
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.bio = this.bio;

    // Update in localStorage
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    this.updateMessage = 'Profile updated successfully!';
    this.updateSuccess = true;

    setTimeout(() => {
      this.updateMessage = '';
    }, 3000);
  }

  resetForm() {
    if (this.user) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.username = this.user.username;
      this.email = this.user.email;
      this.bio = this.user.bio || '';
    }
    this.updateMessage = '';
  }

  goBack() {
    this.router.navigate([this.authService.getRoleDashboard()]);
  }

  logout() {
    this.authService.logout();
  }

  getUnlockedCount(): number {
    return this.achievements.filter(achievement => achievement.unlocked).length;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  private loadTreesPlanted() {
    const logs = localStorage.getItem('treePlantingLogs');
    if (logs) {
      const treeLogs = JSON.parse(logs);
      this.totalTreesPlanted = treeLogs.reduce((total: number, log: any) => total + log.count, 0);
    }
  }

  onTreesLogged(total: number) {
    this.totalTreesPlanted = total;
  }
}
