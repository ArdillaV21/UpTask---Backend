import { Router } from "express";
import { body, param} from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { validateProjectExists } from "../middleware/project";

const router = Router()

router.post('/',
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.createProject
    
)

router.get('/', ProjectController.getAllProject)

router.get('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    body('projectName')
        .notEmpty().withMessage('El nombre del Proyecto es Obligatorio'),
    body('clientName')
        .notEmpty().withMessage('El nombre del cliente es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion del proyecto es obligatoria'),
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', 
    param('id').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    ProjectController.deleteProject
)

//Routes Tasks
router.param('projectId', validateProjectExists)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es Obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripcion de la tarea es obligatorio'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks', 
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no válido'),
    body('name')
        .notEmpty().withMessage('El nombre de la Tarea es obligatorio'),
    body('description')
        .notEmpty().withMessage('La descripción de la tarea es obligatoria'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId', 
    param('taskId').isMongoId().withMessage('ID no valido'),
    handleInputErrors,
    TaskController.deleteTask
)

export default router