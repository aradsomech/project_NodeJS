import { ITaskInput } from "../@types/task";
import { Card } from "../database/model/cards";
import { Task } from "../database/model/tasks";
import { ICardInput } from "./../@types/card.d";

const createTask = async (data: ITaskInput, userId: string) => {
  //bizNumber, userId
  const task = new Task(data);
  task.userId = userId;
  return task.save();
};

export { createTask };
