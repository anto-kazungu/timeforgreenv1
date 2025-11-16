import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { LevelService, Level } from './level.service';

export interface LevelUpEvent {
  oldLevel: Level;
  newLevel: Level;
  currentXP: number;
}

@Injectable({
  providedIn: 'root'
})
export class XPService {
  private xpSubject = new BehaviorSubject<number>(850);
  xp$ = this.xpSubject.asObservable();
  
  private levelUpSubject = new Subject<LevelUpEvent>();
  levelUp$ = this.levelUpSubject.asObservable();

  constructor(private levelService: LevelService) {
    const savedXP = localStorage.getItem('userXP');
    if (savedXP) {
      this.xpSubject.next(parseInt(savedXP));
    }
  }

  getXP(): number {
    return this.xpSubject.value;
  }

  /**
   * Add XP (experience points) - only increases, never decreases
   */
  addXP(amount: number, reason: string): void {
    const currentXP = this.xpSubject.value;
    const newXP = currentXP + amount;
    
    // Check for level up
    const levelUpCheck = this.levelService.checkLevelUp(currentXP, newXP);
    
    this.xpSubject.next(newXP);
    localStorage.setItem('userXP', newXP.toString());
    this.logActivity(reason, amount);
    
    // Emit level up event if applicable
    if (levelUpCheck.leveledUp && levelUpCheck.newLevel && levelUpCheck.oldLevel) {
      this.levelUpSubject.next({
        oldLevel: levelUpCheck.oldLevel,
        newLevel: levelUpCheck.newLevel,
        currentXP: newXP
      });
    }
  }
  
  getCurrentLevel(): Level {
    return this.levelService.getLevelByXP(this.xpSubject.value);
  }
  
  getLevelProgress(): number {
    return this.levelService.getProgressToNextLevel(this.xpSubject.value);
  }
  
  getXPToNextLevel(): number {
    return this.levelService.getXPToNextLevel(this.xpSubject.value);
  }
  
  getNextLevel(): Level | null {
    return this.levelService.getNextLevel(this.xpSubject.value);
  }

  private logActivity(reason: string, xp: number): void {
    console.log(`XP earned: ${xp} - ${reason}`);
  }
}
