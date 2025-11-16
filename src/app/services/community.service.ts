import { Injectable } from '@angular/core';

export interface Community {
  id: string;
  name: string;
  code: string;
  description: string;
  members: number;
  dateCreated: Date;
  category: string;
  gradient: string;
  feeds: Feed[];
}

export interface Feed {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  image?: string;
  liked?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private availableCommunities: Community[] = [
    {
      id: '1',
      name: 'Campus Eco',
      code: 'CAMPUS2024',
      description: 'University students working together for a greener campus environment.',
      members: 245,
      dateCreated: new Date('2024-01-15'),
      category: 'Education',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      feeds: [
        {
          id: 'f1',
          author: 'John Doe',
          content: 'Great turnout at today\'s recycling workshop! Over 50 students participated.',
          timestamp: new Date('2024-11-15T10:30:00'),
          likes: 23
        },
        {
          id: 'f2',
          author: 'Jane Smith',
          content: 'Reminder: Tree planting event this Saturday at 9 AM. Bring gloves!',
          timestamp: new Date('2024-11-14T15:20:00'),
          likes: 45
        }
      ]
    },
    {
      id: '2',
      name: 'Kazi Mtaani',
      code: 'KAZI2024',
      description: 'Community-based initiative for neighborhood cleanup and waste management.',
      members: 189,
      dateCreated: new Date('2024-02-20'),
      category: 'Community',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      feeds: [
        {
          id: 'f3',
          author: 'Peter Kamau',
          content: 'Successfully cleaned 3 streets today. Thank you to all volunteers!',
          timestamp: new Date('2024-11-16T12:00:00'),
          likes: 67
        }
      ]
    },
    {
      id: '3',
      name: 'Church Green',
      code: 'CHURCH2024',
      description: 'Faith-based environmental stewardship and community outreach programs.',
      members: 312,
      dateCreated: new Date('2024-03-10'),
      category: 'Faith',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      feeds: [
        {
          id: 'f4',
          author: 'Pastor Mary',
          content: 'Our community garden is thriving! Come visit after Sunday service.',
          timestamp: new Date('2024-11-15T08:00:00'),
          likes: 34
        }
      ]
    },
    {
      id: '4',
      name: 'Green Chances',
      code: 'GREEN2024',
      description: 'Youth-led movement promoting sustainable living and climate action.',
      members: 156,
      dateCreated: new Date('2024-04-05'),
      category: 'Youth',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      feeds: [
        {
          id: 'f5',
          author: 'Sarah Johnson',
          content: 'Join our webinar on climate change this Friday at 6 PM!',
          timestamp: new Date('2024-11-16T14:30:00'),
          likes: 28
        }
      ]
    },
    {
      id: '5',
      name: 'River Warriors',
      code: 'RIVER2024',
      description: 'Dedicated to protecting and restoring local rivers and water bodies.',
      members: 98,
      dateCreated: new Date('2024-05-12'),
      category: 'Conservation',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      feeds: []
    },
    {
      id: '6',
      name: 'Zero Waste Hub',
      code: 'ZERO2024',
      description: 'Promoting zero waste lifestyle through education and practical solutions.',
      members: 203,
      dateCreated: new Date('2024-06-01'),
      category: 'Lifestyle',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      feeds: []
    }
  ];

  private userCommunities: string[] = [];

  constructor() {
    // Load user communities from localStorage
    const saved = localStorage.getItem('userCommunities');
    if (saved) {
      this.userCommunities = JSON.parse(saved);
    }
  }

  getAllCommunities(): Community[] {
    return this.availableCommunities;
  }

  getUserCommunities(): Community[] {
    return this.availableCommunities.filter(c => this.userCommunities.includes(c.id));
  }

  getCommunityById(id: string): Community | undefined {
    return this.availableCommunities.find(c => c.id === id);
  }

  joinCommunity(code: string, pointsService?: any): { success: boolean; message: string; community?: Community } {
    const community = this.availableCommunities.find(c => c.code === code.toUpperCase());
    
    if (!community) {
      return { success: false, message: 'Invalid community code' };
    }

    if (this.userCommunities.includes(community.id)) {
      return { success: false, message: 'You are already a member of this community' };
    }

    this.userCommunities.push(community.id);
    community.members++;
    this.saveUserCommunities();
    
    // Award points for joining community
    if (pointsService) {
      pointsService.addPoints(100, `Joined ${community.name}`);
    }
    
    return { success: true, message: 'Successfully joined community!', community };
  }

  leaveCommunity(communityId: string): boolean {
    const index = this.userCommunities.indexOf(communityId);
    if (index > -1) {
      this.userCommunities.splice(index, 1);
      const community = this.getCommunityById(communityId);
      if (community && community.members > 0) {
        community.members--;
      }
      this.saveUserCommunities();
      return true;
    }
    return false;
  }

  isUserMember(communityId: string): boolean {
    return this.userCommunities.includes(communityId);
  }

  private saveUserCommunities(): void {
    localStorage.setItem('userCommunities', JSON.stringify(this.userCommunities));
  }
}
