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

const CompletedTasksPage = () => {
  const allTasks = useSelector((state) => state.Todo);
  const completedTasks = allTasks.filter((task) => task.completed);

  // Data processing for charts
  const completionTimeline = completedTasks.reduce((acc, task) => {
    const date = new Date(task.updatedAt).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const priorityDistribution = completedTasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {});

  // Chart data configurations
  const timelineChartData = {
    labels: Object.keys(completionTimeline).slice(-7), // Last 7 days
    datasets: [
      {
        label: "Tasks Completed",
        data: Object.values(completionTimeline).slice(-7),
        backgroundColor: "rgba(16, 185, 129, 0.7)",
        borderColor: "rgba(16, 185, 129, 1)",
        borderWidth: 1,
      },
    ],
  };

  const priorityChartData = {
    labels: Object.keys(priorityDistribution),
    datasets: [
      {
        data: Object.values(priorityDistribution),
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)", // High
          "rgba(234, 179, 8, 0.7)", // Medium
          "rgba(34, 197, 94, 0.7)", // Low
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

  const recentCompleted = [...completedTasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Completed Tasks
          </h1>
          <p className="text-lg text-gray-600">
            {completedTasks.length} tasks completed out of {allTasks.length}{" "}
            total
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Total Completed
            </h3>
            <p className="text-4xl font-bold text-green-600">
              {completedTasks.length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Completion Rate
            </h3>
            <p className="text-4xl font-bold text-blue-600">
              {allTasks.length > 0
                ? Math.round((completedTasks.length / allTasks.length) * 100)
                : 0}
              %
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Recent Activity
            </h3>
            <p className="text-lg text-gray-600">
              {recentCompleted.length > 0
                ? new Date(recentCompleted[0].updatedAt).toLocaleDateString()
                : "No recent completions"}
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
              Completion Timeline (Last 7 Days)
            </h3>
            <div className="h-64">
              <Bar
                data={timelineChartData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        stepSize: 1,
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">
              Priority Distribution
            </h3>
            <div className="h-64">
              <Pie
                data={priorityChartData}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>

        {/* Completed Tasks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-700">
              Recently Completed Tasks
            </h3>
          </div>
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
                    Completed On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original Deadline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentCompleted.length > 0 ? (
                  recentCompleted.map((task) => (
                    <tr key={task.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {task.Taskname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(task.updatedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(task.Duedate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {task.note || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      No completed tasks yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Data updated at {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CompletedTasksPage;
