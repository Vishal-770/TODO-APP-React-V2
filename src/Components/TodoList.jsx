import React, { useState } from "react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowUpIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import {
  DeleteTodo,
  ToggleComplete,
  UpdateTodo,
} from "../Store/Slices/TodoSlice";

const TodoItem = ({ task }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const dispatch = useDispatch();


  const formattedDate = new Date(task.Duedate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });


  const priorityStyles = {
    high: {
      icon: <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />,
      bg: "bg-red-50",
      text: "text-red-700",
    },
    medium: {
      icon: <ArrowUpIcon className="h-5 w-5 text-yellow-500" />,
      bg: "bg-yellow-50",
      text: "text-yellow-700",
    },
    low: {
      icon: <ArrowUpIcon className="h-5 w-5 text-green-500 rotate-180" />,
      bg: "bg-green-50",
      text: "text-green-700",
    },
  };

  const handleToggleComplete = () => {
    dispatch(ToggleComplete(task.id));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    dispatch(
      UpdateTodo({
        id: task.id,
        updates: editedTask,
      })
    );
    setShowEditModal(false);
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-sm border ${
          task.completed ? "border-gray-100" : "border-gray-200"
        } p-4 mb-3 hover:shadow-md transition-shadow duration-200`}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleComplete}
              className={`transition-colors ${
                task.completed
                  ? "text-green-500"
                  : "text-gray-300 hover:text-green-500"
              }`}
            >
              <CheckCircleIcon className="h-6 w-6" />
            </button>
            <div>
              <h3
                className={`font-medium ${
                  task.completed
                    ? "line-through text-gray-400"
                    : "text-gray-900"
                }`}
              >
                {task.Taskname}
              </h3>
              {task.note && (
                <p
                  className={`text-sm mt-1 ${
                    task.completed ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {task.note}
                </p>
              )}
            </div>
          </div>

          <div
            className={`${priorityStyles[task.priority].bg} ${
              priorityStyles[task.priority].text
            } rounded-full p-1 flex items-center justify-center`}
          >
            {priorityStyles[task.priority].icon}
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div
            className={`flex items-center ${
              task.completed ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <span>Due: {formattedDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            {!task.completed && (
              <>
                <button
                  onClick={() => setShowEditModal(true)}
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  title="Edit task"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete task"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </>
            )}
            <div
              className={`text-xs ${
                task.completed ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Updated: {task.updatedAt}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-white/80 backdrop-blur-[2px]"
            onClick={() => setShowEditModal(false)}
          />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md border border-blue-100">
            <div className="flex justify-between items-center p-5 border-b border-blue-50">
              <h3 className="text-xl font-semibold text-blue-800">Edit Task</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-blue-400 hover:text-blue-600 transition-colors duration-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSaveChanges} className="p-5">
              <div className="mb-4">
                <label className="block text-blue-700 text-sm font-medium mb-2">
                  Task Name *
                </label>
                <input
                  required
                  value={editedTask.Taskname}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, Taskname: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-blue-700 text-sm font-medium mb-2">
                    Priority *
                  </label>
                  <select
                    value={editedTask.priority}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, priority: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
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
                    type="date"
                    value={editedTask.Duedate}
                    onChange={(e) =>
                      setEditedTask({ ...editedTask, Duedate: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-blue-700 text-sm font-medium mb-2">
                  Notes
                </label>
                <textarea
                  value={editedTask.note}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, note: e.target.value })
                  }
                  rows="3"
                  className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 border border-gray-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Delete Task</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-gray-600">
                Are you sure you want to delete "{task.Taskname}"?
              </p>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dispatch(DeleteTodo(task.id));
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TodoList = ({ tasks }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
        {totalCount > 0 && (
          <div className="text-sm text-gray-500">
            {completedCount} of {totalCount} completed
          </div>
        )}
      </div>
      {totalCount === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No tasks found. Add a new task to get started!
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <TodoItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
