import { notifySuccess } from '../utils/notify';
import { useCreateTodoItem } from './useCreateTodoItem';
import { useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
export function FormCreateTodo() {
  const { createTodo, isPending } = useCreateTodoItem();
  const formRef = useRef(null);
  const queryClient = useQueryClient();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const title = formData.get('title');
    const description = formData.get('description');

    createTodo(
      {
        title,
        description,
      },
      {
        onSuccess: () => {
          notifySuccess('Todo created successfully');
          queryClient.invalidateQueries({
            queryKey: ['todos'],
          });
          formRef.current.reset();
        },
      }
    );
  };
  return (
    <form
      className="space-y-4 flex flex-col"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {/* input */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Title
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="title"
            id="title"
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="title"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Description
        </label>
        <div className="mt-2">
          <textarea
            rows={4}
            name="description"
            id="description"
            placeholder="Description"
            className="block w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={''}
          />
        </div>
      </div>
      <button
        disabled={isPending}
        type="submit"
        className=" rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isPending ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
}
