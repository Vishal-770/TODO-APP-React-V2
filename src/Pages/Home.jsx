import React from "react";
import { useSelector } from "react-redux";
import AddTodoTask from "../Components/AddTodoTask";
import TodoList from "../Components/TodoList";

const Home = () => {
  const { todos, loading, error } = useSelector((state) => ({
    todos: state.Todo || [],
    loading: state.loading,
    error: state.error,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Add Task Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 transition-all duration-200 hover:shadow-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Create New Task
              </h2>
              <div className="h-1 flex-1 bg-gray-100 mx-4 rounded-full"></div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {todos.length} {todos.length === 1 ? "task" : "tasks"} total
              </span>
            </div>
            <AddTodoTask />
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Your Tasks
              </h2>
              <div className="flex space-x-2">
                <span className="text-xs font-medium text-gray-500">
                  Updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-red-700 font-medium">
                    Error loading tasks:{" "}
                    {error.message || "Please try again later"}
                  </span>
                </div>
              </div>
            ) : todos.length > 0 ? (
              <TodoList tasks={todos} />
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeWidth="1.5"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No tasks
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new task.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
