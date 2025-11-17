import { Injectable } from '@angular/core';
import { UserRole } from './auth.service';

export interface RoleReward {
  id: string;
  role: UserRole;
  title: string;
  description: string;
  pointsCost: number;
  icon: string;
  category: string;
  isUnlocked?: boolean;
}

export interface RoleLevel {
  level: number;
  name: string;
  xpRequired: number;
  icon: string;
  color: string;
  benefits: string[];
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class RewardsLevelsService {
  
  // Task 4: Role-specific rewards
  private roleRewards: RoleReward[] = [
    // Organizer Rewards
    {
      id: 'org-1',
      role: 'organizer',
      title: 'Community Builder Badge',
      description: 'Recognition badge for creating your first community',
      pointsCost: 500,
      icon: 'workspace_premium',
      category: 'Badge'
    },
    {
      id: 'org-2',
      role: 'organizer',
      title: 'Event Planning Kit',
      description: 'Digital toolkit with templates for organizing community events',
      pointsCost: 1000,
      icon: 'event_note',
      category: 'Tool'
    },
    {
      id: 'org-3',
      role: 'organizer',
      title: 'Leadership Certificate',
      description: 'Official certificate recognizing your community leadership',
      pointsCost: 2000,
      icon: 'card_membership',
      category: 'Certificate'
    },
    {
      id: 'org-4',
      role: 'organizer',
      title: 'Premium Community Features',
      description: 'Unlock advanced analytics and management tools',
      pointsCost: 3000,
      icon: 'auto_awesome',
      category: 'Feature'
    },
    {
      id: 'org-5',
      role: 'organizer',
      title: 'Networking Event Pass',
      description: 'Free pass to exclusive organizer networking events',
      pointsCost: 1500,
      icon: 'groups',
      category: 'Event'
    },

    // Mentor Rewards
    {
      id: 'men-1',
      role: 'mentor',
      title: 'Educator Badge',
      description: 'Recognition for creating your first training course',
      pointsCost: 500,
      icon: 'school',
      category: 'Badge'
    },
    {
      id: 'men-2',
      role: 'mentor',
      title: 'Course Creation Toolkit',
      description: 'Advanced tools for creating engaging course content',
      pointsCost: 1200,
      icon: 'video_library',
      category: 'Tool'
    },
    {
      id: 'men-3',
      role: 'mentor',
      title: 'Master Educator Certificate',
      description: 'Official certification as a master environmental educator',
      pointsCost: 2500,
      icon: 'verified',
      category: 'Certificate'
    },
    {
      id: 'men-4',
      role: 'mentor',
      title: 'Live Session Credits',
      description: '10 hours of premium video conferencing for live sessions',
      pointsCost: 1800,
      icon: 'video_call',
      category: 'Service'
    },
    {
      id: 'men-5',
      role: 'mentor',
      title: 'Mentorship Excellence Award',
      description: 'Prestigious award for outstanding mentorship',
      pointsCost: 3500,
      icon: 'emoji_events',
      category: 'Award'
    },

    // Donor Rewards
    {
      id: 'don-1',
      role: 'donor',
      title: 'Philanthropist Badge',
      description: 'Recognition for your first donation',
      pointsCost: 500,
      icon: 'volunteer_activism',
      category: 'Badge'
    },
    {
      id: 'don-2',
      role: 'donor',
      title: 'Impact Report Premium',
      description: 'Detailed quarterly impact reports with photos and updates',
      pointsCost: 1000,
      icon: 'analytics',
      category: 'Report'
    },
    {
      id: 'don-3',
      role: 'donor',
      title: 'Donor Recognition Plaque',
      description: 'Physical plaque recognizing your contributions',
      pointsCost: 2000,
      icon: 'military_tech',
      category: 'Physical'
    },
    {
      id: 'don-4',
      role: 'donor',
      title: 'Project Naming Rights',
      description: 'Name a funded project in your honor',
      pointsCost: 5000,
      icon: 'label',
      category: 'Recognition'
    },
    {
      id: 'don-5',
      role: 'donor',
      title: 'VIP Donor Status',
      description: 'Exclusive access to project sites and events',
      pointsCost: 3000,
      icon: 'stars',
      category: 'Status'
    },

    // Member Rewards (existing)
    {
      id: 'mem-1',
      role: 'member',
      title: 'Eco Warrior T-Shirt',
      description: 'Exclusive Just Go Green branded t-shirt',
      pointsCost: 500,
      icon: 'checkroom',
      category: 'Merchandise'
    },
    {
      id: 'mem-2',
      role: 'member',
      title: 'Reusable Water Bottle',
      description: 'Premium stainless steel water bottle',
      pointsCost: 800,
      icon: 'water_drop',
      category: 'Merchandise'
    },
    {
      id: 'mem-3',
      role: 'member',
      title: 'Tree Planting Certificate',
      description: 'Plant a tree in your name',
      pointsCost: 1000,
      icon: 'park',
      category: 'Impact'
    }
  ];

  // Task 5: Role-specific levels
  private roleLevels: { [key in UserRole]: RoleLevel[] } = {
    member: [
      { level: 1, name: 'Rookie', xpRequired: 0, icon: 'eco', color: '#4caf50', benefits: ['Join communities', 'Earn points'], role: 'member' },
      { level: 2, name: 'Enthusiast', xpRequired: 100, icon: 'local_florist', color: '#66bb6a', benefits: ['Create posts', 'Join events'], role: 'member' },
      { level: 3, name: 'Advocate', xpRequired: 300, icon: 'nature_people', color: '#81c784', benefits: ['Exclusive rewards', 'Priority support'], role: 'member' },
      { level: 4, name: 'Champion', xpRequired: 600, icon: 'emoji_events', color: '#a5d6a7', benefits: ['Leadership opportunities', 'Mentor access'], role: 'member' },
      { level: 5, name: 'Legend', xpRequired: 1000, icon: 'stars', color: '#c8e6c9', benefits: ['All features', 'VIP status'], role: 'member' }
    ],
    organizer: [
      { level: 1, name: 'Community Starter', xpRequired: 0, icon: 'group_add', color: '#00d084', benefits: ['Create 1 community', 'Basic tools'], role: 'organizer' },
      { level: 2, name: 'Community Builder', xpRequired: 200, icon: 'groups', color: '#00b870', benefits: ['Create 3 communities', 'Analytics'], role: 'organizer' },
      { level: 3, name: 'Community Leader', xpRequired: 500, icon: 'supervisor_account', color: '#00a060', benefits: ['Unlimited communities', 'Advanced tools'], role: 'organizer' },
      { level: 4, name: 'Community Expert', xpRequired: 1000, icon: 'workspace_premium', color: '#008850', benefits: ['Funding access', 'Priority support'], role: 'organizer' },
      { level: 5, name: 'Community Master', xpRequired: 2000, icon: 'military_tech', color: '#007040', benefits: ['All features', 'Mentorship program'], role: 'organizer' }
    ],
    mentor: [
      { level: 1, name: 'Instructor', xpRequired: 0, icon: 'school', color: '#667eea', benefits: ['Create 1 course', 'Basic content'], role: 'mentor' },
      { level: 2, name: 'Educator', xpRequired: 250, icon: 'menu_book', color: '#764ba2', benefits: ['Create 3 courses', 'Video hosting'], role: 'mentor' },
      { level: 3, name: 'Expert Trainer', xpRequired: 600, icon: 'psychology', color: '#8b5cf6', benefits: ['Unlimited courses', 'Live sessions'], role: 'mentor' },
      { level: 4, name: 'Master Educator', xpRequired: 1200, icon: 'verified', color: '#a78bfa', benefits: ['Certification program', 'Premium tools'], role: 'mentor' },
      { level: 5, name: 'Education Pioneer', xpRequired: 2500, icon: 'auto_awesome', color: '#c4b5fd', benefits: ['All features', 'Revenue sharing'], role: 'mentor' }
    ],
    donor: [
      { level: 1, name: 'Supporter', xpRequired: 0, icon: 'favorite', color: '#f093fb', benefits: ['Donate to projects', 'Basic reports'], role: 'donor' },
      { level: 2, name: 'Contributor', xpRequired: 300, icon: 'volunteer_activism', color: '#f5576c', benefits: ['Impact dashboard', 'Quarterly reports'], role: 'donor' },
      { level: 3, name: 'Benefactor', xpRequired: 700, icon: 'card_giftcard', color: '#ff6b9d', benefits: ['Project naming', 'Site visits'], role: 'donor' },
      { level: 4, name: 'Philanthropist', xpRequired: 1500, icon: 'diamond', color: '#ff8fab', benefits: ['VIP events', 'Direct impact'], role: 'donor' },
      { level: 5, name: 'Visionary', xpRequired: 3000, icon: 'stars', color: '#ffa3b9', benefits: ['All features', 'Legacy projects'], role: 'donor' }
    ],
    admin: [
      { level: 1, name: 'Admin', xpRequired: 0, icon: 'admin_panel_settings', color: '#ff5722', benefits: ['Full access'], role: 'admin' },
      { level: 2, name: 'Super Admin', xpRequired: 500, icon: 'security', color: '#f44336', benefits: ['All features'], role: 'admin' },
      { level: 3, name: 'System Master', xpRequired: 1000, icon: 'shield', color: '#e53935', benefits: ['Ultimate control'], role: 'admin' },
      { level: 4, name: 'Platform Guardian', xpRequired: 2000, icon: 'verified_user', color: '#d32f2f', benefits: ['Everything'], role: 'admin' },
      { level: 5, name: 'Architect', xpRequired: 5000, icon: 'engineering', color: '#c62828', benefits: ['God mode'], role: 'admin' }
    ]
  };

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedRewards = localStorage.getItem('roleRewards');
    if (savedRewards) {
      this.roleRewards = JSON.parse(savedRewards);
    } else {
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('roleRewards', JSON.stringify(this.roleRewards));
  }

  // Reward Methods
  getRewardsByRole(role: UserRole): RoleReward[] {
    return this.roleRewards.filter(r => r.role === role);
  }

  getAllRewards(): RoleReward[] {
    return this.roleRewards;
  }

  getRewardById(id: string): RoleReward | undefined {
    return this.roleRewards.find(r => r.id === id);
  }

  unlockReward(rewardId: string, userId: string): boolean {
    const reward = this.getRewardById(rewardId);
    if (reward) {
      reward.isUnlocked = true;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Level Methods
  getLevelsByRole(role: UserRole): RoleLevel[] {
    return this.roleLevels[role] || [];
  }

  getCurrentLevel(role: UserRole, xp: number): RoleLevel {
    const levels = this.getLevelsByRole(role);
    let currentLevel = levels[0];

    for (const level of levels) {
      if (xp >= level.xpRequired) {
        currentLevel = level;
      } else {
        break;
      }
    }

    return currentLevel;
  }

  getNextLevel(role: UserRole, currentLevel: number): RoleLevel | null {
    const levels = this.getLevelsByRole(role);
    return levels.find(l => l.level === currentLevel + 1) || null;
  }

  getXPToNextLevel(role: UserRole, currentXP: number): number {
    const currentLevel = this.getCurrentLevel(role, currentXP);
    const nextLevel = this.getNextLevel(role, currentLevel.level);
    
    if (nextLevel) {
      return nextLevel.xpRequired - currentXP;
    }
    return 0; // Max level reached
  }

  getLevelProgress(role: UserRole, currentXP: number): number {
    const currentLevel = this.getCurrentLevel(role, currentXP);
    const nextLevel = this.getNextLevel(role, currentLevel.level);

    if (!nextLevel) return 100; // Max level

    const xpInCurrentLevel = currentXP - currentLevel.xpRequired;
    const xpNeededForNextLevel = nextLevel.xpRequired - currentLevel.xpRequired;

    return Math.min((xpInCurrentLevel / xpNeededForNextLevel) * 100, 100);
  }

  // XP Award Calculations by Role
  calculateXPReward(role: UserRole, action: string): number {
    const xpRewards: { [key in UserRole]: { [action: string]: number } } = {
      member: {
        'join_community': 50,
        'create_post': 25,
        'like_post': 5,
        'attend_event': 100,
        'complete_training': 150
      },
      organizer: {
        'create_community': 200,
        'approve_member': 50,
        'post_update': 75,
        'create_funding_project': 150,
        'complete_project': 300
      },
      mentor: {
        'create_course': 250,
        'publish_course': 100,
        'student_completion': 150,
        'high_rating': 200,
        'live_session': 100
      },
      donor: {
        'first_donation': 100,
        'donate_100': 50,
        'donate_500': 150,
        'donate_1000': 300,
        'fund_project': 200
      },
      admin: {
        'moderate_content': 50,
        'resolve_issue': 100,
        'system_improvement': 200
      }
    };

    return xpRewards[role]?.[action] || 0;
  }

  // Points Award Calculations by Role
  calculatePointsReward(role: UserRole, action: string): number {
    const pointsRewards: { [key in UserRole]: { [action: string]: number } } = {
      member: {
        'join_community': 100,
        'create_post': 25,
        'like_post': 5,
        'attend_event': 150,
        'complete_training': 200
      },
      organizer: {
        'create_community': 300,
        'approve_member': 50,
        'post_update': 75,
        'create_funding_project': 200,
        'project_funded': 500
      },
      mentor: {
        'create_course': 300,
        'publish_course': 150,
        'student_completion': 100,
        'high_rating': 250,
        'live_session': 150
      },
      donor: {
        'donate_per_10': 1, // 1 point per $10 donated
        'fund_project': 300,
        'recurring_donation': 500
      },
      admin: {
        'moderate_content': 100,
        'resolve_issue': 150,
        'system_improvement': 300
      }
    };

    return pointsRewards[role]?.[action] || 0;
  }
}