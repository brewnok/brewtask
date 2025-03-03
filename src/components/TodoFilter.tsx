import React from 'react';

type FilterType = 'all' | 'active' | 'completed';

interface TodoFilterProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  todoCount: {
    total: number;
    active: number;
    completed: number;
  };
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange, todoCount }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-3 rounded-lg shadow-sm">
      <div className="text-sm text-gray-600 mb-3 sm:mb-0">
        {todoCount.total} tasks ({todoCount.active} active, {todoCount.completed} completed)
      </div>
      
      <div className="flex space-x-2">
        <FilterButton 
          active={filter === 'all'} 
          onClick={() => onFilterChange('all')}
          label="All"
        />
        <FilterButton 
          active={filter === 'active'} 
          onClick={() => onFilterChange('active')}
          label="Active"
        />
        <FilterButton 
          active={filter === 'completed'} 
          onClick={() => onFilterChange('completed')}
          label="Completed"
        />
      </div>
    </div>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ active, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-md text-sm transition-colors ${
        active
          ? 'bg-amber-500 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );
};

export default TodoFilter;