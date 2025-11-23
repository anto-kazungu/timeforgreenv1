import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XPService } from '../../../services/xp.service';

interface TreeLog {
  id: number;
  count: number;
  date: string;
  location: string;
  species: string | null;
  notes: string | null;
  xpEarned: number;
  timestamp: string;
}

@Component({
  selector: 'app-tree-logger',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-logger.component.html',
  styleUrl: './tree-logger.component.css'
})
export class TreeLoggerComponent implements OnInit {
  @Output() treesLogged = new EventEmitter<number>();
  
  showTreeForm = false;
  treesCount: number = 1;
  plantingDate: string = new Date().toISOString().split('T')[0];
  plantingLocation: string = '';
  treeSpecies: string = '';
  plantingNotes: string = '';
  treeLogMessage = '';
  treeLogSuccess = false;
  treePlantingLogs: TreeLog[] = [];
  totalTreesPlanted = 0;

  constructor(private xpService: XPService) {}

  ngOnInit() {
    this.loadTreePlantingLogs();
  }

  loadTreePlantingLogs() {
    const logs = localStorage.getItem('treePlantingLogs');
    if (logs) {
      this.treePlantingLogs = JSON.parse(logs);
      this.calculateTotalTrees();
    }
  }

  calculateTotalTrees() {
    this.totalTreesPlanted = this.treePlantingLogs.reduce((total, log) => total + log.count, 0);
    this.treesLogged.emit(this.totalTreesPlanted);
  }

  logTrees() {
    if (!this.treesCount || this.treesCount < 1 || !this.plantingDate || !this.plantingLocation) {
      this.treeLogMessage = 'Please fill in all required fields';
      this.treeLogSuccess = false;
      return;
    }

    const xpEarned = this.treesCount * 10;

    const newLog: TreeLog = {
      id: Date.now(),
      count: Number(this.treesCount),
      date: this.plantingDate,
      location: this.plantingLocation,
      species: this.treeSpecies || null,
      notes: this.plantingNotes || null,
      xpEarned: xpEarned,
      timestamp: new Date().toISOString()
    };

    this.treePlantingLogs.unshift(newLog);
    localStorage.setItem('treePlantingLogs', JSON.stringify(this.treePlantingLogs));
    this.calculateTotalTrees();
    this.xpService.addXP(xpEarned, `Planted ${this.treesCount} tree${this.treesCount > 1 ? 's' : ''}`);

    this.treeLogMessage = `Successfully logged ${this.treesCount} tree${this.treesCount > 1 ? 's' : ''}! You earned ${xpEarned} XP!`;
    this.treeLogSuccess = true;

    setTimeout(() => {
      this.resetTreeForm();
      this.showTreeForm = false;
      this.treeLogMessage = '';
    }, 3000);
  }

  resetTreeForm() {
    this.treesCount = 1;
    this.plantingDate = new Date().toISOString().split('T')[0];
    this.plantingLocation = '';
    this.treeSpecies = '';
    this.plantingNotes = '';
    this.treeLogMessage = '';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getTotalTreesPlanted(): number {
    return this.totalTreesPlanted;
  }
}
