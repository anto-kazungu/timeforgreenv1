import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DonationService, DonationImpact } from '../../../services/donation.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-impact-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './impact-report.component.html',
  styleUrl: './impact-report.component.css'
})
export class ImpactReportComponent implements OnInit {
  impact: DonationImpact = {
    totalDonated: 0,
    projectsFunded: 0,
    livesImpacted: 0,
    co2Reduced: 0,
    treesPlanted: 0,
    wasteRecycled: 0
  };

  impactStats = [
    { label: 'Total Donated', value: '$0', icon: 'payments', color: '#667eea', description: 'Your total contributions' },
    { label: 'Projects Funded', value: 0, icon: 'campaign', color: '#f093fb', description: 'Projects you supported' },
    { label: 'Lives Impacted', value: 0, icon: 'favorite', color: '#43e97b', description: 'People helped' },
    { label: 'CO₂ Reduced', value: '0 tons', icon: 'eco', color: '#fa709a', description: 'Carbon offset' },
    { label: 'Trees Planted', value: 0, icon: 'park', color: '#38b2ac', description: 'Trees in the ground' },
    { label: 'Waste Recycled', value: '0 kg', icon: 'recycling', color: '#ed8936', description: 'Waste diverted' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private donationService: DonationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadImpact();
  }

  loadImpact() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.impact = this.donationService.getDonorImpact(currentUser.id);
      
      this.impactStats[0].value = `$${this.impact.totalDonated.toLocaleString()}`;
      this.impactStats[1].value = this.impact.projectsFunded;
      this.impactStats[2].value = this.impact.livesImpacted;
      this.impactStats[3].value = `${this.impact.co2Reduced} tons`;
      this.impactStats[4].value = this.impact.treesPlanted;
      this.impactStats[5].value = `${this.impact.wasteRecycled} kg`;
    }
  }

  downloadReport() {
    this.dialogService.alert(
      'Report Downloaded',
      `Your complete impact report has been downloaded. You've made a difference with $${this.impact.totalDonated.toLocaleString()} in donations!`
    ).subscribe();
  }

  shareImpact() {
    this.dialogService.alert(
      'Share Your Impact',
      `Share your amazing impact: ${this.impact.projectsFunded} projects funded, ${this.impact.livesImpacted} lives impacted, and ${this.impact.co2Reduced} tons of CO₂ reduced!`
    ).subscribe();
  }

  goBack() {
    this.router.navigate(['/donor']);
  }
}
