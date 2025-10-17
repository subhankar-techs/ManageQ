const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Something went wrong');
    }
    return response.json();
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(credentials)
    });
    const data = await this.handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async register(userData: { name: string; email: string; password: string }) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    const data = await this.handleResponse(response);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  }

  async getProfile() {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Task methods
  async getTasks(params?: { status?: string; priority?: string }) {
    const queryParams = new URLSearchParams(params as Record<string, string>);
    const response = await fetch(`${API_BASE_URL}/tasks?${queryParams}`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async createTask(taskData: any) {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    return this.handleResponse(response);
  }

  async updateTask(id: string, taskData: any) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(taskData)
    });
    return this.handleResponse(response);
  }

  async deleteTask(id: string) {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async getTaskStats() {
    const response = await fetch(`${API_BASE_URL}/tasks/stats`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Chat methods
  async getChatMessages() {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async sendMessage(message: string) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ message })
    });
    return this.handleResponse(response);
  }

  logout() {
    localStorage.removeItem('token');
  }
}

export default new ApiService();