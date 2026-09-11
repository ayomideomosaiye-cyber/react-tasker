import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useState, useEffect, useRef } from 'react';
function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDate, setFilterDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const hasLoaded = useRef(false);
  const [theme, setTheme] = useState('dark');
  const categoryColors = {
  Personal: '#00f5d4',
  Work: '#00d9ff',
  Urgent: '#ff6b6b',
  Other: '#7b2cbf',
};
  function addTask() {
  if (input.trim() === '') {
    return;
  }
  setTasks([...tasks, { text: input, completed: false, category, dueDate }]);
  setInput('');
  setDueDate('');
}
function toggleComplete(index) {
  const updated = [...tasks];
  updated[index].completed = !updated[index].completed;
  setTasks(updated);
}

function deleteTask(index) {
  setTasks(tasks.filter((task, i) => i !== index));
}
function deleteCompleted() {
  setTasks(tasks.filter((task) => !task.completed));
}
function handleDragEnd(result) {
  if (!result.destination) return;
  const reordered = [...tasks];
  const [moved] = reordered.splice(result.source.index, 1);
  reordered.splice(result.destination.index, 0, moved);
  setTasks(reordered);
}
const isFiltering = searchText.trim() !== '' || filterCategory !== 'All' || filterDate !== '';

const visibleTasks = tasks
.map((task, OriginalIndex) => ({ ...task, OriginalIndex }))
.filter((task) => {
  const matchesSearch = task.text.toLowerCase().includes(searchText.toLowerCase());
  const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
  const matchesDate = filterDate === '' || task.dueDate === filterDate;
  return matchesSearch && matchesCategory && matchesDate;
});
const isFirstRun = useRef(true);
const isThemeFirstRun = useRef(true);
const completedCount = tasks.filter((task) => task.completed).length;
const totalCount = tasks.length;

useEffect(() => {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setTasks(parsed);
    } catch {
      setTasks([]);
    }
  }
}, []);

useEffect(() => {
  if (isFirstRun.current) {
    isFirstRun.current = false;
    return;
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);
useEffect(() => {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved);
}, []);

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  if (isThemeFirstRun.current) {
    isThemeFirstRun.current = false;
    return;
  }
  localStorage.setItem('theme', theme);
}, [theme]);
function isOverdue(task) {
  if (!task.dueDate || task.completed) return false;
  const today = new Date().toISOString().split('T')[0];
  return task.dueDate < today;
}

  return (
    <div className="app">
      <h1>Get Things Done</h1>
      {totalCount > 0 && (
  <p className="task-counter">
    {completedCount} of {totalCount} completed
  </p>
)}
      <button
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  className="theme-toggle"
>
  {theme === 'dark' ? '☀️' : '🌙'}
</button>
            <div className="task-form">
        <div className="input-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
      if (e.key === 'Enter') {
        addTask();
      }
    }}
        />
        <button onClick={addTask}>Add</button>
        <div className="date field">
          <label>Due date</label>
        <input
    type="date"
    value={dueDate}
    onChange={(e) => setDueDate(e.target.value)}
    className="date-input"
  />
  </div>
        </div>
        <div className="category-picker">
    {Object.keys(categoryColors).map((cat) => (
      <span
        key={cat}
        className={`pill ${category === cat ? 'pill-active' : ''}`}
        style={category === cat ? { background: categoryColors[cat] } : {}}
        onClick={() => setCategory(cat)}
      >
        {cat}
      </span>
    ))}
  </div>
      </div>
{tasks.length > 0 && (
  <div className="task-controls">
    <div className="search-row">
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      <button
        onClick={() => setShowFilters(!showFilters)}
        className={`filter-toggle ${isFiltering ? 'has-active' : ''}`}
      >
        ⚙ Filters
      </button>
    </div>

    {showFilters && (
      <div className="filter-panel">
        <div className="category-picker">
          {['All', ...Object.keys(categoryColors)].map((cat) => (
            <span
              key={cat}
              className={`pill ${filterCategory === cat ? 'pill-active' : ''}`}
              style={filterCategory === cat ? { background: '#00d9ff' } : {}}
              onClick={() => setFilterCategory(cat)}
            >
              {cat}
            </span>
          ))}
        </div>
        <div className="date-field">
          <label>Filter by date</label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="date-input"
          />
        </div>
        {isFiltering && (
          <button
            onClick={() => { setFilterCategory('All'); setFilterDate(''); setSearchText(''); }}
            className="clear-date"
          >
            ✕ Clear all filters
          </button>
        )}
      </div>
    )}
  </div>
)}
      <DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="tasks">
    {(provided) => (
      <ul {...provided.droppableProps} ref={provided.innerRef}>
        {tasks.length === 0 && (
          <p className="empty-state">No tasks yet — what are you waiting for? 👀</p>
        )}
        {visibleTasks.length === 0 && tasks.length > 0 && (
          <p className="empty-state">No tasks match your search.</p>
        )}
        <AnimatePresence>  
        {visibleTasks.map((task, index) => (
          <Draggable key={index} draggableId={String(index)} index={index} isDragDisabled={isFiltering}>
            {(provided) => (
              <motion.li
  ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.2 }}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.OriginalIndex)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none',
                opacity: task.completed ? 0.5 : 1,
  color: task.completed ? '#b0b0b0' : '#fff',
}}>
                  {task.text}
                </span>
                <span className="badge" style={{ color: categoryColors[task.category], background: categoryColors[task.category] +"22" }}>
  {task.category}
</span>
{task.dueDate && (
  <span className={`due-date ${isOverdue(task) ? 'overdue' : ''}`}>
    {isOverdue(task) ? '⚠ ' : ''}{task.dueDate}
  </span>
)}
                <button onClick={() => deleteTask(task.OriginalIndex)}>Delete</button>
                       </motion.li>
        )}
      </Draggable>
    ))}
  </AnimatePresence>
  {provided.placeholder}
</ul>
    )}
  </Droppable>
</DragDropContext>
{tasks.some((task) => task.completed) && (
  <button onClick={deleteCompleted} className="delete-completed">
    Delete Completed
  </button>
)}
    </div>
  );
}

export default App;
 