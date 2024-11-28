
export interface Task {
    _id: string;
    title: string;
    startTime: string;
    endTime: string;
    priority: number;
    status: string;
    __v: number;
    timeLapsed: number;
    estimatedTimeLeft: number;
    userId: string;
  }

  export interface AuthResponse{
    message:string,
    userId:string ,
    token: string
  }

  export interface UpdateTask {
    title:string,
    endTime: string;
    priority: number;
    status: string;
}

export interface AddTaskData{
  title: string,
    startTime: string,
    endTime: string,
    priority: string,
    status: string,
    userId:string,
}

export interface PendingByPriority {
  priority: number;
  timeLapsed: number;
  balanceEstimate: number;
}

export interface DashboardData {
  totalCount: number;
  completedPercent: number;
  pendingPercent: number;
  pendingByPriority: PendingByPriority[];
  avgCompletionTime: number;
}


