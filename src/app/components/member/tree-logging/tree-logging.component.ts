import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PointsService } from '../../../services/points.service';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

interface TreeLog {
  id: string;
  count: number;
  location: string;
  species?: string;
  notes?: string;
  code: string;
  date: Date;
  points: number;
}

@Component({
  selector: 'app-tree-logging',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-logging.component.html',
  styleUrl: './tree-logging.component.css'
})
export class TreeLoggingComponent implements OnInit {
  logs: TreeLog[] = [];
  filteredLogs: TreeLog[] = [];
  searchQuery = '';
  showLogForm = false;
  totalTrees = 0;
  totalPoints = 0;

  newLog = {
    count: 1,
    location: '',
    species: '',
    notes: ''
  };

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private pointsService: PointsService
  ) {}

  ngOnInit() {
    this.loadLogs();
    this.calculateTotals();
  }

  loadLogs() {
    const savedLogs = localStorage.getItem('treeLogs');
    if (savedLogs) {
      this.logs = JSON.parse(savedLogs).map((log: any) => ({
        ...log,
        date: new Date(log.date)
      }));
      this.filteredLogs = [...this.logs];
    }
  }

  logTrees() {
    if (!this.newLog.count || !this.newLog.location) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Missing Information',
          message: 'Please fill in the required fields (number of trees and location).',
          type: 'warning'
        }
      });
      return;
    }

    const points = this.newLog.count * 5; // 5 points per tree
    const xp = this.newLog.count * 10; // 10 XP per tree

    const log: TreeLog = {
      id: this.generateId(),
      count: this.newLog.count,
      location: this.newLog.location,
      species: this.newLog.species || undefined,
      notes: this.newLog.notes || undefined,
      code: this.generateTreeCode(),
      date: new Date(),
      points: points
    };

    this.logs.unshift(log);
    this.filteredLogs = [...this.logs];
    this.saveLogs();
    this.calculateTotals();

    // Award points
    this.pointsService.addPoints(points, `Logged ${this.newLog.count} trees`);

    // Reset form
    this.newLog = {
      count: 1,
      location: '',
      species: '',
      notes: ''
    };
    this.showLogForm = false;

    // Show success dialog
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Success!',
        message: `Successfully logged ${log.count} ${log.count === 1 ? 'tree' : 'trees'}! You earned ${points} Green Points and ${xp} XP.`,
        type: 'success'
      }
    });
  }

  filterLogs() {
    if (!this.searchQuery.trim()) {
      this.filteredLogs = [...this.logs];
      return;
    }

    const query = this.searchQuery.toLowerCase();
    this.filteredLogs = this.logs.filter(log => 
      log.location.toLowerCase().includes(query) ||
      log.species?.toLowerCase().includes(query) ||
      log.code.toLowerCase().includes(query)
    );
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterLogs();
  }

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Copied!',
          message: `Tree code "${code}" has been copied to your clipboard.`,
          type: 'success'
        }
      });
    });
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  }

  private saveLogs() {
    localStorage.setItem('treeLogs', JSON.stringify(this.logs));
  }

  private calculateTotals() {
    this.totalTrees = this.logs.reduce((sum, log) => sum + log.count, 0);
    this.totalPoints = this.logs.reduce((sum, log) => sum + log.points, 0);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private generateTreeCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'TREE-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
