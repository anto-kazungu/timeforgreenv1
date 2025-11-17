import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MentorService, TrainingModule } from '../../../services/mentor.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-manage-modules',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-modules.component.html',
  styleUrl: './manage-modules.component.css'
})
export class ManageModulesComponent implements OnInit {
  modules: TrainingModule[] = [];
  filteredModules: TrainingModule[] = [];
  selectedStatus: string = 'all';

  statusFilters = [
    { value: 'all', label: 'All Modules' },
    { value: 'published', label: 'Published' },
    { value: 'draft', label: 'Drafts' },
    { value: 'archived', label: 'Archived' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    public mentorService: MentorService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadModules();
  }

  loadModules() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.modules = this.mentorService.getModulesByMentor(currentUser.id);
      this.filterModules();
    }
  }

  filterModules() {
    if (this.selectedStatus === 'all') {
      this.filteredModules = this.modules;
    } else {
      this.filteredModules = this.modules.filter(m => m.status === this.selectedStatus);
    }
  }

  onStatusChange(status: string) {
    this.selectedStatus = status;
    this.filterModules();
  }

  editModule(moduleId: string) {
    // Navigate to edit page (would need to create edit component)
    this.dialogService.alert(
      'Edit Module',
      'Edit functionality coming soon! You can delete and recreate for now.'
    ).subscribe();
  }

  deleteModule(moduleId: string) {
    const module = this.modules.find(m => m.id === moduleId);
    if (!module) return;

    this.dialogService.confirm(
      'Delete Module',
      `Are you sure you want to delete "${module.title}"? This action cannot be undone.`
    ).subscribe(confirmed => {
      if (confirmed) {
        if (this.mentorService.deleteModule(moduleId)) {
          this.dialogService.alert(
            'Module Deleted',
            'The training module has been deleted successfully.'
          ).subscribe(() => {
            this.loadModules();
          });
        }
      }
    });
  }

  toggleStatus(moduleId: string) {
    const module = this.modules.find(m => m.id === moduleId);
    if (!module) return;

    const newStatus = module.status === 'published' ? 'archived' : 'published';
    const action = newStatus === 'published' ? 'publish' : 'archive';

    this.dialogService.confirm(
      `${action.charAt(0).toUpperCase() + action.slice(1)} Module`,
      `Are you sure you want to ${action} "${module.title}"?`
    ).subscribe(confirmed => {
      if (confirmed) {
        this.mentorService.updateModule(moduleId, { status: newStatus });
        this.loadModules();
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'published': return '#4caf50';
      case 'draft': return '#ff9800';
      case 'archived': return '#9e9e9e';
      default: return '#666';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'published': return 'check_circle';
      case 'draft': return 'edit';
      case 'archived': return 'archive';
      default: return 'help';
    }
  }

  goBack() {
    this.router.navigate(['/mentor']);
  }

  createNew() {
    this.router.navigate(['/mentor/create-training']);
  }
}
