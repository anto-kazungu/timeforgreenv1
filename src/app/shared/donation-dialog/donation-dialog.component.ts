import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface DonationDialogData {
  title: string;
  projectName: string;
  minAmount: number;
  suggestedAmounts: number[];
}

@Component({
  selector: 'app-donation-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MatDialogModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './donation-dialog.component.html',
  styleUrl: './donation-dialog.component.css'
})
export class DonationDialogComponent {
  amount: number = 0;
  customAmount: string = '';
  selectedAmount: number | null = null;

  constructor(
    public dialogRef: MatDialogRef<DonationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DonationDialogData
  ) {}

  selectAmount(amount: number): void {
    this.selectedAmount = amount;
    this.amount = amount;
    this.customAmount = '';
  }

  onCustomAmountChange(): void {
    this.selectedAmount = null;
    const value = parseFloat(this.customAmount);
    if (!isNaN(value) && value >= this.data.minAmount) {
      this.amount = value;
    }
  }

  onConfirm(): void {
    if (this.amount >= this.data.minAmount) {
      this.dialogRef.close(this.amount);
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  isValidAmount(): boolean {
    return this.amount >= this.data.minAmount;
  }
}
