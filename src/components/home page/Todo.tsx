'use client'
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask } from './redux/taskSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';


interface Task {
  title: string;
  detail: string;
  member: string;
  priority: string;
  dueDate: Date | null;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleTaskSubmit: (newTask: Task) => void;
  editingTask: Task | null;
}


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, handleTaskSubmit, editingTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDetail, setTaskDetail] = useState("");
  const [taskMember, setTaskMember] = useState("");
  const [taskPriority, setTaskPriority] = useState("low");
  const [taskDueDate, setTaskDueDate] = useState<null | string>(null);

  useEffect(() => {
    if (editingTask) {
      setTaskTitle(editingTask.title);
      setTaskDetail(editingTask.detail);
      setTaskMember(editingTask.member);
      setTaskPriority(editingTask.priority);
    } else {
      setTaskTitle("");
      setTaskDetail("");
      setTaskMember("");
      setTaskPriority("low");
    }
  }, [editingTask]);

  const closeModal = () => {
    onClose();
    // Optionally, you can also reset the form fields here
    setTaskTitle("");
    setTaskDetail("");
    setTaskMember("");
    setTaskPriority("low");
    setTaskDueDate(null);
  };

  //
  const isEditing = editingTask !== null;
  const buttonText = isEditing ? "Edit Task" : "Add Task";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      title: taskTitle,
      detail: taskDetail,
      member: taskMember,
      priority: taskPriority,
      dueDate: taskDueDate ? new Date(taskDueDate) : null,
    };
    handleTaskSubmit(newTask);
    setTaskTitle("");
    setTaskDetail("");
    setTaskMember("");
    setTaskPriority("low");
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && event.target) {
        const modalContent = document.querySelector(".modal-content");
        if (modalContent && !modalContent.contains(event.target as Node)) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <section className="fixed top-0 z-50 left-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-50">
      <section className="bg-white px-10 py-8 lg:mt-8 w-7/12 modal-content">
        {/* Modal content */}
        <h2 className="text-lg font-medium mb-3">{isEditing ? "Edit Task" : "Add Task"}</h2>
        <button
          className="absolute top-2 right-2 font-semibold text-black cursor-pointer text-xl"
          onClick={closeModal}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit}>
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
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Heading of your task"
              />
            </section>

            <section className="mt-4">
              <label htmlFor="details" className="text-gray-700 text-sm mb-1">
                Desciption
              </label>
              <textarea
                id="details"
                name="details"
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                value={taskDetail}
                onChange={(e) => setTaskDetail(e.target.value)}
                placeholder="Description of your task"
              />
            </section>
            <section className="mt-3">
              <label htmlFor="member" className="text-gray-700 text-sm mb-1">
                Assigned Member
              </label>
              <input
                type="text"
                id="member"
                name="member"
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                value={taskMember}
                onChange={(e) => setTaskMember(e.target.value)}
                placeholder="Assigned member"
              />
            </section>

            <section className="mt-4">
              <label htmlFor="dueDate" className="text-gray-700 text-sm mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                className="w-full px-3 py-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
              />
            </section>

            <section className="mt-4">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className="mt-1 p-2 border-2 border-purple-300 rounded focus:outline-none focus:border-purple-500 w-full"
                required
              >
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </section>
          </section>
          <button
            type="submit"
            className={`bg-purple-500 text-white px-4 py-2 rounded ${isEditing ? 'border border-purple-500 bg-none text-black' : ''}`}
          >
            {buttonText}
          </button>
        </form>
      </section>
    </section>
  ) : null;
};

const Todo = () => {
  const dispatch = useDispatch();
  const taskData = useSelector((state) => state.tasks.tasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const handleFormOpen = () => {
    setModalOpen(true);
  };

  const handleEditTask = (index: number) => {
    setEditingTask(index);
    handleFormOpen();
  };

  const handleDeleteTask = (index: number) => {
    dispatch(deleteTask(index));
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleTaskSubmit = (newTask: Task) => {
    if (editingTask !== null) {
      dispatch(editTask({ index: editingTask, updatedTask: newTask }));
      setEditingTask(null);
    } else {
      dispatch(addTask(newTask));
    }
    closeModal();
  };

  const handleToggleDropdown = (index: number) => {
    if (dropdownIndex === index) {
      setDropdownIndex(null);
    } else {
      setDropdownIndex(index);
    }
  };

  //due date logic
  useEffect(() => {
    taskData.forEach((task: { dueDate: string | number | Date; title: any; }, index: any) => {
      if (task.dueDate && new Date(task.dueDate) <= new Date()) {
        toast.error(`Task "${task.title}" is overdue!`, {
          position: "top-right",
          autoClose: false,
        });
      }
    });
  }, [taskData]);

  return (
    <>
      <section className="mb-16">
        <section className="bg-gray-100 rounded-lg p-4 w-full h-4/6 overflow-auto">
          <section className="flex flex-row justify-between border-b-4 border-purple-600 pb-4">
            <section className="flex">
              <span className="bg-purple-600 rounded-full p-1 w-2 h-2 text-sm flex justify-center items-center mt-2"></span>
              <span className="mx-2 text-black">To Do</span>
              <span className="bg-gray-300 rounded-full p-2 w-6 h-6 text-sm flex justify-center items-center">{taskData.length}</span>
            </section>
            <figure className="p-1 rounded bg-purple-300">
              <FaPlus className="text-purple-600 cursor-pointer" onClick={handleFormOpen} />
            </figure>
          </section>

          <section className="mt-6">
            {taskData.map((task, index) => (
              <section className="bg-white rounded-lg p-4 mt-4" key={index}>
                <section className="flex flex-row justify-between">
                  <p className={`text-${task.priority === 'low' ? 'yellow' : 'red'}-500 bg-${task.priority === 'low' ? 'yellow' : 'red'}-100 text-sm rounded capitalize py-1 px-2`}>
                    {task.priority}
                  </p>
                  <div className="relative inline-block text-left">
                    <button
                      className="p-1"
                      onClick={() => handleToggleDropdown(index)}
                    >
                      <Image 
                        src="../Assets/Icons/dots.svg" 
                        className="" 
                        width={24}
                        height={24}
                        alt="dots" 
                      />
                    </button>
                    {dropdownIndex === index && (
                      <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          <button
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              handleToggleDropdown(index);
                              handleEditTask(index);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="block px-4 py-2 text-sm text-red-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              handleToggleDropdown(index);
                              handleDeleteTask(index);
                            }}
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
                  <p className="text-sm pt-2 text-gray-500">Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
                </section>
              </section>
            ))}
          </section>
          <Modal isOpen={modalOpen} onClose={closeModal} handleTaskSubmit={handleTaskSubmit} editingTask={editingTask !== null ? taskData[editingTask] : null} />
        </section>
        <ToastContainer position="top-right" />
      </section>
    </>
  );
}

export default Todo;
