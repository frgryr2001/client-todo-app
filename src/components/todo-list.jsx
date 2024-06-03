import { useTodos } from './useTodos';
import { useId, useState } from 'react';
import { Trash } from 'lucide-react';
import { useDeleteTodoItem } from './useDeleteTodoItem';
import { useQueryClient } from '@tanstack/react-query';
import { notifySuccess } from '../utils/notify';
import { useUpdateTodoItem } from './useUpdateTodoItem';

const parsedTimeToSecond = (time) => new Date(time).getTime();
export function TodoList() {
  const { todos, isPending } = useTodos();

  if (isPending) {
    return <div>Loading...</div>;
  }
  const sortedTodos = todos.sort((a, b) => {
    // Sort todos by updatedAt time in descending order
    return parsedTimeToSecond(b.updatedAt) - parsedTimeToSecond(a.updatedAt);
  });
  return (
    <fieldset className="border-b border-t border-gray-200">
      <legend className="sr-only">TodoList</legend>
      <div className="divide-y divide-gray-200">
        {todos.length > 0 ? (
          sortedTodos.map((todo) => <TodoItem key={todo._id} {...todo} />)
        ) : (
          <div className="text-center text-gray-500">No todos found</div>
        )}
      </div>
    </fieldset>
  );
}

function TodoItem({ _id, title, description, completed }) {
  const queryClient = useQueryClient();
  const idInput = useId();
  const { deleteTodo, isPending: isDeletingPending } = useDeleteTodoItem();
  const { updateTodo, isPending: isUpdatePending } = useUpdateTodoItem();
  const [isChecked, setIsChecked] = useState(completed);

  const styledCheckbox = isChecked ? ' line-through text-gray-400' : '';

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    updateTodo(
      {
        id: _id,
        completed: !isChecked,
      },
      {
        onSuccess: () => {
          notifySuccess('Todo updated successfully');
          queryClient.invalidateQueries({
            queryKey: ['todos'],
          });
        },
      }
    );
  };

  return (
    <div className="relative flex items-start pb-4 pt-3.5">
      <div className="min-w-0 flex-1 text-sm leading-6">
        <label
          htmlFor="offers"
          className={'font-medium text-gray-900' + styledCheckbox}
        >
          {title}
        </label>
        <p id="offers-description" className="text-gray-500">
          {description}
        </p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className=" flex h-6 items-center">
          <input
            id={idInput}
            aria-describedby="offers-description"
            name={idInput + '-name'}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
        <button
          disabled={isDeletingPending}
          onClick={() =>
            deleteTodo(_id, {
              onSuccess: () => {
                notifySuccess('Todo deleted successfully');
                queryClient.invalidateQueries({
                  queryKey: ['todos'],
                });
              },
            })
          }
        >
          <Trash size={16} color="red" />
        </button>
      </div>
    </div>
  );
}
