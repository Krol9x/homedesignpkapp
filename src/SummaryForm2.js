import React, { useState, useEffect } from 'react';
import { addTask, deleteTask, editTask } from './SummaryForm';
import { projectFirestore } from './firebase';
import './css/summaryform.css';
import TaskList from './SummaryList';
import TaskList2 from './SummaryList2';


function SummaryForm2() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState(''); // New state for edited task text

  useEffect(() => {
    const unsubscribe = projectFirestore
      .collection('tasks')
      .orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        const updatedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(updatedTasks);
      });

    return () => unsubscribe();
  }, []);

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
  };

  const handleEditTask = (taskId, newText) => {
    editTask(taskId, newText);
    setEditingTaskId(null);
    setEditedTaskText(''); // Clear the edited task text after editing
  };

  return (
    <div>
      <div className='formStepByStep'>
        <div className='formStepOne'>
          <input
            type="text"
            placeholder="Wprowadź Krok"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </div>
        <button onClick={handleAddTask}>Dodaj</button>
      </div>

      <TaskList
        tasks={tasks}
        editingTaskId={editingTaskId}
        editedTaskText={editedTaskText} // Pass the edited task text as a prop
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
        onEditInputChange={(e) => setEditedTaskText(e.target.value)} // Update editedTaskText
        onEditStart={(taskId) => {
          setEditingTaskId(taskId);
          // Initialize editedTaskText with the current task text when editing starts
          const taskToEdit = tasks.find((task) => task.id === taskId);
          if (taskToEdit) {
            setEditedTaskText(taskToEdit.text);
          }
        }}
      />
    </div>
  );
}

export default SummaryForm2;
