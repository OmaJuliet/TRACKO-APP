import React, { useEffect, useState } from 'react';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot, doc, setDoc, Timestamp, getDoc } from 'firebase/firestore';
import { auth } from '../../firebase';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';

interface Task {
  deleted: boolean;
  id: string;
  title: string;
  detail: string;
  member: string;
  priority: string;
}

const Todo: React.FC = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDetail, setTaskDetail] = useState('');
  const [taskMember, setTaskMember] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const authUser = auth.currentUser;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTask, setModalTask] = useState<Task | null>(null);

  const firestore = getFirestore();

  const activeTasksCount = tasks.filter((task) => !task.deleted).length;

  const toggleDropdown = (taskId: string) => {
    setShowDropdown(taskId === showDropdown ? null : taskId);
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
      default:
        break;
    }
  };


  const openAddTaskModal = () => {
    setModalTask(null);
    setIsModalOpen(true);
  };

  const openEditTaskModal = (task: Task) => {
    console.log('Editing task:', task);
    setModalTask(task);
    setIsModalOpen(true);
    setIsEditing(true);
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskDetail(task.detail);
    setTaskMember(task.member);
    setTaskPriority(task.priority);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingTaskId(null);
    setTaskTitle('');
    setTaskDetail('');
    setTaskMember('');
    setTaskPriority('low');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isEditing && editingTaskId) {
      try {
        const taskRef = doc(firestore, 'tasks', editingTaskId);
        const existingTask = await getDoc(taskRef);
        if (existingTask.exists()) {
          const updatedData = {
            ...existingTask.data(),
            title: taskTitle,
            detail: taskDetail,
            member: taskMember,
            priority: taskPriority,
          };
          await setDoc(taskRef, updatedData);

          // Update the local state immediately
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editingTaskId
                ? {
                  ...task,
                  title: taskTitle,
                  detail: taskDetail,
                  member: taskMember,
                  priority: taskPriority,
                }
                : task
            )
          );
          setIsEditing(false);
          setEditingTaskId(null);
          setTaskTitle('');
          setTaskDetail('');
          setTaskMember('');
          setTaskPriority('low');
          closeModal();

        }
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    } else {
      try {
        const docRef = await addDoc(collection(firestore, 'tasks'), {
          title: taskTitle,
          detail: taskDetail,
          member: taskMember,
          priority: taskPriority,
          createdBy: authUser?.uid,
          createdAt: Timestamp.fromDate(new Date()),
        });
        const newTask = {
          id: docRef.id,
          title: taskTitle,
          detail: taskDetail,
          member: taskMember,
          priority: taskPriority,
          deleted: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } catch (error) {
        console.error('Error adding document: ', error);
      }

      setTaskTitle('');
      setTaskDetail('');
      setTaskMember('');
      setTaskPriority('low');
      closeModal();
    }
  };


  const deleteTask = async (taskId: string) => {
    const taskRef = doc(firestore, 'tasks', taskId);
    await setDoc(taskRef, { deleted: true }, { merge: true });
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === taskId ? { ...task, deleted: true } : task)));
  };

  useEffect(() => {
    const tasksCollection = collection(firestore, 'tasks');
    const queryTasks = query(tasksCollection, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(queryTasks, (querySnapshot) => {
      const updatedTasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Task;
        if (!data.deleted) {
          const existingTaskIndex = tasks.findIndex((task) => task.id === doc.id);
          if (existingTaskIndex === -1) {
            // Task doesn't exist in local state, so add it
            updatedTasks.push({ ...data, id: doc.id });
          } else {
            // Task already exists in local state, so use the existing data
            updatedTasks.push(tasks[existingTaskIndex]);
          }
        }
      });
      setTasks(updatedTasks);
    }, (error) => {
      console.error('Error fetching tasks: ', error);
    });


    return () => unsubscribe();
  }, [firestore, tasks]);


  return (
    <section className="mb-16">
      <section className="bg-gray-100 rounded-lg p-4 w-full h-4/6 overflow-auto">
        <section className="flex flex-row justify-between border-b-4 border-purple-600 pb-4">
          <section className="flex">
            <span className="bg-purple-600 rounded-full p-1 w-2 h-2 text-sm flex justify-center items-center mt-2"></span>
            <span className="mx-2 text-black">To Do</span>
            <span className="bg-gray-300 rounded-full p-2 w-6 h-6 text-sm flex justify-center items-center">{activeTasksCount}</span>
          </section>
          <figure className="p-1 rounded bg-purple-300">
            <FaPlus className="text-purple-600 cursor-pointer" onClick={openAddTaskModal} />
          </figure>
        </section>

        <section className="mt-6">
          {tasks.length === 0 ? (
            <p className="text-red-500">No task assigned yet</p>
          ) : (
            tasks.map((task) => (
              <section className="bg-white rounded-lg p-4 mt-4" key={task.id}>
                <section className="flex flex-row justify-between">
                  <p className={`text-${task.priority === 'low' ? 'orange' : 'red'}-500 bg-${task.priority === 'low' ? 'orange' : 'red'}-100 text-sm rounded capitalize py-1 px-2`}>
                    {task.priority}
                  </p>
                  <div className="relative inline-block text-left">
                    <button className="p-1" onClick={() => toggleDropdown(task.id)}>
                      <img src="../Assets/Icons/dots.svg" className="" alt="dots" />
                    </button>
                    {showDropdown === task.id && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => openEditTaskModal(task)}
                          >
                            Edit
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                <section className="mt-2">
                  <h1 className="font-semibold text-lg">{task.title}</h1>
                  <p className="text-sm mt-1 text-gray-500">{task.detail}</p>
                  <p className="text-base pt-3">Assigned to: {task.member}</p>
                </section>
              </section>
            ))
            // ))}
          )}
        </section>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
            content: {
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '5px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              maxWidth: '700px',
              width: '100%',
              padding: '20px',
              position: 'relative',
            },
          }}>

          {/* <section className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50"> */}
          {/* <section className="bg-white px-10 py-8 lg:mt-8 w-7/12 modal-content"> */}
          <h2 className="text-lg font-medium mb-3 px-4">{isEditing ? "Edit Task" : "Add Task"}</h2>
          <button
            className="absolute top-2 right-2 font-semibold text-black cursor-pointer"
            onClick={closeModal}
          >
            X
          </button>
          <form onSubmit={handleSubmit} className="px-4">
            <section className="flex flex-col mb-10">
              <section>
                <label htmlFor="title" className="text-gray-700 text-sm mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                  value={taskTitle}
                  onChange={handleChange}
                  placeholder="Heading of your task"
                  required
                />
              </section>

              <section className="mt-4">
                <label htmlFor="details" className="text-gray-700 text-sm mb-1">
                  Description
                </label>
                <textarea
                  id="details"
                  name="detail"
                  className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                  value={taskDetail}
                  onChange={handleChange}
                  placeholder="Description of your task"
                  required
                />
              </section>

              <section className="mt-4">
                <label htmlFor="member" className="text-gray-700 text-sm mb-1">
                  Assigned Member
                </label>
                <select
                  name="member"
                  value={taskMember}
                  onChange={handleChange}
                  className="mt-1 p-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500 w-full"
                  required
                >
                  <option value="" disabled>
                    Assign Member
                  </option>
                  <option value="User 1">User 1</option>
                  <option value="User 2">User 2</option>
                </select>
              </section>

              <section className="mt-4">
                <label htmlFor="priority" className="text-gray-700 text-sm mb-1">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={taskPriority}
                  onChange={handleChange}
                  className="mt-1 p-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500 w-full"
                  required
                >
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
              </section>
            </section>
            {/* <button type="submit" >{isEditing ? 'Edit Task' : 'Add Task'}</button> */}
            <button
              type="submit"
              className={`bg-purple-500 hover:bg-white hover:border hover:border-purple-500 hover:text-purple-500 text-white px-4 py-2 rounded ${isEditing ? 'border border-purple-500 bg-none text-black' : ''}`}
            >
              {isEditing ? 'Edit Task' : 'Add Task'}
            </button>
            {/* <button onClick={closeModal}>Close Modal</button> */}
          </form>
          {/* </section> */}
          {/* </section> */}
        </Modal>
      </section>
    </section>
  );
};

export default Todo;
