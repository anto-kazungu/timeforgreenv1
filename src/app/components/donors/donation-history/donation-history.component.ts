import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DonationService, Donation } from '../../../services/donation.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-donation-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donation-history.component.html',
  styleUrl: './donation-history.component.css'
})
export class DonationHistoryComponent implements OnInit {
  donations: Donation[] = [];
  filteredDonations: Donation[] = [];
  selectedFilter: string = 'all';
  totalDonated = 0;

  filters = [
    { value: 'all', label: 'All Donations' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'recurring', label: 'Recurring' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private donationService: DonationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadDonations();
  }

  loadDonations() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.donations = this.donationService.getDonationsByDonor(currentUser.id)
        .sort((a, b) => b.date.getTime() - a.date.getTime());
      this.totalDonated = this.donations.reduce((sum, d) => sum + d.amount, 0);
      this.filterDonations();
    }
  }

  filterDonations() {
    if (this.selectedFilter === 'all') {
      this.filteredDonations = this.donations;
    } else {
      this.filteredDonations = this.donations.filter(d => d.status === this.selectedFilter);
    }
  }

  onFilterChange(filter: string) {
    this.selectedFilter = filter;
    this.filterDonations();
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'pending': return '#ff9800';
      case 'recurring': return '#2196f3';
      default: return '#666';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'completed': return 'check_circle';
      case 'pending': return 'schedule';
      case 'recurring': return 'autorenew';
      default: return 'help';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  downloadReceipt(donationId: string) {
    const donation = this.donations.find(d => d.id === donationId);
    if (donation) {
      this.dialogService.alert(
        'Receipt Downloaded',
        `Receipt for your Ksh ${donation.amount.toFixed(2)} donation to "${donation.projectTitle}" has been downloaded successfully.`
      ).subscribe();
    }
  }

  goBack() {
    this.router.navigate(['/donor']);
  }
}
