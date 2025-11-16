import { Injectable } from '@angular/core';

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
  gradient: string;
  category: string;
  liked?: boolean;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    {
      id: '1',
      title: 'Water Pollution Crisis',
      content: 'Our rivers and oceans are facing unprecedented pollution levels. Plastic waste, industrial discharge, and agricultural runoff are destroying aquatic ecosystems. We need immediate action to protect our water sources.',
      author: 'Environmental Watch',
      timestamp: new Date('2024-11-16T10:00:00'),
      likes: 45,
      comments: [
        {
          id: 'c1',
          author: 'John Doe',
          content: 'This is alarming! We need to act now.',
          timestamp: new Date('2024-11-16T11:00:00')
        }
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      category: 'Water',
      liked: false
    },
    {
      id: '2',
      title: 'River Cleanup Success',
      content: 'Amazing turnout at yesterday\'s river cleanup event! Over 200 volunteers removed 2 tons of waste from the Nairobi River. Together we can make a difference!',
      author: 'Green Warriors',
      timestamp: new Date('2024-11-15T14:30:00'),
      likes: 32,
      comments: [],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      category: 'Community',
      liked: false
    },
    {
      id: '3',
      title: 'Community Board Updates',
      content: 'New recycling bins have been installed in 5 neighborhoods. Check our map to find the nearest location. Let\'s make recycling easier for everyone!',
      author: 'City Council',
      timestamp: new Date('2024-11-14T09:00:00'),
      likes: 28,
      comments: [],
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      category: 'Infrastructure',
      liked: false
    }
  ];

  constructor() {}

  getAllPosts(): Post[] {
    return this.posts;
  }

  getPostById(id: string): Post | undefined {
    return this.posts.find(p => p.id === id);
  }

  toggleLike(postId: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      if (post.liked) {
        post.likes--;
        post.liked = false;
      } else {
        post.likes++;
        post.liked = true;
      }
    }
  }

  addComment(postId: string, content: string, author: string): void {
    const post = this.posts.find(p => p.id === postId);
    if (post) {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        author,
        content,
        timestamp: new Date()
      };
      post.comments.push(newComment);
    }
  }
}
