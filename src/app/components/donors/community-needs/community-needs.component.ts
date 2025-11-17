import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DonationService, CommunityNeed } from '../../../services/donation.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-community-needs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-needs.component.html',
  styleUrl: './community-needs.component.css'
})
export class CommunityNeedsComponent implements OnInit {
  needs: CommunityNeed[] = [];
  filteredNeeds: CommunityNeed[] = [];
  selectedUrgency: string = 'all';

  urgencyFilters = [
    { value: 'all', label: 'All Needs' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private donationService: DonationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadNeeds();
  }

  loadNeeds() {
    this.needs = this.donationService.getOpenNeeds()
      .sort((a, b) => {
        const urgencyOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      });
    this.filterNeeds();
  }

  filterNeeds() {
    if (this.selectedUrgency === 'all') {
      this.filteredNeeds = this.needs;
    } else {
      this.filteredNeeds = this.needs.filter(n => n.urgency === this.selectedUrgency);
    }
  }

  onUrgencyChange(urgency: string) {
    this.selectedUrgency = urgency;
    this.filterNeeds();
  }

  getProgress(need: CommunityNeed): number {
    return Math.min((need.fundedAmount / need.estimatedCost) * 100, 100);
  }

  getUrgencyColor(urgency: string): string {
    switch (urgency) {
      case 'critical': return '#f44336';
      case 'high': return '#ff9800';
      case 'medium': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  }

  getUrgencyIcon(urgency: string): string {
    switch (urgency) {
      case 'critical': return 'warning';
      case 'high': return 'priority_high';
      case 'medium': return 'info';
      case 'low': return 'check_circle';
      default: return 'help';
    }
  }

  fundNeed(needId: string) {
    const need = this.needs.find(n => n.id === needId);
    if (!need) return;

    const remainingAmount = need.estimatedCost - need.fundedAmount;

    this.dialogService.donation({
      title: 'Fund Community Need',
      projectName: `${need.title} - ${need.communityName}`,
      minAmount: 5,
      suggestedAmounts: [10, 25, 50, 100, Math.min(250, remainingAmount), Math.min(500, remainingAmount)]
    }).subscribe(amount => {
      if (amount) {
        const currentUser = this.authService.getCurrentUser();
        if (currentUser && this.donationService.fundCommunityNeed(needId, amount, currentUser.id)) {
          this.dialogService.alert(
            'Funding Successful!',
            `Thank you for your $${amount.toFixed(2)} donation to help ${need.communityName}. Your contribution is making a real impact!`
          ).subscribe(() => {
            this.loadNeeds();
          });
        }
      }
    });
  }

  goBack() {
    this.router.navigate(['/donor']);
  }
}
