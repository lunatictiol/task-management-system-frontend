import { DashboardData } from "../types/Types";
interface DashboardProps {
    data:DashboardData // Function to close the form
  }


const DashboardComponent: React.FC<DashboardProps> = ({data})=> {
    return (
        <div className="min-h-screen bg-transparent py-8 px-4">
          <div className="max-w-7xl mx-auto space-y-8">
        
            {/* Average Completion Time */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-700">Average Completion Time</h3>
              <div className="text-3xl font-bold text-indigo-600">{data.avgCompletionTime} hrs</div>
            </div>
    
            {/* Completion & Pending Percent */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <h3 className="text-lg font-medium text-gray-700">Completed</h3>
                <div className="w-full h-2 bg-green-200 rounded-full mt-2">
                  <div
                    className="h-full bg-green-600"
                    style={{ width: `${data.completedPercent}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">{data.completedPercent}%</div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center">
                <h3 className="text-lg font-medium text-gray-700">Pending</h3>
                <div className="w-full h-2 bg-yellow-200 rounded-full mt-2">
                  <div
                    className="h-full bg-yellow-600"
                    style={{ width: `${data.pendingPercent}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-500 mt-1">{data.pendingPercent}%</div>
              </div>
            </div>
    
            {/* Pending By Priority */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-700 mb-4">Pending By Priority</h3>
              <div className="space-y-4">
                {data.pendingByPriority.map((priorityData, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b py-3"
                  >
                    <div className="text-lg font-medium text-gray-700">Priority {priorityData.priority}</div>
                    <div className="flex flex-col text-right">
                      <div className="text-sm text-gray-500">Time Lapsed</div>
                      <div className="font-semibold text-gray-700">{priorityData.timeLapsed.toFixed(2)} hrs</div>
                      <div className="text-sm text-gray-500">Balance Estimate</div>
                      <div className="font-semibold text-gray-700">{priorityData.balanceEstimate.toFixed(2)} hrs</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
    
            
          </div>
        </div>
      );
}

export default DashboardComponent