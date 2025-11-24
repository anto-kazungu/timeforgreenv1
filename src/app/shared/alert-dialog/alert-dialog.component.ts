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
    <div class="alert-dialog">
      <div class="dialog-banner" [class]="'banner-' + data.type">
        <span class="material-symbols-outlined banner-icon">
          {{ getIcon() }}
        </span>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>
      
      <mat-dialog-content>
        <p class="message-text">{{ data.message }}</p>
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
      min-width: 400px;
      max-width: 500px;
    }

    /* Banner Header (like donation dialog) */
    .dialog-banner {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
      animation: slideDown 0.3s ease-out;
    }

    @keyframes slideDown {
      from {
        transform: translateY(-10px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .banner-success {
      background: linear-gradient(135deg, #10a37f 0%, #0d8f6f 100%);
      color: white;
    }

    .banner-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    .banner-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
    }

    .banner-info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
    }

    .banner-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      animation: iconPop 0.4s ease-out 0.1s backwards;
    }

    @keyframes iconPop {
      0% {
        transform: scale(0) rotate(-180deg);
        opacity: 0;
      }
      50% {
        transform: scale(1.2) rotate(10deg);
      }
      100% {
        transform: scale(1) rotate(0deg);
        opacity: 1;
      }
    }

    h2 {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: white;
    }

    mat-dialog-content {
      padding: 20px 24px;
    }

    .message-text {
      margin: 0;
      color: #4a5568;
      line-height: 1.7;
      font-size: 16px;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e2e8f0;
      margin: 0;
    }

    button {
      min-width: 100px;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 10px;
      transition: all 0.2s ease;
      font-size: 15px;
    }

    .btn-success {
      background: linear-gradient(135deg, #10a37f 0%, #0d8f6f 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(16, 163, 127, 0.25);
    }

    .btn-success:hover {
      background: linear-gradient(135deg, #0d8f6f 0%, #0a7a5e 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(16, 163, 127, 0.35);
    }

    .btn-error {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(239, 68, 68, 0.25);
    }

    .btn-error:hover {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35);
    }

    .btn-warning {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);
    }

    .btn-warning:hover {
      background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.35);
    }

    .btn-info {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(59, 130, 246, 0.25);
    }

    .btn-info:hover {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.35);
    }

    button:active {
      transform: translateY(0);
    }

    /* Rounded dialog container */
    ::ng-deep .mat-mdc-dialog-container {
      border-radius: 15px !important;
    }

    /* Responsive */
    @media (max-width: 480px) {
      .alert-dialog {
        min-width: 300px;
      }

      .dialog-banner {
        padding: 15px;
      }

      .banner-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
      }

      h2 {
        font-size: 18px;
      }

      mat-dialog-content {
        padding: 15px 20px;
      }

      .message-text {
        font-size: 14px;
      }

      mat-dialog-actions {
        padding: 12px 20px;
      }

      button {
        min-width: 80px;
        padding: 10px 20px;
        font-size: 14px;
      }
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
