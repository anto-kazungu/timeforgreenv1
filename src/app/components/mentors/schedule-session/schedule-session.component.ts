import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MentorService, ConsultationSession, ExpertiseArea } from '../../../services/mentor.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-schedule-session',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './schedule-session.component.html',
  styleUrl: './schedule-session.component.css'
})
export class ScheduleSessionComponent implements OnInit {
  sessions: ConsultationSession[] = [];
  showCreateForm = false;

  newSession: Partial<ConsultationSession> = {
    title: '',
    description: '',
    expertiseArea: 'environmental-law',
    date: new Date(),
    duration: 60,
    maxAttendees: 20,
    meetingLink: '',
    topics: [],
    status: 'scheduled'
  };

  newTopic: string = '';

  expertiseAreas: { value: ExpertiseArea; label: string }[] = [
    { value: 'environmental-law', label: 'Environmental Law' },
    { value: 'forestry', label: 'Forestry & Conservation' },
    { value: 'climate-science', label: 'Climate Science' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'waste-management', label: 'Waste Management' },
    { value: 'conservation', label: 'Wildlife Conservation' },
    { value: 'sustainable-agriculture', label: 'Sustainable Agriculture' },
    { value: 'water-resources', label: 'Water Resources' }
  ];

  durations = [30, 45, 60, 90, 120];

  constructor(
    private router: Router,
    private authService: AuthService,
    private mentorService: MentorService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadSessions();
  }

  loadSessions() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.sessions = this.mentorService.getSessionsByMentor(currentUser.id)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
    }
  }

  toggleCreateForm() {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  addTopic() {
    if (this.newTopic.trim() && !this.newSession.topics!.includes(this.newTopic.trim())) {
      this.newSession.topics!.push(this.newTopic.trim());
      this.newTopic = '';
    }
  }

  removeTopic(index: number) {
    this.newSession.topics!.splice(index, 1);
  }

  createSession() {
    if (!this.validateSession()) {
      this.dialogService.alert(
        'Incomplete Information',
        'Please fill in all required fields including title, description, date, and at least one topic.'
      ).subscribe();
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const sessionData = {
      ...this.newSession,
      mentorId: currentUser.id,
      mentorName: `${currentUser.firstName} ${currentUser.lastName}`
    } as Omit<ConsultationSession, 'id' | 'currentAttendees' | 'attendees'>;

    const created = this.mentorService.createSession(sessionData);

    this.dialogService.alert(
      'Session Scheduled!',
      `Your consultation session "${created.title}" has been scheduled successfully.`
    ).subscribe(() => {
      this.toggleCreateForm();
      this.loadSessions();
    });
  }

  deleteSession(sessionId: string) {
    const session = this.sessions.find(s => s.id === sessionId);
    if (!session) return;

    this.dialogService.confirm(
      'Cancel Session',
      `Are you sure you want to cancel "${session.title}"? Attendees will be notified.`
    ).subscribe(confirmed => {
      if (confirmed) {
        if (this.mentorService.deleteSession(sessionId)) {
          this.dialogService.alert(
            'Session Cancelled',
            'The consultation session has been cancelled successfully.'
          ).subscribe(() => {
            this.loadSessions();
          });
        }
      }
    });
  }

  getUpcomingSessions(): ConsultationSession[] {
    return this.sessions.filter(s => s.date > new Date() && s.status === 'scheduled');
  }

  getPastSessions(): ConsultationSession[] {
    return this.sessions.filter(s => s.date <= new Date() || s.status === 'completed');
  }

  getTimeUntil(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h`;
    return 'Starting soon';
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'scheduled': return '#2196f3';
      case 'ongoing': return '#4caf50';
      case 'completed': return '#9e9e9e';
      case 'cancelled': return '#f44336';
      default: return '#666';
    }
  }

  private validateSession(): boolean {
    return !!(
      this.newSession.title &&
      this.newSession.description &&
      this.newSession.date &&
      this.newSession.topics!.length > 0
    );
  }

  private resetForm() {
    this.newSession = {
      title: '',
      description: '',
      expertiseArea: 'environmental-law',
      date: new Date(),
      duration: 60,
      maxAttendees: 20,
      meetingLink: '',
      topics: [],
      status: 'scheduled'
    };
    this.newTopic = '';
  }

  goBack() {
    this.router.navigate(['/mentor']);
  }
}
