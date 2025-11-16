import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PointsService } from '../../../services/points.service';
import { NotificationService } from '../../../services/notification.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-events',
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent implements OnInit {
  events = [
    {
      id: '1',
      day: '25',
      month: 'Nov',
      title: 'Beach Cleanup Drive',
      location: 'Diani Beach',
      time: '8:00 AM - 12:00 PM',
      description: 'Join us for a morning beach cleanup to remove plastic waste and protect marine life.',
      attendees: 45,
      joined: false
    },
    {
      id: '2',
      day: '28',
      month: 'Nov',
      title: 'Tree Planting Campaign',
      location: 'Karura Forest',
      time: '9:00 AM - 2:00 PM',
      description: 'Help us plant 500 trees to restore the forest ecosystem and combat climate change.',
      attendees: 78,
      joined: false
    },
    {
      id: '3',
      day: '02',
      month: 'Dec',
      title: 'Recycling Workshop',
      location: 'Community Center',
      time: '2:00 PM - 5:00 PM',
      description: 'Learn creative ways to recycle household items and reduce waste in your home.',
      attendees: 32,
      joined: false
    },
    {
      id: '4',
      day: '05',
      month: 'Dec',
      title: 'River Restoration Project',
      location: 'Nairobi River',
      time: '7:00 AM - 1:00 PM',
      description: 'Community effort to clean and restore the river banks, removing debris and planting vegetation.',
      attendees: 56,
      joined: false
    },
    {
      id: '5',
      day: '10',
      month: 'Dec',
      title: 'Green Energy Seminar',
      location: 'University Hall',
      time: '10:00 AM - 4:00 PM',
      description: 'Educational seminar on renewable energy solutions and sustainable living practices.',
      attendees: 120,
      joined: false
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
    // Load joined events
    const joined = localStorage.getItem('joinedEvents');
    if (joined) {
      const joinedIds = JSON.parse(joined);
      this.events.forEach(event => {
        event.joined = joinedIds.includes(event.id);
      });
    }
  }

  toggleJoin(event: any) {
    if (event.joined) {
      this.dialogService.alert('Already Joined', 'You have already joined this event!');
      return;
    }

    this.dialogService.confirm(
      'Join Event',
      `Would you like to join "${event.title}"? You'll earn 75 green points for participating!`
    ).subscribe(confirmed => {
      if (confirmed) {
        event.joined = true;
        event.attendees++;
        this.pointsService.addPoints(75, `Joined event: ${event.title}`);
        this.saveJoinedEvents();
        this.notificationService.showSuccess(`Joined ${event.title}! +75 points earned 🎉`);
      }
    });
  }

  private saveJoinedEvents() {
    const joinedIds = this.events.filter(e => e.joined).map(e => e.id);
    localStorage.setItem('joinedEvents', JSON.stringify(joinedIds));
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }
}
