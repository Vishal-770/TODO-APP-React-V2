import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AddTodo } from "../Store/Slices/TodoSlice";
import { XMarkIcon } from "@heroicons/react/24/outline";

const AddTodoTask = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [todo, setTodo] = useState({
    Taskname: "",
    Duedate: "",
    priority: "medium",
    note: "",
    completed: false, // Initialize completed status
  });

  const now = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.Taskname && todo.Duedate && todo.priority && todo.note) {
      dispatch(
        AddTodo({
          ...todo,
          completed: false, // Explicitly set to false when adding
          createdAt: now.toLocaleString(),
          updatedAt: now.toLocaleDateString(),
        })
      );
      // Reset form
      setTodo({
        Taskname: "",
        Duedate: "",
        priority: "medium",
        note: "",
        completed: false,
      });
      setIsOpen(false);
    }
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
      >
        Add New Task
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Subtle blurred background */}
          <div
            className="fixed inset-0 bg-white/80 backdrop-blur-[2px]"
            onClick={closeModal}
          />

          {/* White modal container with blue accents */}
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md border border-blue-100">
            {/* Modal header */}
            <div className="flex justify-between items-center p-5 border-b border-blue-50">
              <h3 className="text-xl font-semibold text-blue-800">
                Add New Task
              </h3>
              <button
                onClick={closeModal}
                className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal content */}
            <form onSubmit={handleSubmit} className="p-5">
              <div className="mb-4">
                <label className="block text-blue-700 text-sm font-medium mb-2">
                  Task Name *
                </label>
                <input
                  required
                  value={todo.Taskname}
                  type="text"
                  className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  onChange={(e) =>
                    setTodo({ ...todo, Taskname: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-blue-700 text-sm font-medium mb-2">
                    Priority *
                  </label>
                  <select
                    required
                    value={todo.priority}
                    className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    onChange={(e) =>
                      setTodo({ ...todo, priority: e.target.value })
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-blue-700 text-sm font-medium mb-2">
                    Deadline *
                  </label>
                  <input
                    required
                    value={todo.Duedate}
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                    onChange={(e) =>
                      setTodo({ ...todo, Duedate: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-blue-700 text-sm font-medium mb-2">
                  Notes *
                </label>
                <textarea
                  required
                  value={todo.note}
                  rows="3"
                  className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  onChange={(e) => setTodo({ ...todo, note: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTodoTask;
