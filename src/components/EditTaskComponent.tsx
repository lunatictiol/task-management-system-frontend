import { useState } from "react";
import { Task, UpdateTask } from "../types/Types";
import { updateTask } from "../api/api";






interface TaskEditFormProps {
    task: Task; // Task ID passed as prop to fetch the task
    onClose: () => void;
    token:string // Function to close the form
  }
  
  const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onClose,token }) => {
  const [updates, setUpdates] = useState<Partial<UpdateTask>>({
    title:task.title,
    priority:task.priority,
    status:task.status,
    endTime:task.endTime
  });
  const  [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdates((prevUpdates) => ({
      ...prevUpdates,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
       await updateTask(task._id,updates,token)
       console.log(updates)
        alert('Task updated successfully');
        onClose(); // Close the form after a successful update

      
    } catch (error:unknown) {
        console.log(error)
      setError('Failed to update task');
    }
  };
  return (
    <div className="task-edit-form bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
  <h2 className="text-2xl font-semibold mb-4 text-gray-700">Edit Task</h2>
  {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
        Title
      </label>
      <input
        type="text"
        id="title"
        name="title"
        value={updates.title || task.title}
        onChange={handleChange}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
        Priority
      </label>
      <input
        type="text"
        id="priority"
        name="priority"
        value={updates.priority || ""}
        onChange={handleChange}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      />
    </div>
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700">
        Status
      </label>
      <select
        id="status"
        name="status"
        value={updates.status || ""}
        onChange={(e)=>setUpdates(
          (prevUpdates) => ({
            ...prevUpdates,
            status: e.target.value,
          })
        )}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      >
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
      </select>
    </div>
    {(
      <div>
        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
          End Time
        </label>
        <input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={updates.endTime || ""}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
    )}
    <div className="flex justify-end space-x-2">
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Update Task
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

  )
}

export default TaskEditForm