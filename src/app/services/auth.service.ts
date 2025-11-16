import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    {
      username: 'greenuser',
      email: 'user@justgogreen.com',
      password: 'green123',
      firstName: 'Green',
      lastName: 'User'
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
      return true;
    }
    return false;
  }

  signup(username: string, email: string, password: string, firstName: string, lastName: string): boolean {
    // Check if user already exists
    const existingUser = this.users.find(u => u.email === email || u.username === username);
    if (existingUser) {
      return false;
    }

    const newUser: User = { username, email, password, firstName, lastName };
    this.users.push(newUser);
    this.currentUser = newUser;
    this.isAuthenticated = true;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
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
