import { projectFirestore } from './firebase'; // Import your Firestore instance

// Function to add a new task to Firestore
export const addTask = async (taskText) => {
  try {
    const tasksRef = projectFirestore.collection('tasks');
    await tasksRef.add({
      text: taskText,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error adding task: ', error);
  }
};

// Function to delete a task from Firestore
export const deleteTask = async (taskId) => {
  try {
    const taskRef = projectFirestore.collection('tasks').doc(taskId);
    await taskRef.delete();
  } catch (error) {
    console.error('Error deleting task: ', error);
  }
};

// Function to edit a task in Firestore
export const editTask = async (taskId, newText) => {
  try {
    const taskRef = projectFirestore.collection('tasks').doc(taskId);
    await taskRef.update({
      text: newText,
    });
  } catch (error) {
    console.error('Error editing task: ', error);
  }
};