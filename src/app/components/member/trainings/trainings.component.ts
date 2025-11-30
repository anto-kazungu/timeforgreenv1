import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TrainingService, Training } from '../../../services/training.service';
import { PointsService } from '../../../services/points.service';
import { NotificationService } from '../../../services/notification.service';
import { DialogService } from '../../../services/dialog.service';
import { TopNavComponent } from '../../shared/top-nav/top-nav.component';

@Component({
  selector: 'app-trainings',
  imports: [CommonModule, TopNavComponent],
  templateUrl: './trainings.component.html',
  styleUrl: './trainings.component.css'
})
export class TrainingsComponent implements OnInit {
  ongoingTrainings: Training[] = [];
  availableTrainings: Training[] = [];

  constructor(
    private router: Router, 
    private authService: AuthService,
    private trainingService: TrainingService,
    private pointsService: PointsService,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadTrainings();
  }

  loadTrainings() {
    this.ongoingTrainings = this.trainingService.getOngoingTrainings();
    this.availableTrainings = this.trainingService.getAvailableTrainings();
  }

  enrollInCourse(trainingId: string) {
    const training = this.trainingService.getAllTrainings().find(t => t.id === trainingId);
    
    if (!training) {
      this.dialogService.alert('Error', 'Training not found.');
      return;
    }

    this.dialogService.confirm(
      'Enroll in Training',
      `Would you like to enroll in "${training.title}"? You'll earn 50 green points upon enrollment.`
    ).subscribe(confirmed => {
      if (confirmed) {
        const success = this.trainingService.enrollInTraining(trainingId, this.pointsService);
        if (success) {
          this.loadTrainings();
          this.notificationService.showSuccess(`Enrolled in ${training.title}! +50 points earned`);
        } else {
          this.dialogService.alert('Already Enrolled', 'You are already enrolled in this training.');
        }
      }
    });
  }

  goBack() {
    this.router.navigate([this.authService.getRoleDashboard()]);
  }

  logout() {
    this.authService.logout();
  }

}
