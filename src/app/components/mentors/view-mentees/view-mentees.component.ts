import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MentorService, Mentee, Question } from '../../../services/mentor.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-view-mentees',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-mentees.component.html',
  styleUrl: './view-mentees.component.css'
})
export class ViewMenteesComponent implements OnInit {
  mentees: Mentee[] = [];
  questions: Question[] = [];
  selectedView: 'mentees' | 'questions' = 'mentees';

  constructor(
    private router: Router,
    private authService: AuthService,
    private mentorService: MentorService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.mentees = this.mentorService.getMenteesByMentor(currentUser.id);
      this.questions = this.mentorService.getQuestionsByMentor(currentUser.id);
    }
  }

  switchView(view: 'mentees' | 'questions') {
    this.selectedView = view;
  }

  getProgressColor(progress: number): string {
    if (progress >= 80) return '#4caf50';
    if (progress >= 50) return '#667eea';
    if (progress >= 25) return '#ff9800';
    return '#f44336';
  }

  getAverageProgress(mentee: Mentee): number {
    const progresses = Object.values(mentee.progress);
    if (progresses.length === 0) return 0;
    return progresses.reduce((sum, p) => sum + p, 0) / progresses.length;
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 7) return date.toLocaleDateString();
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  }

  answerQuestion(questionId: string) {
    const question = this.questions.find(q => q.id === questionId);
    if (!question) return;

    // In a real app, this would open a rich text editor dialog
    const answer = prompt(`Answer for: "${question.question}"\n\nEnter your answer:`);
    
    if (answer && answer.trim()) {
      if (this.mentorService.answerQuestion(questionId, answer.trim())) {
        this.dialogService.alert(
          'Answer Submitted',
          'Your answer has been sent to the mentee successfully.'
        ).subscribe(() => {
          this.loadData();
        });
      }
    }
  }

  getPendingQuestions(): Question[] {
    return this.questions.filter(q => q.status === 'pending');
  }

  getAnsweredQuestions(): Question[] {
    return this.questions.filter(q => q.status === 'answered');
  }

  goBack() {
    this.router.navigate(['/mentor']);
  }
}
