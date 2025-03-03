import React from 'react';
import { Check, Trash2, Edit } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() !== '') {
      onEdit(todo.id, editText);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <li className="flex items-center justify-between p-3 mb-2 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 mr-3 rounded-full flex items-center justify-center border ${
            todo.completed
              ? 'bg-amber-500 border-amber-600 text-white'
              : 'border-gray-300 hover:border-amber-500'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>
        
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-1 p-1 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
            autoFocus
          />
        ) : (
          <span 
            className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex space-x-2">
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="text-gray-500 hover:text-amber-600 transition-colors"
          aria-label="Edit todo"
        >
          <Edit size={18} />
        </button>
        <button 
          onClick={() => onDelete(todo.id)} 
          className="text-gray-500 hover:text-red-600 transition-colors"
          aria-label="Delete todo"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;