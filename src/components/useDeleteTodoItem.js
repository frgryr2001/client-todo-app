import { deleteTodo } from '../data/todos';
import { useMutation } from '@tanstack/react-query';

export const useDeleteTodoItem = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (id) => {
      await deleteTodo(id);
    },
  });
  return {
    deleteTodo: mutate,
    isPending,
  };
};
