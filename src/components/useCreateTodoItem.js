import { useMutation } from '@tanstack/react-query';
import { createTodo } from '../data/todos';

export const useCreateTodoItem = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (todo) => {
      await createTodo(todo);
    },
  });
  return {
    createTodo: mutate,
    isPending,
  };
};
