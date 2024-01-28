import { Router } from "express";
import { Card } from "../database/model/cards";
import { auth } from "../service/auth-service";
import { validateCard, validateTask } from "../middleware/validation";
import { ICard, ICardInput } from "../@types/card";

import { validateToken } from "../middleware/validate-token";
import { BizCardsError } from "../error/biz-cards-error";
import { createCard } from "../service/card-service";
import { isUser } from "../middleware/is-user";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isAdmin } from "../middleware/is-admin";
import { Task } from "../database/model/tasks";
import { createTask } from "../service/task-service";
import { ITaskInput } from "../@types/task";

const router = Router();
// CREATE CARD
router.post("/", validateToken, validateTask, async (req, res, next) => {
  try {
    console.log(req.user?._id);

    const userId = req.user?._id;
    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const saveTask = await createTask(req.body as ITaskInput, userId);
    res.status(201).json({ message: "task saved", task: saveTask });
  } catch (e) {
    next(e);
  }
});

// GET ALL TASKS
router.get("/", async (req, res, next) => {
  try {
    console.log("|omer");

    const allTasks = await Task.find();
    return res.json(allTasks);
  } catch (e) {
    next(e);
  }
});

// router.post("/", async (req, res, next) => {
//   console.log("asdas");
//   try {
//     const allTasks = await Task.find();
//     return res.json(allTasks);
//   } catch (e) {
//     next(e);
//   }
// });

// GET MY CARDS
router.get("/my-cards", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id!;
    const cards = await Card.find({ userId });
    return res.json(cards);
  } catch (e) {
    next(e);
  }
});
// GET CARD BY ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    return res.json(card);
  } catch (e) {
    next(e);
  }
});
// EDIT CARD
router.put("/:id", validateCard, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const card = await Card.findOneAndUpdate({ _id: id, userId }, req.body, {
      new: true,
    });
    if (!card) {
      return res
        .status(404)
        .json({ error: "Card not found or user does not have permission" });
    }
    res.json({ card });
  } catch (e) {
    next(e);
  }
});
// DELETE CARD
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteCard = await Card.findByIdAndDelete({ _id: id });
    return res.json(deleteCard);
  } catch (e) {
    next(e);
  }
});
// LIKE CARD
router.patch("/:id", validateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    if (!userId) {
      throw new BizCardsError("User must have an id", 500);
    }
    const card = await Card.findById(id);
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    card.likes.push(userId);
    await card.save();
    res.json({ card });
  } catch (e) {
    next(e);
  }
});
// CHANGE BIZNUMBER
router.patch("/:id/changeBizNum", isAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bizNumber } = req.body;
    if (!bizNumber) {
      return res
        .status(400)
        .json({ error: "bizNumber is required for PATCH request" });
    }
    const card = await Card.findOneAndUpdate(
      { _id: id },
      { bizNumber },
      {
        new: true,
      }
    );
    if (!card) {
      return res
        .status(404)
        .json({ error: "Card not found or user does not have permission" });
    }
    res.json({ card });
  } catch (e) {
    next(e);
  }
});
export { router as taskRouter };
