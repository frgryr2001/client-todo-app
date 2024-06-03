import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../data/todos';
export const useTodos = () => {
  const { data, isPending } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => await fetchTodos(),
  });

  return {
    todos: data,
    isPending,
  };
};
