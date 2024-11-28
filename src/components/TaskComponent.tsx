import { useState } from "react";
import { Task } from "../types/Types";
import { AiOutlineEdit } from "react-icons/ai";
export interface Props extends React.HTMLProps<HTMLDivElement> {
  task: Task;
  onClick: () => void;
  onSelectTask: (taskId: string, isChecked: boolean) => void;
}
const TaskComponent: React.FC<Props> = (props: Props) => {
  const { task, onClick, onSelectTask } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsChecked(checked);
    onSelectTask(task._id, checked); // Notify parent about the selection
  };
  return (
    <div
      key={task._id}
      className="flex-shrink-0 p-6 rounded-lg shadow-md hover:shadow-lg border border-b-red-300 transition-shadow bg-[#fff2ae] max-w-md mx-auto cursor-pointer"
    >
      <div className="flex flex-row  items-center gap-x-1">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="mb-2"
        />

        <h2 className="font-semibold text-xl text-gray-800 mb-2">
          {task.title}
        </h2>
      </div>
      <div className="text-gray-600 text-sm space-y-1">
        <p>
          <span className="font-medium text-gray-700">Start:</span>{" "}
          {new Date(task.startTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          <span className="font-medium text-gray-700">End:</span>{" "}
          {new Date(task.endTime).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          <span className="font-medium text-gray-700">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-md text-sm font-semibold ${
              task.status === "finished"
                ? "bg-green-100 text-green-800"
                : task.status === "in-progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {task.status}
          </span>
        </p>
        <p>
          <span className="font-medium text-gray-700">Priority:</span>{" "}
          {task.priority}
        </p>
        <p>
          <span className="font-medium text-gray-700">Remaining:</span>{" "}
          {Math.round((task.estimatedTimeLeft* 100) / 100)}
        </p>
        <p>
          <span className="font-medium text-gray-700">Elapsed:</span>{" "}
          {Math.round((task.timeLapsed* 100) / 100)} hours
        </p>
      </div>
      <span
        onClick={onClick}
        className="px-6 py-2 bg-transparent text-black font-semibold rounded-lg "
      >
         <AiOutlineEdit size={24} className=" hover:scale-125" />
      </span>
    </div>
  );
};

export default TaskComponent;
