import React from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.Todo);

  // Data processing for charts
  const priorityCount = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  const completionData = tasks.reduce(
    (acc, task) => {
      acc[task.completed ? "completed" : "pending"]++;
      return acc;
    },
    { completed: 0, pending: 0 }
  );

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  // Chart data configurations
  const priorityChartData = {
    labels: Object.keys(priorityCount),
    datasets: [
      {
        data: Object.values(priorityCount),
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)", // High - red
          "rgba(234, 179, 8, 0.7)", // Medium - yellow
          "rgba(34, 197, 94, 0.7)", // Low - green
        ],
        borderColor: [
          "rgba(239, 68, 68, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(34, 197, 94, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const completionChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completionData.completed, completionData.pending],
        backgroundColor: [
          "rgba(16, 185, 129, 0.7)", // Completed - green
          "rgba(249, 115, 22, 0.7)", // Pending - orange
        ],
        borderColor: ["rgba(16, 185, 129, 1)", "rgba(249, 115, 22, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const deadlineChartData = {
    labels: tasks.map((task) => task.Taskname).slice(0, 10),
    datasets: [
      {
        label: "Days Until Deadline",
        data: tasks.slice(0, 10).map((task) => {
          const diff = new Date(task.Duedate) - new Date();
          return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Task Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Total Tasks
            </h3>
            <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Completed
            </h3>
            <p className="text-3xl font-bold text-green-600">
              {completionData.completed}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-orange-600">
              {completionData.pending}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Task Priority Distribution
            </h3>
            <div className="h-64">
              <Pie
                data={priorityChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              Completion Status
            </h3>
            <div className="h-64">
              <Pie
                data={completionChartData}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Upcoming Deadlines
          </h3>
          <div className="h-96">
            <Bar
              data={deadlineChartData}
              options={{
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Days Remaining",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-4">
            Recently Updated Tasks
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.Taskname}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {task.priority}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.completed
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(task.Duedate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.updatedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
