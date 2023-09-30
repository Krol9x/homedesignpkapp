import React, { useState, useEffect } from 'react';
import './css/summary.css';
import TaskList2 from './SummaryList2'; // Import TaskList2 component
import { projectFirestore } from './firebase'; // Import your Firebase configuration

const Summary = () => {
  const [tasks, setTasks] = useState([]); // State to store the fetched tasks

  useEffect(() => {
    // Fetch tasks from Firestore
    const unsubscribe = projectFirestore
      .collection('tasks')
      .orderBy('timestamp', 'asc') // Adjust the query as needed
      .onSnapshot((snapshot) => {
        const updatedTasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(updatedTasks);
      });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <div className="container">
      <div className="left-panel"></div>
      <div className="right-panel">
        {/* Include the TaskList2 component and pass the fetched tasks */}
        <TaskList2 tasks={tasks} />
      </div>
      <div className="bottom-panel"></div>
    </div>
  );
};

export default Summary;
