import { Schema } from "mongoose";

import { ITask } from "../../@types/task";

const taskSchema = new Schema<ITask>({
  title: { type: String, minlength: 2, maxlength: 256, required: true },
  taskNumber: { type: Number, minlength: 2, maxlength: 256, required: true },
  status: { type: String, minlength: 2, maxlength: 11, required: true },
  priority: { type: String, minlength: 2, maxlength: 11, required: true },
  content: { type: String, minlength: 2, maxlength: 1024, required: true },
  createdAt: {
    type: Date,
    required: false,
    default: new Date(),
  },
});
export { taskSchema };
