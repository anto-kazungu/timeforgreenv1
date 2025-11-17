import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { DonationDialogComponent, DonationDialogData } from '../shared/donation-dialog/donation-dialog.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message }
    });

    return dialogRef.afterClosed();
  }

  alert(title: string, message: string): Observable<void> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { title, message, alertOnly: true }
    });

    return dialogRef.afterClosed();
  }

  donation(data: DonationDialogData): Observable<number | null> {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '500px',
      data
    });

    return dialogRef.afterClosed();
  }
}
