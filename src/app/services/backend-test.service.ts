import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

/**
 * Service for testing backend API connection
 * This demonstrates how to use the ApiService
 */
@Injectable({
  providedIn: 'root'
})
export class BackendTestService {

  constructor(private apiService: ApiService) {}

  /**
   * Test if backend is running
   */
  testConnection(): Observable<any> {
    return this.apiService.testConnection();
  }

  /**
   * Example: Get all users
   */
  getUsers(): Observable<any[]> {
    return this.apiService.get<any[]>('/users');
  }

  /**
   * Example: Get user by ID
   */
  getUserById(id: number): Observable<any> {
    return this.apiService.get<any>(`/users/${id}`);
  }

  /**
   * Example: Create a new user
   */
  createUser(userData: any): Observable<any> {
    return this.apiService.post('/users', userData);
  }

  /**
   * Example: Log trees
   */
  logTrees(treeData: any): Observable<any> {
    return this.apiService.post('/tree-logs', treeData);
  }

  /**
   * Example: Get communities
   */
  getCommunities(): Observable<any[]> {
    return this.apiService.get<any[]>('/communities');
  }

  /**
   * Example: Join a community
   */
  joinCommunity(communityId: number, userId: number): Observable<any> {
    return this.apiService.post(`/communities/${communityId}/join`, { userId });
  }

  /**
   * Example: Get user statistics
   */
  getUserStats(userId: number): Observable<any> {
    return this.apiService.get<any>(`/users/${userId}/stats`);
  }

  /**
   * Example: Get all events
   */
  getEvents(): Observable<any[]> {
    return this.apiService.get<any[]>('/events');
  }

  /**
   * Example: Register for an event
   */
  registerForEvent(eventId: number, userId: number): Observable<any> {
    return this.apiService.post(`/events/${eventId}/register`, { userId });
  }

  /**
   * Example: Get trainings
   */
  getTrainings(): Observable<any[]> {
    return this.apiService.get<any[]>('/trainings');
  }

  /**
   * Example: Enroll in training
   */
  enrollInTraining(trainingId: number, userId: number): Observable<any> {
    return this.apiService.post(`/trainings/${trainingId}/enroll`, { userId });
  }

  /**
   * Example: Get user achievements
   */
  getUserAchievements(userId: number): Observable<any[]> {
    return this.apiService.get<any[]>(`/achievements/user/${userId}`);
  }
}
