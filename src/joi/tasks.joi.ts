import Joi from "joi";

import { ITask } from "../@types/task";

const schema = Joi.object<ITask>({
  title: Joi.string().min(2).max(256).required(),
  content: Joi.string().min(2).max(256).required(),
  status: Joi.string().min(2).max(256).required(),
  priority: Joi.string().min(2).max(256).required(),
  assigneeId: Joi.string().min(2).max(256),
});

export { schema as joiTaskSchema };
