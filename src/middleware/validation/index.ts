import { joiCardSchema } from "../../joi/cards.joi";
import { joiLoginSchema } from "../../joi/login.joi";
import { joiTaskSchema } from "../../joi/tasks.joi";
import { joiUserSchema } from "../../joi/user.joi";
import { validateSchema } from "./validate-schema";

const validateRegistration = validateSchema(joiUserSchema);
const validateLogin = validateSchema(joiLoginSchema);
const validateCard = validateSchema(joiCardSchema);
const validateTask = validateSchema(joiTaskSchema);
export { validateRegistration, validateLogin, validateCard, validateTask };
