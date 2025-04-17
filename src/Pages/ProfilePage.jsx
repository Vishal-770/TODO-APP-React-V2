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

const TaskOverviewPage = () => {
  const tasks = useSelector((state) => state.Todo);

  // Calculate task statistics
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const overdueCount = tasks.filter(
    (task) => !task.completed && new Date(task.Duedate) < new Date()
  ).length;

  // Completion rate data for chart
  const completionData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedCount, pendingCount],
        backgroundColor: ["#10B981", "#F59E0B"],
        borderColor: ["#047857", "#B45309"],
        borderWidth: 1,
      },
    ],
  };

  // Priority distribution data
  const priorityData = {
    labels: ["High", "Medium", "Low"],
    datasets: [
      {
        data: [
          tasks.filter((t) => t.priority === "high").length,
          tasks.filter((t) => t.priority === "medium").length,
          tasks.filter((t) => t.priority === "low").length,
        ],
        backgroundColor: ["#EF4444", "#F59E0B", "#10B981"],
        borderColor: ["#B91C1C", "#B45309", "#047857"],
        borderWidth: 1,
      },
    ],
  };

  // Weekly completion trend
  const weeklyTrend = Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return tasks.filter(
        (task) =>
          task.completed &&
          new Date(task.updatedAt).toDateString() === date.toDateString()
      ).length;
    })
    .reverse();

  const trendLabels = Array(7)
    .fill(0)
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString("en-US", { weekday: "short" });
    });

  const trendData = {
    labels: trendLabels,
    datasets: [
      {
        label: "Tasks Completed",
        data: weeklyTrend,
        backgroundColor: "#3B82F6",
        borderColor: "#1D4ED8",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Task Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Total Tasks</p>
            <p className="text-2xl font-bold text-gray-800">{tasks.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {completedCount}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm font-medium text-gray-500">Overdue</p>
            <p className="text-2xl font-bold text-red-600">{overdueCount}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">
              Completion Status
            </h3>
            <div className="h-64">
              <Pie
                data={completionData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-medium text-gray-700 mb-3">
              Priority Distribution
            </h3>
            <div className="h-64">
              <Pie
                data={priorityData}
                options={{
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                }}
              />
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
          <h3 className="font-medium text-gray-700 mb-3">
            Weekly Completion Trend
          </h3>
          <div className="h-64">
            <Bar
              data={trendData}
              options={{
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
              }}
            />
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium text-gray-700 mb-3">Recent Tasks</h3>
          <div className="space-y-3">
            {tasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-start justify-between p-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p
                    className={`font-medium ${
                      task.completed
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.Taskname}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due: {new Date(task.Duedate).toLocaleDateString()} •
                    Priority:{" "}
                    <span
                      className={`${
                        task.priority === "high"
                          ? "text-red-500"
                          : task.priority === "medium"
                          ? "text-yellow-500"
                          : "text-green-500"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    task.completed
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-center text-gray-500 py-4">No tasks found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskOverviewPage;
