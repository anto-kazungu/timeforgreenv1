import { Injectable } from '@angular/core';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  donorCount: number;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'completed' | 'paused' | 'cancelled';
  organizerId: string;
  organizerName: string;
  location: string;
  images: string[];
  updates: ProjectUpdate[];
  gradient: string;
  imageUrl: string;
  backers: number;
  daysLeft: number;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  date: Date;
  images?: string[];
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  date: Date;
  message?: string;
  isAnonymous: boolean;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'failed';
  taxReceiptId?: string;
}

export interface DonationImpact {
  totalDonated: number;
  projectsFunded: number;
  livesImpacted: number;
  co2Reduced: number;
  treesPlanted: number;
  wasteRecycled: number;
}

export interface CommunityNeed {
  id: string;
  title: string;
  description: string;
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  estimatedCost: number;
  communityId: string;
  communityName: string;
  requestedBy: string;
  dateRequested: Date;
  status: 'open' | 'funded' | 'in-progress' | 'completed';
  fundedAmount: number;
  backers: number;
}

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private projects: Project[] = [
    {
      id: '1',
      title: 'Solar Panels for Rural Schools',
      description: 'Installing solar panel systems in 10 rural schools to provide clean energy and reduce electricity costs.',
      category: 'renewable-energy',
      targetAmount: 50000,
      currentAmount: 32500,
      donorCount: 45,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'active',
      organizerId: 'org-1',
      organizerName: 'Green Energy Initiative',
      location: 'Rural Kenya',
      images: ['solar1.jpg', 'solar2.jpg'],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500',
      backers: 45,
      daysLeft: 44,
      updates: [
        {
          id: 'u1',
          title: 'First 3 Schools Completed',
          content: 'We have successfully installed solar panels in the first 3 schools, providing clean energy to over 500 students.',
          date: new Date('2024-10-15'),
          images: ['update1.jpg']
        }
      ]
    },
    {
      id: '2',
      title: 'Community Recycling Center',
      description: 'Building a modern recycling facility to process plastic waste and create jobs in the local community.',
      category: 'waste-management',
      targetAmount: 75000,
      currentAmount: 18750,
      donorCount: 23,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2025-01-31'),
      status: 'active',
      organizerId: 'org-2',
      organizerName: 'Waste Warriors',
      location: 'Nairobi, Kenya',
      images: ['recycling1.jpg'],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500',
      backers: 23,
      daysLeft: 75,
      updates: []
    },
    {
      id: '3',
      title: 'Urban Tree Planting Initiative',
      description: 'Planting 1000 indigenous trees in urban areas to improve air quality and create green spaces.',
      category: 'tree-planting',
      targetAmount: 25000,
      currentAmount: 25000,
      donorCount: 78,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-11-30'),
      status: 'completed',
      organizerId: 'org-3',
      organizerName: 'Urban Forest Project',
      location: 'Mombasa, Kenya',
      images: ['trees1.jpg', 'trees2.jpg'],
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
      backers: 78,
      daysLeft: 0,
      updates: [
        {
          id: 'u2',
          title: 'Project Completed Successfully!',
          content: 'We have planted all 1000 trees across 5 urban locations. Thank you to all our donors!',
          date: new Date('2024-11-10')
        }
      ]
    }
  ];

  private donations: Donation[] = [
    {
      id: '1',
      donorId: 'donor-1',
      donorName: 'David Philanthropist',
      projectId: '1',
      projectTitle: 'Solar Panels for Rural Schools',
      amount: 5000,
      date: new Date('2024-11-01'),
      message: 'Happy to support clean energy for education!',
      isAnonymous: false,
      paymentMethod: 'Credit Card',
      status: 'completed',
      taxReceiptId: 'TR-2024-001'
    },
    {
      id: '2',
      donorId: 'donor-1',
      donorName: 'David Philanthropist',
      projectId: '3',
      projectTitle: 'Urban Tree Planting Initiative',
      amount: 1000,
      date: new Date('2024-10-15'),
      message: 'Trees are the future!',
      isAnonymous: false,
      paymentMethod: 'Bank Transfer',
      status: 'completed',
      taxReceiptId: 'TR-2024-002'
    }
  ];

  private communityNeeds: CommunityNeed[] = [
    {
      id: '1',
      title: 'Water Filtration System',
      description: 'Community needs a water filtration system to provide clean drinking water.',
      category: 'Water',
      urgency: 'high',
      estimatedCost: 15000,
      communityId: 'comm-1',
      communityName: 'Campus Eco',
      requestedBy: 'Community Leader',
      dateRequested: new Date('2024-11-10'),
      status: 'open',
      fundedAmount: 0,
      backers: 0
    },
    {
      id: '2',
      title: 'Composting Equipment',
      description: 'Equipment needed to start a community composting program.',
      category: 'Waste Management',
      urgency: 'medium',
      estimatedCost: 8000,
      communityId: 'comm-2',
      communityName: 'Green Chances',
      requestedBy: 'Sarah Johnson',
      dateRequested: new Date('2024-11-05'),
      status: 'open',
      fundedAmount: 2000,
      backers: 3
    }
  ];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedProjects = localStorage.getItem('donationProjects');
    if (savedProjects) {
      this.projects = JSON.parse(savedProjects).map((p: any) => ({
        ...p,
        startDate: new Date(p.startDate),
        endDate: new Date(p.endDate),
        updates: p.updates.map((u: any) => ({
          ...u,
          date: new Date(u.date)
        }))
      }));
    } else {
      this.saveToStorage();
    }

    const savedDonations = localStorage.getItem('donations');
    if (savedDonations) {
      this.donations = JSON.parse(savedDonations).map((d: any) => ({
        ...d,
        date: new Date(d.date)
      }));
    }

    const savedNeeds = localStorage.getItem('communityNeeds');
    if (savedNeeds) {
      this.communityNeeds = JSON.parse(savedNeeds).map((n: any) => ({
        ...n,
        dateRequested: new Date(n.dateRequested)
      }));
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('donationProjects', JSON.stringify(this.projects));
    localStorage.setItem('donations', JSON.stringify(this.donations));
    localStorage.setItem('communityNeeds', JSON.stringify(this.communityNeeds));
  }

  // Project Methods
  getAllProjects(): Project[] {
    return this.projects;
  }

  getActiveProjects(): Project[] {
    return this.projects.filter(p => p.status === 'active');
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(p => p.id === id);
  }

  createProject(project: Omit<Project, 'id' | 'currentAmount' | 'donorCount' | 'updates'>): Project {
    const newProject: Project = {
      ...project,
      id: this.generateId(),
      currentAmount: 0,
      donorCount: 0,
      updates: []
    };

    this.projects.push(newProject);
    this.saveToStorage();
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): boolean {
    const index = this.projects.findIndex(p => p.id === id);
    if (index > -1) {
      this.projects[index] = { ...this.projects[index], ...updates };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  addProjectUpdate(projectId: string, update: Omit<ProjectUpdate, 'id' | 'date'>): boolean {
    const project = this.getProjectById(projectId);
    if (project) {
      const newUpdate: ProjectUpdate = {
        ...update,
        id: this.generateId(),
        date: new Date()
      };
      project.updates.push(newUpdate);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Donation Methods
  getAllDonations(): Donation[] {
    return this.donations;
  }

  getDonationsByDonor(donorId: string): Donation[] {
    return this.donations.filter(d => d.donorId === donorId);
  }

  getDonationsByProject(projectId: string): Donation[] {
    return this.donations.filter(d => d.projectId === projectId);
  }

  makeDonation(donation: Omit<Donation, 'id' | 'date' | 'status' | 'taxReceiptId'>): Donation {
    const newDonation: Donation = {
      ...donation,
      id: this.generateId(),
      date: new Date(),
      status: 'completed',
      taxReceiptId: `TR-${new Date().getFullYear()}-${String(this.donations.length + 1).padStart(3, '0')}`
    };

    this.donations.push(newDonation);

    // Update project funding
    const project = this.getProjectById(donation.projectId);
    if (project) {
      project.currentAmount += donation.amount;
      project.donorCount++;
      
      // Check if project is fully funded
      if (project.currentAmount >= project.targetAmount && project.status === 'active') {
        project.status = 'completed';
      }
    }

    this.saveToStorage();
    return newDonation;
  }

  // Community Needs Methods
  getAllCommunityNeeds(): CommunityNeed[] {
    return this.communityNeeds;
  }

  getOpenNeeds(): CommunityNeed[] {
    return this.communityNeeds.filter(n => n.status === 'open');
  }

  createCommunityNeed(need: Omit<CommunityNeed, 'id' | 'dateRequested' | 'fundedAmount'>): CommunityNeed {
    const newNeed: CommunityNeed = {
      ...need,
      id: this.generateId(),
      dateRequested: new Date(),
      fundedAmount: 0
    };

    this.communityNeeds.push(newNeed);
    this.saveToStorage();
    return newNeed;
  }

  fundCommunityNeed(needId: string, amount: number, donorId: string): boolean {
    const need = this.communityNeeds.find(n => n.id === needId);
    if (need && need.status === 'open') {
      need.fundedAmount += amount;
      
      if (need.fundedAmount >= need.estimatedCost) {
        need.status = 'funded';
      }

      // Create a donation record
      this.donations.push({
        id: this.generateId(),
        donorId,
        donorName: 'Anonymous Donor', // Would get from user service
        projectId: needId,
        projectTitle: need.title,
        amount,
        date: new Date(),
        isAnonymous: false,
        paymentMethod: 'Credit Card',
        status: 'completed'
      });

      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Impact Calculation
  getDonorImpact(donorId: string): DonationImpact {
    const donorDonations = this.getDonationsByDonor(donorId);
    const totalDonated = donorDonations.reduce((sum, d) => sum + d.amount, 0);
    const projectsFunded = new Set(donorDonations.map(d => d.projectId)).size;

    // Calculate impact metrics (simplified calculations)
    const livesImpacted = Math.floor(totalDonated / 100); // $100 per life impacted
    const co2Reduced = Math.floor(totalDonated / 50); // $50 per ton CO2 reduced
    const treesPlanted = Math.floor(totalDonated / 25); // $25 per tree
    const wasteRecycled = Math.floor(totalDonated / 10); // $10 per kg waste recycled

    return {
      totalDonated,
      projectsFunded,
      livesImpacted,
      co2Reduced,
      treesPlanted,
      wasteRecycled
    };
  }

  // Utility Methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  getDonorStats(donorId: string) {
    const donations = this.getDonationsByDonor(donorId);
    const impact = this.getDonorImpact(donorId);
    
    return {
      totalDonations: donations.length,
      totalAmount: impact.totalDonated,
      projectsSupported: impact.projectsFunded,
      averageDonation: donations.length > 0 ? impact.totalDonated / donations.length : 0,
      lastDonation: donations.length > 0 ? donations[donations.length - 1].date : null,
      impact
    };
  }

  getProjectProgress(projectId: string): number {
    const project = this.getProjectById(projectId);
    return project ? Math.min((project.currentAmount / project.targetAmount) * 100, 100) : 0;
  }
}