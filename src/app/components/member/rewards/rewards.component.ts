import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PointsService } from '../../../services/points.service';
import { NotificationService } from '../../../services/notification.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-rewards',
  imports: [CommonModule],
  templateUrl: './rewards.component.html',
  styleUrl: './rewards.component.css'
})
export class RewardsComponent implements OnInit {
  totalPoints = 850;

  rewards = [
    {
      id: '1',
      title: 'Eco-Friendly Water Bottle',
      description: 'Reusable stainless steel water bottle to reduce plastic waste.',
      points: 500,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      claimed: false
    },
    {
      id: '2',
      title: 'Tree Planting Certificate',
      description: 'Plant 5 trees in your name and get a certificate of contribution.',
      points: 300,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      claimed: false
    },
    {
      id: '3',
      title: 'Green T-Shirt',
      description: 'Organic cotton t-shirt with "Just Go Green" logo.',
      points: 700,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      claimed: false
    },
    {
      id: '4',
      title: 'Recycling Bin Set',
      description: 'Complete set of color-coded recycling bins for your home.',
      points: 1000,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      claimed: false
    },
    {
      id: '5',
      title: 'Solar Power Bank',
      description: 'Portable solar-powered charger for your devices.',
      points: 1200,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      claimed: false
    },
    {
      id: '6',
      title: 'Community Leader Badge',
      description: 'Digital badge recognizing your environmental leadership.',
      points: 200,
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      claimed: false
    }
  ];

  constructor(
    private router: Router, 
    private authService: AuthService,
    private pointsService: PointsService,
    private notificationService: NotificationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.pointsService.points$.subscribe(points => {
      this.totalPoints = points;
    });
    
    // Load claimed rewards
    const claimed = localStorage.getItem('claimedRewards');
    if (claimed) {
      const claimedIds = JSON.parse(claimed);
      this.rewards.forEach(reward => {
        reward.claimed = claimedIds.includes(reward.id);
      });
    }
  }

  redeemReward(reward: any) {
    if (reward.claimed) {
      this.notificationService.showWarning('You have already claimed this reward!');
      return;
    }

    if (this.totalPoints < reward.points) {
      this.notificationService.showError('Not enough points to redeem this reward!');
      return;
    }

    this.dialogService.confirm(
      'Redeem Reward',
      `Redeem ${reward.title} for ${reward.points} points?`
    ).subscribe(confirmed => {
      if (confirmed) {
        const success = this.pointsService.deductPoints(reward.points, `Redeemed ${reward.title}`);
        if (success) {
          reward.claimed = true;
          this.saveClaimedRewards();
          this.notificationService.showSuccess(`${reward.title} claimed! Check your email for details.`);
        }
      }
    });
  }

  private saveClaimedRewards() {
    const claimedIds = this.rewards.filter(r => r.claimed).map(r => r.id);
    localStorage.setItem('claimedRewards', JSON.stringify(claimedIds));
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }
}
