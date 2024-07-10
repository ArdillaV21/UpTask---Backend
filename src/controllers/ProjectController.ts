import type { Request, Response } from "express"
import Project from "../models/Project"


export class ProjectController {

    static createProject = async (req: Request, res: Response) => {

        const project = new Project(req.body)
        try{
            await project.save()
            res.send('Proyecto Creado Correctamente')
        }catch(error){
            console.log(error)
        }
    }

    static getAllProject = async (req: Request, res: Response) => {
        try{
            const projects = await Project.find({})
            res.json(projects)
        }catch(error){
            console.log(error)
        }
        
    }

    static getProjectById = async (req: Request, res: Response) => {
        const {id} = req.params
        try{
            const project = await (await Project.findById(id)).populate('tasks')

            if(!project){
                const error = new Error('Proyecto no encontrado')
                return res.status(404).json({error: error.message})
            }
            
            res.json(project)
        }catch(error){
            console.log(error)
        }
        
    }
    
    
    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
    
            if (!project) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }
    
            res.json({ message: 'Proyecto Actualizado', project });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al actualizar el proyecto' });
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id)
            
            if (!project) {
                return res.status(404).json({ error: 'Proyecto no encontrado' });
            }

            await project.deleteOne()
            res.send('Proyecto Eliminado')
            
        } catch (error) {
            console.error(error);
        }
    }
}