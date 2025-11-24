import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface TreeSuccessDialogData {
  treeCount: number;
  treeCode: string;
  xpEarned: number;
  greenPointsEarned: number;
}

@Component({
  selector: 'app-tree-success-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="tree-success-dialog">
      <div class="dialog-header">
        <span class="material-symbols-outlined dialog-icon success-icon">
          check_circle
        </span>
        <h2 mat-dialog-title>Trees Logged Successfully!</h2>
      </div>
      
      <mat-dialog-content>
        <div class="success-content">
          <p class="success-message">
            You've successfully logged <strong>{{ data.treeCount }} tree{{ data.treeCount > 1 ? 's' : '' }}</strong>!
          </p>
          
          <div class="rewards-section">
            <div class="reward-item xp">
              <span class="material-symbols-outlined">stars</span>
              <span class="reward-value">+{{ data.xpEarned }} XP</span>
            </div>
            <div class="reward-item points">
              <span class="material-symbols-outlined">eco</span>
              <span class="reward-value">+{{ data.greenPointsEarned }} Green Points</span>
            </div>
          </div>
          
          <div class="code-section">
            <label class="code-label">Your Tree Code:</label>
            <div class="code-display">
              <code class="tree-code">{{ data.treeCode }}</code>
              <button mat-icon-button (click)="copyCode()" class="copy-button" title="Copy code">
                <span class="material-symbols-outlined">content_copy</span>
              </button>
            </div>
            <p class="code-hint">Save this code to track your tree!</p>
          </div>
        </div>
      </mat-dialog-content>
      
      <mat-dialog-actions align="end">
        <button mat-raised-button [mat-dialog-close]="true" class="btn-success">
          Got it!
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .tree-success-dialog {
      min-width: 400px;
      max-width: 500px;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .dialog-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
    }

    .success-icon {
      color: #10a37f;
    }

    h2 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
      color: #333;
    }

    mat-dialog-content {
      padding: 0 0 1.5rem 0;
    }

    .success-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .success-message {
      margin: 0;
      color: #666;
      font-size: 1rem;
      line-height: 1.6;
    }

    .success-message strong {
      color: #10a37f;
      font-weight: 600;
    }

    .rewards-section {
      display: flex;
      gap: 1rem;
      padding: 1rem;
      background: linear-gradient(135deg, #f0f9ff 0%, #e8f5f0 100%);
      border-radius: 12px;
      border: 2px solid rgba(16, 163, 127, 0.1);
    }

    .reward-item {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }

    .reward-item .material-symbols-outlined {
      font-size: 1.5rem;
    }

    .reward-item.xp .material-symbols-outlined {
      color: #fbbf24;
    }

    .reward-item.points .material-symbols-outlined {
      color: #10a37f;
    }

    .reward-value {
      font-size: 0.95rem;
      font-weight: 600;
      color: #333;
    }

    .code-section {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .code-label {
      font-size: 0.9rem;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .code-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: #f8f9fa;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
    }

    .tree-code {
      flex: 1;
      font-family: 'Courier New', monospace;
      font-size: 1.1rem;
      font-weight: 600;
      color: #10a37f;
      letter-spacing: 1px;
    }

    .copy-button {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
      border-radius: 8px;
      transition: all 0.3s;
    }

    .copy-button:hover {
      background: #10a37f;
      color: white;
    }

    .copy-button .material-symbols-outlined {
      font-size: 1.2rem;
    }

    .code-hint {
      margin: 0;
      font-size: 0.85rem;
      color: #999;
      font-style: italic;
    }

    mat-dialog-actions {
      padding: 0;
      margin: 0;
    }

    .btn-success {
      min-width: 100px;
      font-weight: 600;
      background: linear-gradient(135deg, #10a37f 0%, #0d8f6f 100%);
      color: white;
      padding: 0.75rem 2rem;
    }

    .btn-success:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 163, 127, 0.3);
    }

    /* Responsive */
    @media (max-width: 480px) {
      .tree-success-dialog {
        min-width: 300px;
      }

      h2 {
        font-size: 1.2rem;
      }

      .rewards-section {
        flex-direction: column;
      }

      .tree-code {
        font-size: 0.95rem;
      }
    }
  `]
})
export class TreeSuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TreeSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TreeSuccessDialogData
  ) {}

  copyCode(): void {
    navigator.clipboard.writeText(this.data.treeCode).then(() => {
      // Visual feedback could be added here
      console.log('Code copied!');
    });
  }
}
