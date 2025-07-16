import axios from 'axios';
import { Post, CreatePostData, UpdatePostData } from '@/types/post';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const postsApi = {
  // Get all posts
  getAllPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts/');
    return response.data;
  },

  // Get single post by ID
  getPost: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create a new post
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post('/posts/', data);
    return response.data;
  },

  // Update an existing post
  updatePost: async (id: number, data: UpdatePostData): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  // Delete a post
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};
