import React from 'react';

function TaskList2({ tasks }) {
  return (
   
    <ol>
      {tasks.map((task) => (
        <li key={task.id} className='list-item'>
          <p>{task.text}</p>
        </li>
      ))}
    </ol>
    
  );
}

export default TaskList2;