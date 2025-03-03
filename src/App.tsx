import { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { Todo } from './types';
import brewtasklogo from './images/brewtask-logo.png'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('brewtask-todos');
    if (savedTodos) {
      try {
        // Parse the JSON and convert string dates back to Date objects
        return JSON.parse(savedTodos, (key, value) => 
          key === 'createdAt' ? new Date(value) : value
        );
      } catch (e) {
        console.error('Error parsing saved todos:', e);
        return [];
      }
    }
    return [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('brewtask-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date()
      }
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const todoCount = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <img src={brewtasklogo} alt="BrewTask Logo" className="h-24 w-auto" />
        </div>
        </header>

        <main className="bg-white rounded-xl shadow-md p-6">
          <TodoForm onAdd={addTodo} />
          
          {todos.length > 0 && (
            <TodoFilter 
              filter={filter} 
              onFilterChange={setFilter} 
              todoCount={todoCount} 
            />
          )}
          
          <TodoList 
            todos={filteredTodos} 
            onToggle={toggleTodo} 
            onDelete={deleteTodo} 
            onEdit={editTodo} 
          />
          
          {todoCount.completed > 0 && (
            <div className="mt-6 text-right">
              <button 
                onClick={clearCompleted}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Clear completed tasks
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;