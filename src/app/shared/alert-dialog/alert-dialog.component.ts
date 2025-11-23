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
    <div class="alert-dialog" [class]="data.type">
      <div class="dialog-header">
        <span class="material-symbols-outlined dialog-icon">
          {{ getIcon() }}
        </span>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>
      <mat-dialog-content>
        <p>{{ data.message }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-raised-button [mat-dialog-close]="true" [class]="'btn-' + data.type">
          OK
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .alert-dialog {
      min-width: 300px;
      max-width: 500px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .dialog-icon {
      font-size: 2rem;
      width: 2rem;
      height: 2rem;
    }

    .success .dialog-icon {
      color: #10a37f;
    }

    .error .dialog-icon {
      color: #ef4444;
    }

    .warning .dialog-icon {
      color: #f59e0b;
    }

    .info .dialog-icon {
      color: #3b82f6;
    }

    h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
    }

    mat-dialog-content {
      padding: 0 0 1.5rem 0;
    }

    mat-dialog-content p {
      margin: 0;
      color: #666;
      line-height: 1.6;
    }

    mat-dialog-actions {
      padding: 0;
      margin: 0;
    }

    button {
      min-width: 80px;
      font-weight: 600;
    }

    .btn-success {
      background: linear-gradient(135deg, #10a37f 0%, #0d8f6f 100%);
      color: white;
    }

    .btn-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .btn-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .btn-info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }

    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
