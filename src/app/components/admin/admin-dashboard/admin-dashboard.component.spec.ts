import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AuthService, User } from '../../../services/auth.service';
import { PostService } from '../../../services/post.service';
import { CommunityService } from '../../../services/community.service';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockPostService: jasmine.SpyObj<PostService>;
  let mockCommunityService: jasmine.SpyObj<CommunityService>;

  const mockAdminUser: User = {
    id: 'admin-1',
    username: 'admin',
    email: 'admin@test.com',
    password: 'test123',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin'
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAuthService = jasmine.createSpyObj('AuthService', ['getCurrentUser', 'getRoleDashboard', 'logout']);
    mockPostService = jasmine.createSpyObj('PostService', ['getAllPosts']);
    mockCommunityService = jasmine.createSpyObj('CommunityService', ['getCommunities']);

    mockAuthService.getCurrentUser.and.returnValue(mockAdminUser);
    mockPostService.getAllPosts.and.returnValue([]);
    mockCommunityService.getCommunities.and.returnValue([]);

    await TestBed.configureTestingModule({
      imports: [AdminDashboardComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: mockAuthService },
        { provide: PostService, useValue: mockPostService },
        { provide: CommunityService, useValue: mockCommunityService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with overview tab active', () => {
    expect(component.activeTab).toBe('overview');
  });

  it('should load admin name from current user', () => {
    expect(component.adminName).toBe('Admin');
  });

  it('should redirect non-admin users', () => {
    const nonAdminUser: User = { ...mockAdminUser, role: 'member' };
    mockAuthService.getCurrentUser.and.returnValue(nonAdminUser);
    mockAuthService.getRoleDashboard.and.returnValue('/dashboard');

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith('/dashboard');
  });

  describe('Tab Navigation', () => {
    it('should switch to users tab', () => {
      component.switchTab('users');
      expect(component.activeTab).toBe('users');
    });

    it('should switch to content tab', () => {
      component.switchTab('content');
      expect(component.activeTab).toBe('content');
    });

    it('should switch to reports tab', () => {
      component.switchTab('reports');
      expect(component.activeTab).toBe('reports');
    });
  });

  describe('User Management', () => {
    beforeEach(() => {
      component.users = [
        {
          id: 'user-1',
          username: 'test1',
          email: 'test1@test.com',
          password: '',
          firstName: 'Test',
          lastName: 'One',
          role: 'member',
          status: 'active',
          joinedDate: new Date(),
          lastActive: new Date()
        },
        {
          id: 'user-2',
          username: 'test2',
          email: 'test2@test.com',
          password: '',
          firstName: 'Test',
          lastName: 'Two',
          role: 'organizer',
          status: 'active',
          joinedDate: new Date(),
          lastActive: new Date()
        }
      ];
      component.filteredUsers = [...component.users];
    });

    it('should filter users by role', () => {
      component.filterUsersByRole('member');
      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].role).toBe('member');
    });

    it('should show all users when filter is "all"', () => {
      component.filterUsersByRole('all');
      expect(component.filteredUsers.length).toBe(2);
    });

    it('should search users by name', () => {
      const event = { target: { value: 'Test One' } } as any;
      component.searchUsers(event);
      expect(component.filteredUsers.length).toBe(1);
      expect(component.filteredUsers[0].firstName).toBe('Test');
    });

    it('should suspend user', () => {
      component.suspendUser('user-1');
      const user = component.users.find(u => u.id === 'user-1');
      expect(user?.status).toBe('suspended');
    });

    it('should activate suspended user', () => {
      component.users[0].status = 'suspended';
      component.suspendUser('user-1');
      const user = component.users.find(u => u.id === 'user-1');
      expect(user?.status).toBe('active');
    });

    it('should delete user after confirmation', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      component.deleteUser('user-1');
      expect(component.users.length).toBe(1);
      expect(component.users.find(u => u.id === 'user-1')).toBeUndefined();
    });

    it('should not delete user if not confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      component.deleteUser('user-1');
      expect(component.users.length).toBe(2);
    });

    it('should change user role', () => {
      component.changeUserRole('user-1', 'mentor');
      const user = component.users.find(u => u.id === 'user-1');
      expect(user?.role).toBe('mentor');
    });
  });

  describe('Helper Methods', () => {
    it('should return correct role badge class', () => {
      expect(component.getRoleBadgeClass('member')).toBe('role-member');
      expect(component.getRoleBadgeClass('admin')).toBe('role-admin');
    });

    it('should return correct status badge class', () => {
      expect(component.getStatusBadgeClass('active')).toBe('status-active');
      expect(component.getStatusBadgeClass('suspended')).toBe('status-suspended');
    });

    it('should format date correctly', () => {
      const date = new Date('2024-01-15');
      const formatted = component.formatDate(date);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });

    it('should calculate time ago correctly', () => {
      const today = new Date();
      expect(component.getTimeAgo(today)).toBe('Today');

      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
      expect(component.getTimeAgo(yesterday)).toBe('Yesterday');
    });
  });

  describe('Navigation', () => {
    it('should navigate to profile', () => {
      component.goToProfile();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/profile-settings']);
    });

    it('should logout', () => {
      component.logout();
      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });

  describe('System Stats', () => {
    it('should load system stats on init', () => {
      expect(component.systemStats).toBeDefined();
      expect(component.systemStats.totalUsers).toBeGreaterThan(0);
    });

    it('should have recent activities', () => {
      expect(component.recentActivities).toBeDefined();
      expect(component.recentActivities.length).toBeGreaterThan(0);
    });
  });
});
