import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadNotices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get('/posts?_limit=10');
      
      const avisosTraduzidos = data.map((item, index) => ({
        id: item.id,
        title: `Aviso Acadêmico #${index + 1}`,
        body: 'Lembre-se de rever a matéria desta semana! O prazo para entrega das atividades no portal está a aproximar-se. Mantenha o foco e bons estudos!'
      }));
      
      setNotices(avisosTraduzidos);
    } catch (err) {
      setError(err.message || 'Erro ao carregar avisos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  return { notices, isLoading, error, reload: loadNotices };
}