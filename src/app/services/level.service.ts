import { Injectable } from '@angular/core';

export interface Level {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  icon: string;
  color: string;
  description: string;
}

export interface Activity {
  action: string;
  xp: number;
  greenPoints: number;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private levels: Level[] = [
    {
      level: 1,
      name: 'Rookie',
      minXP: 0,
      maxXP: 499,
      icon: '🌱',
      color: '#81C784',
      description: 'Just starting your green journey'
    },
    {
      level: 2,
      name: 'Helper',
      minXP: 500,
      maxXP: 1499,
      icon: '🌿',
      color: '#66BB6A',
      description: 'Making a positive impact'
    },
    {
      level: 3,
      name: 'Warrior',
      minXP: 1500,
      maxXP: 3499,
      icon: '🌳',
      color: '#4CAF50',
      description: 'Fighting for the environment'
    },
    {
      level: 4,
      name: 'Guardian',
      minXP: 3500,
      maxXP: 6999,
      icon: '🛡️',
      color: '#43A047',
      description: 'Protecting our planet'
    },
    {
      level: 5,
      name: 'Champion',
      minXP: 7000,
      maxXP: Infinity,
      icon: '👑',
      color: '#2E7D32',
      description: 'Environmental hero and leader'
    }
  ];

  // XP and Green Points distribution for different activities
  // XP = Experience (only increases, determines level)
  // Green Points = Currency (can be spent on rewards)
  private activities: Activity[] = [
    // Community Activities
    { action: 'Join Community', xp: 100, greenPoints: 100, category: 'community' },
    { action: 'Create Post', xp: 25, greenPoints: 25, category: 'community' },
    { action: 'Comment on Post', xp: 10, greenPoints: 10, category: 'community' },
    { action: 'Like Post', xp: 5, greenPoints: 5, category: 'community' },
    { action: 'Share Post', xp: 15, greenPoints: 15, category: 'community' },
    
    // Training Activities
    { action: 'Enroll in Training', xp: 50, greenPoints: 50, category: 'training' },
    { action: 'Complete Training Module', xp: 100, greenPoints: 100, category: 'training' },
    { action: 'Complete Full Training', xp: 200, greenPoints: 200, category: 'training' },
    { action: 'Pass Training Quiz', xp: 75, greenPoints: 75, category: 'training' },
    
    // Event Activities
    { action: 'Join Event', xp: 75, greenPoints: 75, category: 'event' },
    { action: 'Attend Event', xp: 150, greenPoints: 150, category: 'event' },
    { action: 'Organize Event', xp: 300, greenPoints: 300, category: 'event' },
    { action: 'Volunteer at Event', xp: 200, greenPoints: 200, category: 'event' },
    
    // Environmental Actions
    { action: 'Plant Tree', xp: 100, greenPoints: 100, category: 'action' },
    { action: 'Recycle Item', xp: 20, greenPoints: 20, category: 'action' },
    { action: 'Clean Beach/River', xp: 150, greenPoints: 150, category: 'action' },
    { action: 'Reduce Plastic Use', xp: 50, greenPoints: 50, category: 'action' },
    { action: 'Use Public Transport', xp: 30, greenPoints: 30, category: 'action' },
    { action: 'Save Water', xp: 40, greenPoints: 40, category: 'action' },
    { action: 'Save Energy', xp: 40, greenPoints: 40, category: 'action' },
    
    // Achievements
    { action: 'Unlock Achievement', xp: 100, greenPoints: 100, category: 'achievement' },
    { action: 'Complete Challenge', xp: 250, greenPoints: 250, category: 'achievement' },
    { action: 'Reach Milestone', xp: 500, greenPoints: 500, category: 'achievement' },
    
    // Social Activities
    { action: 'Invite Friend', xp: 50, greenPoints: 50, category: 'social' },
    { action: 'Friend Joins', xp: 100, greenPoints: 100, category: 'social' },
    { action: 'Daily Login', xp: 10, greenPoints: 10, category: 'social' },
    { action: 'Weekly Streak', xp: 50, greenPoints: 50, category: 'social' },
    { action: 'Monthly Streak', xp: 200, greenPoints: 200, category: 'social' }
  ];

  constructor() {}

  /**
   * Get all levels
   */
  getLevels(): Level[] {
    return this.levels;
  }

  /**
   * Get level information based on XP
   */
  getLevelByXP(xp: number): Level {
    for (const level of this.levels) {
      if (xp >= level.minXP && xp <= level.maxXP) {
        return level;
      }
    }
    return this.levels[0]; // Default to Rookie
  }

  /**
   * Get next level information
   */
  getNextLevel(currentXP: number): Level | null {
    const currentLevel = this.getLevelByXP(currentXP);
    const nextLevelIndex = this.levels.findIndex(l => l.level === currentLevel.level) + 1;
    
    if (nextLevelIndex < this.levels.length) {
      return this.levels[nextLevelIndex];
    }
    return null; // Already at max level
  }

  /**
   * Calculate progress to next level (0-100)
   */
  getProgressToNextLevel(currentXP: number): number {
    const currentLevel = this.getLevelByXP(currentXP);
    const nextLevel = this.getNextLevel(currentXP);
    
    if (!nextLevel) {
      return 100; // Max level reached
    }
    
    const xpInCurrentLevel = currentXP - currentLevel.minXP;
    const xpNeededForNextLevel = nextLevel.minXP - currentLevel.minXP;
    
    return Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNextLevel) * 100));
  }

  /**
   * Get XP needed for next level
   */
  getXPToNextLevel(currentXP: number): number {
    const nextLevel = this.getNextLevel(currentXP);
    
    if (!nextLevel) {
      return 0; // Max level reached
    }
    
    return nextLevel.minXP - currentXP;
  }

  /**
   * Get all activities
   */
  getActivities(): Activity[] {
    return this.activities;
  }

  /**
   * Get activity by action name
   */
  getActivity(action: string): Activity | undefined {
    return this.activities.find(a => a.action === action);
  }

  /**
   * Get activities by category
   */
  getActivitiesByCategory(category: string): Activity[] {
    return this.activities.filter(a => a.category === category);
  }

  /**
   * Check if user leveled up
   */
  checkLevelUp(oldXP: number, newXP: number): { leveledUp: boolean; newLevel?: Level; oldLevel?: Level } {
    const oldLevel = this.getLevelByXP(oldXP);
    const newLevel = this.getLevelByXP(newXP);
    
    if (newLevel.level > oldLevel.level) {
      return {
        leveledUp: true,
        newLevel: newLevel,
        oldLevel: oldLevel
      };
    }
    
    return { leveledUp: false };
  }

  /**
   * Get level badge HTML/styling info
   */
  getLevelBadgeInfo(xp: number): { level: Level; progress: number; xpToNext: number } {
    const level = this.getLevelByXP(xp);
    const progress = this.getProgressToNextLevel(xp);
    const xpToNext = this.getXPToNextLevel(xp);
    
    return {
      level,
      progress,
      xpToNext
    };
  }

  /**
   * Calculate estimated time to next level based on average daily XP
   */
  estimateTimeToNextLevel(currentXP: number, averageDailyXP: number): string {
    const xpNeeded = this.getXPToNextLevel(currentXP);
    
    if (xpNeeded === 0) {
      return 'Max level reached!';
    }
    
    if (averageDailyXP <= 0) {
      return 'Keep earning XP!';
    }
    
    const daysNeeded = Math.ceil(xpNeeded / averageDailyXP);
    
    if (daysNeeded === 1) {
      return '1 day';
    } else if (daysNeeded < 7) {
      return `${daysNeeded} days`;
    } else if (daysNeeded < 30) {
      const weeks = Math.ceil(daysNeeded / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      const months = Math.ceil(daysNeeded / 30);
      return `${months} month${months > 1 ? 's' : ''}`;
    }
  }
}
