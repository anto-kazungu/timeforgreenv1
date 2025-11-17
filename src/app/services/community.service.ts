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
  organizerId?: string;
  isPrivate?: boolean;
  location?: string;
  contactEmail?: string;
  website?: string;
  joinRequests?: JoinRequest[];
  fundingProjects?: FundingProject[];
}

export interface Feed {
  id: string;
  author: string;
  authorId: string;
  content: string;
  timestamp: Date;
  likes: number;
  image?: string;
  liked?: boolean;
  isUpdate?: boolean; // Organizer updates vs regular posts
}

export interface JoinRequest {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  message?: string;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface FundingProject {
  id: string;
  communityId: string;
  communityName: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'active' | 'funded' | 'completed' | 'rejected';
  organizerId: string;
  organizerName: string;
  images?: string[];
  updates?: string[];
  gradient: string;
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
          authorId: 'user-member',
          content: 'Great turnout at today\'s recycling workshop! Over 50 students participated.',
          timestamp: new Date('2024-11-15T10:30:00'),
          likes: 23
        },
        {
          id: 'f2',
          author: 'Jane Smith',
          authorId: 'user-member',
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
          authorId: 'user-member',
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
          authorId: 'user-member',
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
          authorId: 'user-member',
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
    // Load communities from localStorage
    this.loadFromStorage();
    
    // Load user communities from localStorage
    const saved = localStorage.getItem('userCommunities');
    if (saved) {
      this.userCommunities = JSON.parse(saved);
    }
  }

  private loadFromStorage(): void {
    const saved = localStorage.getItem('allCommunities');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Convert date strings back to Date objects
      this.availableCommunities = parsed.map((c: any) => ({
        ...c,
        dateCreated: new Date(c.dateCreated),
        feeds: c.feeds.map((f: any) => ({
          ...f,
          timestamp: new Date(f.timestamp)
        }))
      }));
    } else {
      // Save initial data to localStorage
      this.saveAllCommunities();
    }
  }

  private saveAllCommunities(): void {
    localStorage.setItem('allCommunities', JSON.stringify(this.availableCommunities));
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

  // Organizer methods
  createCommunity(community: Omit<Community, 'id' | 'members' | 'dateCreated' | 'feeds'>): Community {
    const newCommunity: Community = {
      ...community,
      id: this.generateId(),
      members: 0,
      dateCreated: new Date(),
      feeds: []
    };

    this.availableCommunities.push(newCommunity);
    this.saveAllCommunities();
    return newCommunity;
  }

  updateCommunity(id: string, updates: Partial<Community>): boolean {
    const index = this.availableCommunities.findIndex(c => c.id === id);
    if (index > -1) {
      this.availableCommunities[index] = {
        ...this.availableCommunities[index],
        ...updates,
        id: this.availableCommunities[index].id, // Preserve ID
        dateCreated: this.availableCommunities[index].dateCreated // Preserve creation date
      };
      this.saveAllCommunities();
      return true;
    }
    return false;
  }

  deleteCommunity(id: string): boolean {
    const index = this.availableCommunities.findIndex(c => c.id === id);
    if (index > -1) {
      this.availableCommunities.splice(index, 1);
      this.saveAllCommunities();
      
      // Remove from user communities if they were members
      const userIndex = this.userCommunities.indexOf(id);
      if (userIndex > -1) {
        this.userCommunities.splice(userIndex, 1);
        this.saveUserCommunities();
      }
      return true;
    }
    return false;
  }

  getCommunitiesByOrganizer(organizerId: string): Community[] {
    return this.availableCommunities.filter(c => c.organizerId === organizerId);
  }

  // Post/Feed methods
  addPost(communityId: string, post: Omit<Feed, 'id' | 'timestamp' | 'likes'>): Feed | null {
    const community = this.getCommunityById(communityId);
    if (community) {
      const newPost: Feed = {
        ...post,
        id: this.generateId(),
        timestamp: new Date(),
        likes: 0,
        liked: false
      };
      community.feeds.unshift(newPost); // Add to beginning
      this.saveAllCommunities();
      return newPost;
    }
    return null;
  }

  deletePost(communityId: string, postId: string): boolean {
    const community = this.getCommunityById(communityId);
    if (community) {
      const index = community.feeds.findIndex(f => f.id === postId);
      if (index > -1) {
        community.feeds.splice(index, 1);
        this.saveAllCommunities();
        return true;
      }
    }
    return false;
  }

  likePost(communityId: string, postId: string): boolean {
    const community = this.getCommunityById(communityId);
    if (community) {
      const post = community.feeds.find(f => f.id === postId);
      if (post) {
        if (post.liked) {
          post.likes--;
          post.liked = false;
        } else {
          post.likes++;
          post.liked = true;
        }
        this.saveAllCommunities();
        return true;
      }
    }
    return false;
  }

  // Utility methods
  generateCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Check if code already exists
    if (this.availableCommunities.some(c => c.code === code)) {
      return this.generateCode(); // Recursive call if duplicate
    }
    return code;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  isCodeUnique(code: string): boolean {
    return !this.availableCommunities.some(c => c.code === code.toUpperCase());
  }

  // Join Request Methods (Task 1.3)
  requestToJoin(communityId: string, userId: string, userName: string, userEmail: string, message?: string): boolean {
    const community = this.getCommunityById(communityId);
    if (community && community.isPrivate) {
      if (!community.joinRequests) {
        community.joinRequests = [];
      }

      // Check if already requested
      if (community.joinRequests.some(r => r.userId === userId && r.status === 'pending')) {
        return false;
      }

      const request: JoinRequest = {
        id: this.generateId(),
        userId,
        userName,
        userEmail,
        message,
        requestDate: new Date(),
        status: 'pending'
      };

      community.joinRequests.push(request);
      this.saveAllCommunities();
      return true;
    }
    return false;
  }

  getPendingJoinRequests(communityId: string): JoinRequest[] {
    const community = this.getCommunityById(communityId);
    return community?.joinRequests?.filter(r => r.status === 'pending') || [];
  }

  approveJoinRequest(communityId: string, requestId: string, pointsService?: any): boolean {
    const community = this.getCommunityById(communityId);
    if (community && community.joinRequests) {
      const request = community.joinRequests.find(r => r.id === requestId);
      if (request && request.status === 'pending') {
        request.status = 'approved';
        
        // Add user to community
        if (!this.userCommunities.includes(communityId)) {
          this.userCommunities.push(communityId);
          community.members++;
          this.saveUserCommunities();
        }

        // Award points to organizer for approving
        if (pointsService) {
          pointsService.addPoints(50, 'Approved member join request');
        }

        this.saveAllCommunities();
        return true;
      }
    }
    return false;
  }

  rejectJoinRequest(communityId: string, requestId: string): boolean {
    const community = this.getCommunityById(communityId);
    if (community && community.joinRequests) {
      const request = community.joinRequests.find(r => r.id === requestId);
      if (request && request.status === 'pending') {
        request.status = 'rejected';
        this.saveAllCommunities();
        return true;
      }
    }
    return false;
  }

  // Funding Project Methods (Task 1.4 & Task 3)
  createFundingProject(project: Omit<FundingProject, 'id' | 'currentAmount' | 'status'>): FundingProject {
    const newProject: FundingProject = {
      ...project,
      id: this.generateId(),
      currentAmount: 0,
      status: 'pending'
    };

    const community = this.getCommunityById(project.communityId);
    if (community) {
      if (!community.fundingProjects) {
        community.fundingProjects = [];
      }
      community.fundingProjects.push(newProject);
      this.saveAllCommunities();
    }

    return newProject;
  }

  getAllFundingProjects(): FundingProject[] {
    const projects: FundingProject[] = [];
    this.availableCommunities.forEach(community => {
      if (community.fundingProjects) {
        projects.push(...community.fundingProjects);
      }
    });
    return projects;
  }

  getActiveFundingProjects(): FundingProject[] {
    return this.getAllFundingProjects().filter(p => p.status === 'active');
  }

  getFundingProjectById(projectId: string): FundingProject | undefined {
    for (const community of this.availableCommunities) {
      if (community.fundingProjects) {
        const project = community.fundingProjects.find(p => p.id === projectId);
        if (project) return project;
      }
    }
    return undefined;
  }

  updateFundingProject(projectId: string, updates: Partial<FundingProject>): boolean {
    for (const community of this.availableCommunities) {
      if (community.fundingProjects) {
        const index = community.fundingProjects.findIndex(p => p.id === projectId);
        if (index > -1) {
          community.fundingProjects[index] = {
            ...community.fundingProjects[index],
            ...updates
          };
          this.saveAllCommunities();
          return true;
        }
      }
    }
    return false;
  }

  approveFundingProject(projectId: string): boolean {
    return this.updateFundingProject(projectId, { status: 'active' });
  }

  fundProject(projectId: string, amount: number, donorId: string, pointsService?: any): boolean {
    const project = this.getFundingProjectById(projectId);
    if (project && project.status === 'active') {
      project.currentAmount += amount;

      if (project.currentAmount >= project.targetAmount) {
        project.status = 'funded';
      }

      // Award points to donor
      if (pointsService) {
        const pointsAwarded = Math.floor(amount / 10); // 1 point per $10
        pointsService.addPoints(pointsAwarded, `Donated $${amount} to ${project.title}`);
      }

      this.saveAllCommunities();
      return true;
    }
    return false;
  }

  // Organizer Update Posts (Task 1.2)
  postOrganizerUpdate(communityId: string, organizerId: string, organizerName: string, content: string, pointsService?: any): Feed | null {
    const community = this.getCommunityById(communityId);
    if (community && community.organizerId === organizerId) {
      const update: Feed = {
        id: this.generateId(),
        author: organizerName,
        authorId: organizerId,
        content,
        timestamp: new Date(),
        likes: 0,
        liked: false,
        isUpdate: true
      };

      community.feeds.unshift(update);

      // Award points to organizer for posting update
      if (pointsService) {
        pointsService.addPoints(25, 'Posted community update');
      }

      this.saveAllCommunities();
      return update;
    }
    return null;
  }
}
