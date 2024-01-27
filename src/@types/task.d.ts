export type ITask = {
  _id?: string;
  taskNumber: number;
  title: string;
  status?: number;
  priority?: string;
  content?: string;
  createdAt: Date;
};
