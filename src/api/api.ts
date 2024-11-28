import axios from 'axios';
import { AddTaskData, AuthResponse, DashboardData, Task } from '../types/Types';

export const handleAuth = async (email: string, password: string, isRegister: boolean):Promise<AuthResponse> => {
  const endpoint = isRegister
    ? "http://localhost:8080/api/v1/user/register"
    : "http://localhost:8080/api/v1/user/login";
    // Make the API call using axios
    const response = await axios.post(endpoint, { email, password }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

   return response.data;

};

export const fetchTasks = async (userId: string,token:string): Promise<Task[]> => {

  const response = await axios.post('http://localhost:8080/api/v1/task/detailed',
     { userId:userId },
  {
    headers: {
      "Authorization": `Bearer ${token}`, 
      "Content-Type": "application/json",
    }
  }
)
  ;
  console.log("hereeeeee",response.data)
  return response.data;
};

export const fetchTasksFiltered = async (userId: string,token:string,
    sortField: string,
    sortOrder: string,
    priority: string,
    status: string

): Promise<Task[]> => {

    const response = await axios.post(`http://localhost:8080/api/v1/task/detailed?priority=${priority}&sortField=${sortField}&sortOrder=${sortOrder}&status=${status}`,
       { userId:userId },
    {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }
    }
  )
    ;
    console.log("hereeeeee",response.data)
    return response.data;
  };



export const fetchDashboardData = async (userId: string,token:string): Promise<DashboardData> => {

    const response = await axios.post('http://localhost:8080/api/v1/task/dashboard',
       { userId:userId },
    {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }
    }
  )
    ;
    console.log("dashboarddddd",response)
    return response.data;
  };
  export const deleteTasks = async (tasksIds:string[],token:string): Promise<unknown> => {

    const response = await axios.post('http://localhost:8080/api/v1/task/delete',
       { tasksIds:tasksIds },
    {
      headers: {
        "Authorization": `Bearer ${token}`, 
        "Content-Type": "application/json",
      }
    }
  )
    ;
    console.log("dashboarddddd",response)
    return response.data;
  };  

export const updateTask= async (taskid: string,update:Partial<Task>,token:string): Promise<Task> =>
  
    { const response = await axios.patch(`http://localhost:8080/api/v1/task/${taskid}`,
        update,
     {
       headers: {
         "Authorization": `Bearer ${token}`, 
         "Content-Type": "application/json",
       }
     }
   );
     console.log("hereeeeee",response.data)
    
     return response.data;

}

export const addTask= async (Task:AddTaskData,token:string): Promise<Task> =>
  
    { const response = await axios.post('http://localhost:8080/api/v1/task/create',
        Task,
     {
       headers: {
         "Authorization": `Bearer ${token}`, 
         "Content-Type": "application/json",
       }
     }
   );
     console.log("hereeeeee",response.data)
    
     return response.data;

}


