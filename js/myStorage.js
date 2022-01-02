import { handleError, throwError, defaultPromise } from './utils.js';

export const getTodos = () => {
  const todos = localStorage.getItem('2Do');
  if (!todos) {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }
  return new Promise((resolve, reject) => {
    resolve(JSON.parse(todos));
  });
};

export const addTodo = async (todos, payload) => {
  const initTodos = todos ? todos : []; // 초기화
  localStorage.setItem('2Do', JSON.stringify(initTodos.concat(payload)));
  return defaultPromise;
};

export const toggleTodo = async (id) => {
  const [todosError, todos] = await handleError(getTodos());
  if (todosError) {
    throwError('할 일 목록 조회');
  }

  localStorage.setItem(
    '2Do',
    JSON.stringify(
      todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo,
      ),
    ),
  );
  return defaultPromise;
};

export const deleteTodo = async (id) => {
  const [todosError, todos] = await handleError(getTodos());
  if (todosError) {
    throwError('할 일 목록 조회');
  }

  localStorage.setItem(
    '2Do',
    JSON.stringify(todos.filter((todo) => todo.id !== id)),
  );
  return defaultPromise;
};

export const deleteCompletedTodos = async () => {
  const [todosError, todos] = await handleError(getTodos());
  if (todosError) {
    throwError('할 일 목록 조회');
  }

  localStorage.setItem(
    '2Do',
    JSON.stringify(todos.filter((todo) => !todo.complete)),
  );
  return defaultPromise;
};

export const editTodo = async (todos, payload) => {
  const { id, title } = payload;
  localStorage.setItem(
    '2Do',
    JSON.stringify(
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)),
    ),
  );
  return defaultPromise;
};
