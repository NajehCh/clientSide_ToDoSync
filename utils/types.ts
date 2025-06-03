interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  completed: boolean;
  dueDate: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  projectId:string
}

interface Project {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type { Task ,Project};
