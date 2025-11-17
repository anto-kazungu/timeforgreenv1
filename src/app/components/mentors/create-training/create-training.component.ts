import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MentorService, TrainingModule, Resource, ExpertiseArea } from '../../../services/mentor.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-create-training',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-training.component.html',
  styleUrl: './create-training.component.css'
})
export class CreateTrainingComponent implements OnInit {
  module: Partial<TrainingModule> = {
    title: '',
    description: '',
    expertiseArea: 'environmental-law',
    duration: 60,
    level: 'beginner',
    status: 'draft',
    resources: [],
    topics: []
  };

  newResource: Partial<Resource> = {
    type: 'video',
    title: '',
    url: '',
    description: ''
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

  levels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  resourceTypes = [
    { value: 'video', label: 'Video', icon: 'videocam' },
    { value: 'document', label: 'Document', icon: 'description' },
    { value: 'link', label: 'External Link', icon: 'link' },
    { value: 'quiz', label: 'Quiz', icon: 'quiz' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private mentorService: MentorService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {}

  addResource() {
    if (this.newResource.title && this.newResource.url) {
      const resource: Resource = {
        id: this.generateId(),
        type: this.newResource.type as any,
        title: this.newResource.title,
        url: this.newResource.url,
        description: this.newResource.description
      };
      
      this.module.resources!.push(resource);
      
      // Reset form
      this.newResource = {
        type: 'video',
        title: '',
        url: '',
        description: ''
      };
    }
  }

  removeResource(index: number) {
    this.module.resources!.splice(index, 1);
  }

  addTopic() {
    if (this.newTopic.trim() && !this.module.topics!.includes(this.newTopic.trim())) {
      this.module.topics!.push(this.newTopic.trim());
      this.newTopic = '';
    }
  }

  removeTopic(index: number) {
    this.module.topics!.splice(index, 1);
  }

  saveDraft() {
    if (!this.validateBasicInfo()) {
      this.dialogService.alert(
        'Incomplete Information',
        'Please fill in at least the title, description, and expertise area to save as draft.'
      ).subscribe();
      return;
    }

    this.saveModule('draft');
  }

  publish() {
    if (!this.validateModule()) {
      this.dialogService.alert(
        'Incomplete Module',
        'Please complete all required fields, add at least one resource, and specify topics before publishing.'
      ).subscribe();
      return;
    }

    this.dialogService.confirm(
      'Publish Training Module',
      'Are you sure you want to publish this module? It will be visible to all members.'
    ).subscribe(confirmed => {
      if (confirmed) {
        this.saveModule('published');
      }
    });
  }

  private saveModule(status: 'draft' | 'published') {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const moduleData = {
      ...this.module,
      mentorId: currentUser.id,
      mentorName: `${currentUser.firstName} ${currentUser.lastName}`,
      status
    } as Omit<TrainingModule, 'id' | 'enrolledCount' | 'rating' | 'createdDate'>;

    const created = this.mentorService.createModule(moduleData);

    this.dialogService.alert(
      status === 'published' ? 'Module Published!' : 'Draft Saved!',
      status === 'published' 
        ? `Your training module "${created.title}" has been published successfully!`
        : `Your draft "${created.title}" has been saved. You can continue editing it later.`
    ).subscribe(() => {
      this.router.navigate(['/mentor/modules']);
    });
  }

  private validateBasicInfo(): boolean {
    return !!(this.module.title && this.module.description && this.module.expertiseArea);
  }

  private validateModule(): boolean {
    return this.validateBasicInfo() && 
           this.module.resources!.length > 0 && 
           this.module.topics!.length > 0;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getResourceTypeInfo(type: string) {
    return this.resourceTypes.find(t => t.value === type);
  }

  goBack() {
    this.router.navigate(['/mentor']);
  }
}
