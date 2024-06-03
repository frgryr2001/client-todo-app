import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FormCreateTodo } from './components/form-create-todo';
import { TodoList } from './components/todo-list';
import { Toaster } from 'react-hot-toast';
// Create a client
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="max-w-2xl mx-auto mt-10 space-y-6">
        <h1 className="text-lg text-center font-bold">Todo App</h1>
        <FormCreateTodo />
        <TodoList />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
