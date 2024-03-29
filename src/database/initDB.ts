import { Logger } from "../logs/logger";
import { cards } from "./cards";
import { Card } from "./model/cards";
import { Task } from "./model/tasks";
import { User } from "./model/user";
import { tasks } from "./tasks";
import { users } from "./users";
const initDB = async () => {
  //add 3 users
  const usersCount = await User.countDocuments();
  if (usersCount != 0) return;
  for (let user of users) {
    const saved = await new User(user).save();
    Logger.verbose("Added user: ", saved);
  }

  //add 3 cards
  const cardsCount = await Card.countDocuments();
  if (cardsCount != 0) return;
  for (let card of cards) {
    const saved = await new Card(card).save();
    Logger.verbose("Added card: ", saved);
  }

  const tasksCount = await Task.countDocuments();
  if (tasksCount != 0) return;
  for (let task of tasks) {
    const saved = await new Task(task).save();
    Logger.verbose("Added task: ", saved);
  }
};

export { initDB };
