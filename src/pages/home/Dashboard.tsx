import {  useDispatch, useSelector } from "react-redux";
import { DashboardData, Task } from "../../types/Types";
import { useEffect, useState } from "react";
import { deleteTasks, fetchDashboardData, fetchTasks } from "../../api/api";
import { persistor, RootState } from "../../store/store";
import TaskComponent from "../../components/TaskComponent";
import TaskEditForm from "../../components/EditTaskComponent";
import { AiOutlinePlus } from "react-icons/ai";
import TaskAddForm from "../../components/AddTaskComponent";
import DashboardComponent from "../../components/DashboardComponent";
import CustomPop from "../../components/CustomPop";
import FilterComponent from "../../components/FilterComponent";
import { logout } from "../../store/authSlice";



function Dashboard() {
    const userId = useSelector((state:RootState) => state.auth.userID);
    const token = useSelector((state:RootState) => state.auth.token);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTask,setSelectedTask] = useState<Task>()
    const [showEditTask, setShowEditTask] = useState(false)
    const [showAddTask, setShowAddTask] = useState(false)
    const [showDeletePopUp, setShowDeletePopUp] = useState(false)
    const [showFilter, setShowFilter] = useState(false)
    const [isFiltered, setisFiltered] = useState(false)
    const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
    const [data,setData]=useState<DashboardData>()
    const dispatch = useDispatch();

    const handleSelectTask = (taskId: string, isChecked: boolean) => {
      setSelectedTaskIds((prevSelectedTaskIds) => {
        if (isChecked) {
          return [...prevSelectedTaskIds, taskId];  // Add taskId if checked
        } else {
          return prevSelectedTaskIds.filter(id => id !== taskId);  // Remove taskId if unchecked
        }
      });
     console.log(selectedTaskIds) 
    };
    
    const getTasks = async () => {
        if (userId && token) {
          setLoading(true);
          try {
            const tasksData = await fetchTasks(userId,token!);
            console.log("dashboardddddd",tasksData)
            setTasks(tasksData);
          } catch (error) {
            console.error("Error fetching tasks:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      const getDashBoardData = async () => {
        if (userId && token) {
          setLoading(true);
          try {
            const tasksData = await fetchDashboardData(userId,token!);
            console.log("dashboardddddd",tasksData)
            setData(tasksData);
          } catch (error) {
            console.error("Error fetching tasks:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      

      const getData = ()=>{
        getTasks();
        getDashBoardData();
        setisFiltered(false)
      }
      const deleteTasksClickHandler = async () => {

        if (userId && token) {
          setLoading(true);
          try {
            await deleteTasks(selectedTaskIds,token);
            console.log("deleted")
          getData()
          setShowDeletePopUp(false)  
          
            
          } catch (error) {
            console.error("Error fetching tasks:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      const handleLogout = () => {
        persistor.purge(); // Clears Redux Persist data
        // Optionally reset state in Redux too
        dispatch(logout());  // Your logout action
        alert('You have been logged out!');
      };
  
    useEffect(() => {
      getTasks();
      getDashBoardData();
    }, []);
      
if (loading) {
        return <div>Loading...</div>;
      }     
  return (
    <section className=" bg-gradient-to-r from-gradientStart to-gradientEnd relative p-6 bg-gray-50 min-h-screen">
  
   {/* Dashboard Title */}
   <div className="flex justify-between items-center p-4">
   <h1 className="text-3xl text-[#a88686] font-semibold">Dashboard</h1>
   <button
      onClick={() => {
         
            setShowFilter(true);
         
      }}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
   >
      Filter
   </button>
   {
    isFiltered &&
    <button
    onClick={() => {
       
          getData();
       
    }}
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
 >
    Reset Filter
 </button>

   }
   <button
      onClick={() => {
         if (selectedTaskIds.length == 0) {
            alert("Select tasks first");
         } else {
            setShowDeletePopUp(true);
         }
      }}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
   >
      Delete
   </button>

   <button
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
   >
      Log-out
   </button>
  
</div>
   {/* Total Count */}
   <div className="bg-white my-3 shadow-lg rounded-lg p-6 flex items-center justify-between ">
              <h2 className="text-xl font-medium text-gray-700">Total Count</h2>
              <div className="text-3xl font-bold text-indigo-600">{data ? data.totalCount:0}</div>
    </div>
  <div className="flex overflow-x-auto space-x-2">
    {tasks.length === 0 ? (
      <div className="text-gray-600 text-center w-full flex justify-center py-8 text-lg">
        No tasks available
      </div>
    ) : (
        
      tasks.map((task) => (
      

        <TaskComponent
          key={task._id}
          task={task}
          onClick={() => {
            setSelectedTask(task);
            setShowEditTask(true);
          }}
          onSelectTask={handleSelectTask}
          className="cursor-pointer transition transform hover:scale-105"
        />
        
      ))
    )}

    {showEditTask && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">

          <TaskEditForm
            task={selectedTask!}
            onClose={() => {
              setShowEditTask(false);
              getTasks();
            }}
            token={token!}
          />
        </div>
      </div>
    )}
    {showFilter && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">

          <FilterComponent token={token!} onFinish={(tasks)=>{ 
            setTasks(tasks) 
            setisFiltered(true)
            setShowFilter(false) 
            
            }} onClose={()=>setShowFilter(false)}  />
        </div>
      </div>
    )}


    {showDeletePopUp && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
         <CustomPop message={"Are you sure you want to delete selectedTasks"} label={"Yes"} onClose={()=>{
            setShowDeletePopUp(false)
         }} 
         onAccept={()=>deleteTasksClickHandler()}
         />
        </div>
      </div>
    )}

     {showAddTask && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
          <TaskAddForm
            onClose={() => {
              setShowAddTask(false);
              getTasks();
            }}
            token={token!}
          />
        </div>
      </div>
    )}
    
  </div>
  {
   data && 
  <DashboardComponent data={data} />
  }
  <button
  onClick={()=>{setShowAddTask(true)}}
      className="fixed bottom-20 right-20 bg-[#ff6445] text-white rounded-full p-4 shadow-lg hover:bg-blue-600 active:scale-90 transform transition-all duration-300 ease-in-out"
    >
      <AiOutlinePlus size={24} />
    </button>
</section>


  )
}

export default Dashboard