export type ITask = {
  _id?: string;
  taskNumber: number;
  title: string;
  status?: string;
  priority?: string;
  content?: string;
  createdAt: Date;
  userId?: string;
  assigneeId?: string;
};

export type ITaskInput = {
  title: string;
  status: string;
  priority: string;
  content: string;
  assigneeId?: string;
};
