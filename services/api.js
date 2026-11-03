const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const api = {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Falha na requisição');
    return response.json();
  },
  
  async create(endpoint, data) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    });
    if (!response.ok) throw new Error('Erro ao criar aviso');
    return response.json();
  }
};