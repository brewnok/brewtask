import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';

interface TodoFormProps {
  onAdd: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
    <input
      type="text"
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Add a new task..."
      className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent h-12"
    />
    <button
      type="submit"
      className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-r-lg transition-colors flex items-center h-12"
    >
      <PlusCircle size={20} className="mr-1" />
      Add
    </button>
  </form>
  );
};

export default TodoForm;