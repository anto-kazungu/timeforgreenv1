import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User, UserRole } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { CommunityService } from '../../../services/community.service';

interface SystemStats {
  totalUsers: number;
  activeUsers: number;
  totalCommunities: number;
  totalPosts: number;
  totalDonations: number;
  totalTrainings: number;
}

interface UserManagement extends User {
  status: 'active' | 'suspended';
  joinedDate: Date;
  lastActive: Date;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  activeTab: 'overview' | 'users' | 'content' | 'reports' = 'overview';
  adminName = 'Admin';
  
  systemStats: SystemStats = {
    totalUsers: 0,
    activeUsers: 0,
    totalCommunities: 0,
    totalPosts: 0,
    totalDonations: 0,
    totalTrainings: 0
  };

  users: UserManagement[] = [];
  filteredUsers: UserManagement[] = [];
  selectedRole: UserRole | 'all' = 'all';
  searchQuery = '';

  recentActivities = [
    { type: 'user', action: 'New user registered', user: 'Sarah Green', time: '5m ago', icon: 'person_add' },
    { type: 'community', action: 'New community created', user: 'James Community', time: '15m ago', icon: 'public' },
    { type: 'post', action: 'Post reported', user: 'System', time: '1h ago', icon: 'warning' },
    { type: 'donation', action: 'Donation received', user: 'David Philanthropist', time: '2h ago', icon: 'payments' },
    { type: 'training', action: 'Training completed', user: 'Dr. Maria Educator', time: '3h ago', icon: 'school' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private postService: PostService,
    private communityService: CommunityService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.adminName = user.firstName;
      
      // Verify admin role
      if (user.role !== 'admin') {
        this.router.navigate([this.authService.getRoleDashboard()]);
        return;
      }
    }

    this.loadSystemStats();
    this.loadUsers();
  }

  private loadSystemStats() {
    // In a real app, these would come from backend APIs
    this.systemStats = {
      totalUsers: 247,
      activeUsers: 189,
      totalCommunities: this.communityService.getAllCommunities().length,
      totalPosts: this.postService.getAllPosts().length,
      totalDonations: 1250000,
      totalTrainings: 45
    };
  }

  private loadUsers() {
    // Mock user data - in real app, fetch from backend
    const mockUsers: UserManagement[] = [
      {
        id: 'user-1',
        username: 'sarah_green',
        email: 'sarah@example.com',
        password: '',
        firstName: 'Sarah',
        lastName: 'Green',
        role: 'member',
        status: 'active',
        joinedDate: new Date('2024-01-15'),
        lastActive: new Date('2024-11-18')
      },
      {
        id: 'user-2',
        username: 'james_org',
        email: 'james@example.com',
        password: '',
        firstName: 'James',
        lastName: 'Community',
        role: 'organizer',
        status: 'active',
        joinedDate: new Date('2024-02-20'),
        lastActive: new Date('2024-11-17')
      },
      {
        id: 'user-3',
        username: 'maria_mentor',
        email: 'maria@example.com',
        password: '',
        firstName: 'Maria',
        lastName: 'Educator',
        role: 'mentor',
        status: 'active',
        joinedDate: new Date('2024-03-10'),
        lastActive: new Date('2024-11-18')
      },
      {
        id: 'user-4',
        username: 'david_donor',
        email: 'david@example.com',
        password: '',
        firstName: 'David',
        lastName: 'Philanthropist',
        role: 'donor',
        status: 'active',
        joinedDate: new Date('2024-04-05'),
        lastActive: new Date('2024-11-16')
      }
    ];

    this.users = mockUsers;
    this.filteredUsers = mockUsers;
  }

  switchTab(tab: 'overview' | 'users' | 'content' | 'reports') {
    this.activeTab = tab;
  }

  filterUsersByRole(role: UserRole | 'all') {
    this.selectedRole = role;
    this.applyFilters();
  }

  searchUsers(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value.toLowerCase();
    this.applyFilters();
  }

  private applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesRole = this.selectedRole === 'all' || user.role === this.selectedRole;
      const matchesSearch = this.searchQuery === '' || 
        user.firstName.toLowerCase().includes(this.searchQuery) ||
        user.lastName.toLowerCase().includes(this.searchQuery) ||
        user.email.toLowerCase().includes(this.searchQuery) ||
        user.username.toLowerCase().includes(this.searchQuery);
      
      return matchesRole && matchesSearch;
    });
  }

  suspendUser(userId: string) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.status = user.status === 'active' ? 'suspended' : 'active';
      this.applyFilters();
    }
  }

  deleteUser(userId: string) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      this.users = this.users.filter(u => u.id !== userId);
      this.applyFilters();
    }
  }

  changeUserRole(userId: string, newRole: UserRole) {
    const user = this.users.find(u => u.id === userId);
    if (user) {
      user.role = newRole;
      this.applyFilters();
    }
  }

  getRoleBadgeClass(role: UserRole): string {
    const classes: Record<UserRole, string> = {
      member: 'role-member',
      organizer: 'role-organizer',
      mentor: 'role-mentor',
      donor: 'role-donor',
      admin: 'role-admin'
    };
    return classes[role];
  }

  getStatusBadgeClass(status: string): string {
    return status === 'active' ? 'status-active' : 'status-suspended';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  }

  navigateToClimateNews() {
    this.router.navigate(['/climate-news']);
  }

  logout() {
    this.authService.logout();
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }
}
