import { Router } from 'express';
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteTodo,
} from '../controllers/todoController';
import { validate, validateQuery } from '../middleware/validate';
import {
  createTodoSchema,
  updateTodoSchema,
  todoFiltersSchema,
} from '../utils/validation';

const router = Router();

router.get('/', validateQuery(todoFiltersSchema), getAllTodos);
router.get('/:id', getTodoById);
router.post('/', validate(createTodoSchema), createTodo);
router.put('/:id', validate(updateTodoSchema), updateTodo);
router.patch('/:id/toggle', toggleTodoCompletion);
router.delete('/:id', deleteTodo);

export default router;


