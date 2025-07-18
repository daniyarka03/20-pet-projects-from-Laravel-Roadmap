const API_BASE_URL = 'http://localhost:8000/api';

export interface Task {
  id: number;
  name: string;
  description?: string;
  status: 'not_completed' | 'completed';
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

class ApiClient {
  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  }

  // Auth methods
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: 'POST',
      headers: this.getHeaders()
    });
    return this.handleResponse<void>(response);
  }

  async getUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<User>(response);
  }

  // Task methods
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Task[]>(response);
  }

  async getTask(id: number): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Task>(response);
  }

  async createTask(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(task)
    });
    return this.handleResponse<Task>(response);
  }

  async updateTask(id: number, task: Partial<Task>): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(task)
    });
    return this.handleResponse<void>(response);
  }

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    return this.handleResponse<void>(response);
  }
}

export const apiClient = new ApiClient();
