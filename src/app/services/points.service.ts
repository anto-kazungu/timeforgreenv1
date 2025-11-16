import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { XPService } from './xp.service';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private pointsSubject = new BehaviorSubject<number>(850);
  points$ = this.pointsSubject.asObservable();

  constructor(private xpService: XPService) {
    const savedPoints = localStorage.getItem('greenPoints');
    if (savedPoints) {
      this.pointsSubject.next(parseInt(savedPoints));
    }
  }

  getPoints(): number {
    return this.pointsSubject.value;
  }

  /**
   * Add both XP and Green Points for an activity
   */
  addPoints(amount: number, reason: string, xpAmount?: number): void {
    const currentPoints = this.pointsSubject.value;
    const newPoints = currentPoints + amount;
    
    this.pointsSubject.next(newPoints);
    localStorage.setItem('greenPoints', newPoints.toString());
    this.logActivity(reason, amount);
    
    // Also add XP (use same amount if not specified)
    const xp = xpAmount !== undefined ? xpAmount : amount;
    this.xpService.addXP(xp, reason);
  }

  /**
   * Deduct Green Points (for rewards) - does NOT affect XP or level
   */
  deductPoints(amount: number, reason: string): boolean {
    const currentPoints = this.pointsSubject.value;
    if (currentPoints >= amount) {
      const newPoints = currentPoints - amount;
      this.pointsSubject.next(newPoints);
      localStorage.setItem('greenPoints', newPoints.toString());
      this.logActivity(reason, -amount);
      return true;
    }
    return false;
  }

  private logActivity(reason: string, points: number): void {
    console.log(`Green Points ${points > 0 ? 'earned' : 'spent'}: ${Math.abs(points)} - ${reason}`);
  }
}
