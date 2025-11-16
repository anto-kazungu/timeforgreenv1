import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  private pointsSubject = new BehaviorSubject<number>(850);
  points$ = this.pointsSubject.asObservable();

  constructor() {
    const savedPoints = localStorage.getItem('greenPoints');
    if (savedPoints) {
      this.pointsSubject.next(parseInt(savedPoints));
    }
  }

  getPoints(): number {
    return this.pointsSubject.value;
  }

  addPoints(amount: number, reason: string): void {
    const currentPoints = this.pointsSubject.value;
    const newPoints = currentPoints + amount;
    this.pointsSubject.next(newPoints);
    localStorage.setItem('greenPoints', newPoints.toString());
    this.logActivity(reason, amount);
  }

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
    console.log(`Points ${points > 0 ? 'earned' : 'spent'}: ${Math.abs(points)} - ${reason}`);
  }
}
