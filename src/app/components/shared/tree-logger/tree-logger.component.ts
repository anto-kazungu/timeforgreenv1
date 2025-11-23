import { Component, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PointsService } from '../../../services/points.service';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

interface TreeLog {
  id: number;
  treeCode: string;
  count: number;
  date: string;
  location: string;
  species: string | null;
  notes: string | null;
  xpEarned: number;
  timestamp: string;
  planterName?: string;
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
  showRetrievalForm = false;
  treesCount: number = 1;
  plantingDate: string = new Date().toISOString().split('T')[0];
  plantingLocation: string = '';
  treeSpecies: string = '';
  plantingNotes: string = '';
  treeLogMessage = '';
  treeLogSuccess = false;
  treePlantingLogs: TreeLog[] = [];
  totalTreesPlanted = 0;
  
  // Retrieval properties
  searchCode: string = '';
  retrievedTree: TreeLog | null = null;
  retrievalMessage = '';
  retrievalSuccess = false;
  generatedCode: string = '';

  private dialog = inject(MatDialog);

  constructor(private pointsService: PointsService) {}

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

    // Calculate rewards: 10 XP and 5 Green Points per tree
    const xpEarned = this.treesCount * 10;
    const greenPointsEarned = this.treesCount * 5;
    const treeCode = this.generateTreeCode();

    const newLog: TreeLog = {
      id: Date.now(),
      treeCode: treeCode,
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
    
    // Add both Green Points and XP
    this.pointsService.addPoints(
      greenPointsEarned, 
      `Planted ${this.treesCount} tree${this.treesCount > 1 ? 's' : ''}`,
      xpEarned
    );

    this.generatedCode = treeCode;
    this.treeLogMessage = `Successfully logged ${this.treesCount} tree${this.treesCount > 1 ? 's' : ''}! Earned ${xpEarned} XP and ${greenPointsEarned} Green Points.`;
    this.treeLogSuccess = true;

    setTimeout(() => {
      this.resetTreeForm();
      this.showTreeForm = false;
      this.treeLogMessage = '';
      this.generatedCode = '';
    }, 5000);
  }

  generateTreeCode(): string {
    const prefix = 'TREE';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }

  retrieveTreeInfo() {
    if (!this.searchCode) {
      this.retrievalMessage = 'Please enter a tree code';
      this.retrievalSuccess = false;
      return;
    }

    const allLogs = localStorage.getItem('treePlantingLogs');
    if (allLogs) {
      const logs: TreeLog[] = JSON.parse(allLogs);
      const found = logs.find(log => log.treeCode === this.searchCode.toUpperCase());

      if (found) {
        this.retrievedTree = found;
        this.retrievalMessage = 'Tree information retrieved successfully!';
        this.retrievalSuccess = true;
      } else {
        this.retrievedTree = null;
        this.retrievalMessage = 'Tree code not found. Please check and try again.';
        this.retrievalSuccess = false;
      }
    } else {
      this.retrievalMessage = 'No tree records found.';
      this.retrievalSuccess = false;
    }
  }

  copyTreeCode(code: string) {
    if (!code) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'No Code',
          message: 'No code available to copy.',
          type: 'error'
        }
      });
      return;
    }
    navigator.clipboard.writeText(code).then(() => {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Success',
          message: 'Tree code copied to clipboard!',
          type: 'success'
        }
      });
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Copy Failed',
          message: `Failed to copy code. Please copy manually: ${code}`,
          type: 'error'
        }
      });
    });
  }

  resetRetrievalForm() {
    this.searchCode = '';
    this.retrievedTree = null;
    this.retrievalMessage = '';
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
