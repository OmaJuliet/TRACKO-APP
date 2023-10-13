import React, { Key, useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth } from '../../firebase';
import Modal from 'react-modal';

interface Task {
  deleted: any;
  id: Key | null | undefined;
  title: string;
  detail: string;
  member: string;
  priority: string;
  dueDate: Date | null;
}

const Todo: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetail, setTaskDetail] = useState('');
  const [taskMember, setTaskMember] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [taskDueDate, setTaskDueDate] = useState<Date | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const authUser = auth.currentUser;

  //
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);

  const firestore = getFirestore();

  const openAddTaskModal = () => {
    setModalTask(null); // Reset the modalTask
    setIsModalOpen(true);
  };

  // Function to open the modal for editing an existing task
  const openEditTaskModal = (task: Task) => {
    setModalTask(task);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case 'title':
        setTaskTitle(value);
        break;
      case 'detail':
        setTaskDetail(value);
        break;
      case 'member':
        setTaskMember(value);
        break;
      case 'priority':
        setTaskPriority(value);
        break;
      case 'dueDate':
        setTaskDueDate(value ? new Date(value) : null);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isEditing && editingTaskId) {
      // Edit an existing task
      const taskRef = doc(firestore, 'tasks', editingTaskId);
      await setDoc(taskRef, {
        title: taskTitle,
        detail: taskDetail,
        member: taskMember,
        priority: taskPriority,
        dueDate: taskDueDate,
      });
      setIsEditing(false);
      setEditingTaskId(null);
    } else {
      // Add a new task
      await addDoc(collection(firestore, 'tasks'), {
        title: taskTitle,
        detail: taskDetail,
        member: taskMember,
        priority: taskPriority,
        dueDate: taskDueDate,
        createdBy: authUser?.uid,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }

    setTaskTitle('');
    setTaskDetail('');
    setTaskMember('');
    setTaskPriority('low');
    setTaskDueDate(null);
  };

  const startEditingTask = (taskId: string, task: Task) => {
    setIsEditing(true);
    setEditingTaskId(taskId);
    setTaskTitle(task.title);
    setTaskDetail(task.detail);
    setTaskMember(task.member);
    setTaskPriority(task.priority);
    setTaskDueDate(task.dueDate || null);
  };

  const cancelEditingTask = () => {
    setIsEditing(false);
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskDetail('');
    setTaskMember('');
    setTaskPriority('low');
    setTaskDueDate(null);
  };

  const deleteTask = async (taskId: string) => {
    const taskRef = doc(firestore, 'tasks', taskId);
    await setDoc(taskRef, { deleted: true }, { merge: true });
  };

  useEffect(() => {
    const tasksCollection = collection(firestore, 'tasks');
    const queryTasks = query(
      tasksCollection,
      orderBy('createdAt', 'desc'),
      // You can add additional queries here, e.g., filtering by createdBy
    );

    const unsubscribe = onSnapshot(queryTasks, (querySnapshot) => {
      const updatedTasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Task;
        if (!data.deleted) {
          updatedTasks.push({ ...data, id: doc.id });
        }
      });
      setTasks(updatedTasks);
    });

    return () => unsubscribe();
  }, [firestore]);

  return (
    <div className="todo-container">
      <h1 className="todo-header">Task List</h1>

      <button onClick={openAddTaskModal}>Add Task</button>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task">
            <div className="task-header">
              <span>{task.title}</span>
              <div>
                <button onClick={() => openEditTaskModal(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
            <p>{task.detail}</p>
            <p>Assigned to: {task.member}</p>
            <p>Priority: {task.priority}</p>
            <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add/Edit Task"
      >
        <h2>{modalTask ? 'Edit Task' : 'Add Task'}</h2>
        {/* Render your form for adding/editing tasks here */}
        <form className="task-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={taskTitle}
            onChange={handleChange}
            required
          />
          <textarea
            name="detail"
            placeholder="Task Detail"
            value={taskDetail}
            onChange={handleChange}
          />
          <select
            name="member"
            value={taskMember}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Assign Member
            </option>
            {/* Replace with actual user names from your app */}
            <option value="User 1">User 1</option>
            <option value="User 2">User 2</option>
          </select>
          <select
            name="priority"
            value={taskPriority}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={taskDueDate ? taskDueDate.toISOString().substr(0, 10) : ''}
            onChange={handleChange}
          />
          <button type="submit">{isEditing ? 'Save' : 'Add Task'}</button>
          {isEditing && (
            <button type="button" onClick={cancelEditingTask}>
              Cancel
            </button>
          )}
        </form>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default Todo;
