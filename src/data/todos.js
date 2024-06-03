const url = 'https://todo-app-tl6a.onrender.com/api/v1/todos';

export const fetchTodos = async () => {
  const response = await fetch(url + '/all', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const createTodo = async (todo) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};

export const deleteTodo = async (id) => {
  const response = await fetch(url + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export const updateTodo = async (todo) => {
  const response = await fetch(url + `/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return response.json();
};
