import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface AlertDialogData {
  title: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Component({
  selector: 'app-alert-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="alert-dialog-header" [class]="'header-' + data.type">
      <mat-icon class="alert-icon">{{ getIcon() }}</mat-icon>
      <h2 mat-dialog-title>{{ data.title }}</h2>
    </div>
    
    <mat-dialog-content>
      <p>{{ data.message }}</p>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-raised-button color="primary" [mat-dialog-close]="true">
        OK
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .alert-dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px 8px 24px;
    }

    .alert-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .header-success .alert-icon {
      color: #4caf50;
    }

    .header-error .alert-icon {
      color: #f44336;
    }

    .header-warning .alert-icon {
      color: #ff9800;
    }

    .header-info .alert-icon {
      color: #2196f3;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 500;
    }

    mat-dialog-content {
      padding: 20px 0;
    }

    mat-dialog-content p {
      margin: 0;
      color: rgba(0, 0, 0, 0.6);
      line-height: 1.5;
    }
  `]
})
export class AlertDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AlertDialogData
  ) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }
}
