import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environments/environment';

interface NewsArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

@Component({
  selector: 'app-climatenews',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './climatenews.component.html',
  styleUrl: './climatenews.component.css'
})
export class ClimatenewsComponent implements OnInit {
  articles: NewsArticle[] = [];
  loading = true;
  error = false;
  errorMessage = '';

  private readonly API_URL = environment.newsApi.apiUrl;
  private readonly API_KEY = environment.newsApi.apiKey;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.fetchClimateNews();
  }

  fetchClimateNews() {
    this.loading = true;
    this.error = false;

    const params = {
      q: 'climate environment',
      apiKey: this.API_KEY,
      pageSize: '20',
      sortBy: 'publishedAt',
      language: 'en'
    };

    this.http.get<NewsResponse>(this.API_URL, { params }).subscribe({
      next: (response) => {
        this.articles = response.articles.filter(article => 
          article.title && article.description && article.title !== '[Removed]'
        );
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching climate news:', err);
        this.error = true;
        this.errorMessage = 'Failed to load climate news. Please try again later.';
        this.loading = false;
      }
    });
  }

  getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  openArticle(url: string) {
    window.open(url, '_blank');
  }

  goBack() {
    this.router.navigate([this.authService.getRoleDashboard()]);
  }

  logout() {
    this.authService.logout();
  }

  retry() {
    this.fetchClimateNews();
  }
}
