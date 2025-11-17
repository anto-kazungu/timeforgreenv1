import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DonationService, Project } from '../../../services/donation.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-browse-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './browse-projects.component.html',
  styleUrl: './browse-projects.component.css'
})
export class BrowseProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  selectedCategory: string = 'all';
  
  categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'tree-planting', label: 'Tree Planting' },
    { value: 'waste-management', label: 'Waste Management' },
    { value: 'renewable-energy', label: 'Renewable Energy' },
    { value: 'water-conservation', label: 'Water Conservation' },
    { value: 'education', label: 'Education' }
  ];

  constructor(
    private router: Router,
    private donationService: DonationService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadProjects();
  }

  loadProjects() {
    this.projects = this.donationService.getActiveProjects();
    this.filterProjects();
  }

  filterProjects() {
    if (this.selectedCategory === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.category === this.selectedCategory);
    }
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.filterProjects();
  }

  getProgress(project: Project): number {
    return Math.min((project.currentAmount / project.targetAmount) * 100, 100);
  }

  donateToProject(projectId: string) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    this.dialogService.donation({
      title: 'Make a Donation',
      projectName: project.title,
      minAmount: 5,
      suggestedAmounts: [10, 25, 50, 100, 250, 500]
    }).subscribe(amount => {
      if (amount) {
        this.dialogService.alert(
          'Donation Successful!',
          `Thank you for your donation of $${amount.toFixed(2)} to ${project.title}. You're making a real difference!`
        ).subscribe(() => {
          this.loadProjects();
        });
      }
    });
  }

  goBack() {
    this.router.navigate(['/donor']);
  }
}
