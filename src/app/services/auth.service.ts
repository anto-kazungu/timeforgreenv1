import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'member' | 'organizer' | 'mentor' | 'donor' | 'admin';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  bio?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    // Member Test User
    {
      id: 'user-member',
      username: 'member',
      email: 'member@justgogreen.com',
      password: 'member123',
      firstName: 'Sarah',
      lastName: 'Green',
      role: 'member',
      bio: 'Passionate about environmental conservation and sustainable living.'
    },
    // Organizer Test User
    {
      id: 'user-organizer',
      username: 'organizer',
      email: 'organizer@justgogreen.com',
      password: 'organizer123',
      firstName: 'James',
      lastName: 'Community',
      role: 'organizer',
      bio: 'Community organizer dedicated to bringing people together for environmental action.'
    },
    // Mentor Test User
    {
      id: 'user-mentor',
      username: 'mentor',
      email: 'mentor@justgogreen.com',
      password: 'mentor123',
      firstName: 'Dr. Maria',
      lastName: 'Educator',
      role: 'mentor',
      bio: 'Environmental scientist and educator with 15 years of experience in sustainability.'
    },
    // Donor Test User
    {
      id: 'user-donor',
      username: 'donor',
      email: 'donor@justgogreen.com',
      password: 'donor123',
      firstName: 'David',
      lastName: 'Philanthropist',
      role: 'donor',
      bio: 'Supporting environmental initiatives through funding and resources.'
    },
    // Admin Test User
    {
      id: 'user-admin',
      username: 'admin',
      email: 'admin@justgogreen.com',
      password: 'admin123',
      firstName: 'Admin',
      lastName: 'System',
      role: 'admin',
      bio: 'Platform administrator managing the Just Go Green ecosystem.'
    }
  ];

  private currentUser: User | null = null;
  private isAuthenticated = false;

  constructor(private router: Router) {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
      this.isAuthenticated = true;
    }
  }

  login(emailOrUsername: string, password: string): boolean {
    const user = this.users.find(
      u => (u.email === emailOrUsername || u.username === emailOrUsername) && u.password === password
    );

    if (user) {
      this.currentUser = user;
      this.isAuthenticated = true;
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect based on role
      this.redirectByRole(user.role);
      return true;
    }
    return false;
  }

  private redirectByRole(role: UserRole): void {
    switch (role) {
      case 'member':
        this.router.navigate(['/dashboard']);
        break;
      case 'organizer':
        this.router.navigate(['/organizer']);
        break;
      case 'mentor':
        this.router.navigate(['/mentor']);
        break;
      case 'donor':
        this.router.navigate(['/donor']);
        break;
      case 'admin':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/dashboard']);
    }
  }

  signup(username: string, email: string, password: string, firstName: string, lastName: string, role: UserRole = 'member'): boolean {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return false;
    }

    const newUser: User = { 
      id: `user-${Date.now()}`, 
      username, 
      email, 
      password, 
      firstName, 
      lastName, 
      role 
    };
    this.users.push(newUser);
    this.currentUser = newUser;
    this.isAuthenticated = true;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  }

  getUserRole(): UserRole | null {
    return this.currentUser?.role || null;
  }

  hasRole(role: UserRole): boolean {
    return this.currentUser?.role === role;
  }

  canAccessRoute(requiredRole: UserRole): boolean {
    if (!this.isAuthenticated || !this.currentUser) {
      return false;
    }
    return this.currentUser.role === requiredRole;
  }

  getRoleDashboard(): string {
    const role = this.getUserRole();
    switch (role) {
      case 'organizer':
        return '/organizer';
      case 'mentor':
        return '/mentor';
      case 'donor':
        return '/donor';
      case 'admin':
        return '/admin';
      default:
        return '/dashboard';
    }
  }

  logout(): void {
    this.currentUser = null;
    this.isAuthenticated = false;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/welcome']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
