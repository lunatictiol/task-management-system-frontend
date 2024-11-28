import { useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { fetchTasksFiltered } from "../api/api";
import { Task } from "../types/Types";

interface TaskAddFormProps {
  onFinish: (tasks:Task[]) => void; 
  onClose:()=>void// Function to close the form
  token: string; // Authentication token
}
//priority, status, sortField = 'startTime', sortOrder = 'asc'
const FilterComponent: React.FC<TaskAddFormProps> = ({ onClose, token,onFinish }) => {
    const userId = useSelector((state:RootState) => state.auth.userID); 
  const [filterData, setfilterData] = useState({
    sortField: "startTime",
    sortOrder: "asc",
    priority: "1",
    status: "pending",
    userId:userId!,
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setfilterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the API to add a new task
      const data = await fetchTasksFiltered(userId!, token,filterData.sortField,filterData.sortOrder,filterData.priority,filterData.status);
      onFinish(data); // Close the form after successful submission
    } catch (error: unknown) {
      console.log(error);
      setError("Failed to add task");
    }
  };


  return (
    <div className="task-add-form bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Filter</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={filterData.priority}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Sort by
          </label>
          <select
            id="sortField"
            name="sortField"
            value={filterData.sortField}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="startTime">Start Time</option>
            <option value="endTime">End Time</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={filterData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="pending">Pending</option>
            <option value="finished">Finished</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
            Sort Order
          </label>
          <select
            id="sortOrder"
            name="sortOrder"
            value={filterData.sortOrder}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
    
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
           Filter
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterComponent;
