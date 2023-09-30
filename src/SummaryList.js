import React from 'react';

function TaskList({
  tasks,
  editingTaskId,
  editedTaskText,
  onEditTask,
  onDeleteTask,
  onEditInputChange,
  onEditStart,
}) {
  return (
    <ol>
      {tasks.map((task) => (
        <li key={task.id}>
          {editingTaskId === task.id ? (
            <>
              <input
                type="text"
                value={editedTaskText}
                onChange={onEditInputChange}
              />
              <button onClick={() => onEditTask(task.id, editedTaskText)}>
                Zapisz
              </button>
            </>
          ) : (
            <>
              <p>{task.text}</p>
              <button onClick={() => onDeleteTask(task.id)}>Usuń</button>
              <button onClick={() => onEditStart(task.id)}>Edytuj</button>
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export default TaskList;