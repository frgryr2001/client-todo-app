import { useMutation } from '@tanstack/react-query';
import { updateTodo } from '../data/todos';

export const useUpdateTodoItem = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (todo) => {
      await updateTodo(todo);
    },
  });
  return {
    updateTodo: mutate,
    isPending,
  };
};
