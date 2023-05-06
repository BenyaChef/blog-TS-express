import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {blogValidationMiddleware} from "../middlewares/blog-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {postDB} from "../db/postDB";
import {postRouter} from "./router-posts";
import {blogsDB} from "../db/blogsDB";


export const blogRouter = Router({})

blogRouter.get('/',  (req: Request, res: Response) => {
    res.status(200).send(blogsRepository.getAllBlogs())
})

blogRouter.get('/:id', (req: Request, res: Response) => {
    const foundBlog = blogsRepository.findBlogByID(req.params.id)
    if(!foundBlog) res.sendStatus(404)
        res.status(200).send(foundBlog)
})

blogRouter.post('/',
    authorizationMiddleware,
    blogValidationMiddleware,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
   const newBlog = blogsRepository.createNewBlog(req.body)
   if(!newBlog) res.sendStatus(400)
       res.status(201).send(newBlog)
})

blogRouter.put('/:id',
    authorizationMiddleware,
    blogValidationMiddleware,
    inputValidationMiddleware,
    (req: Request, res: Response) => {
    const isUpdate = blogsRepository.updateBlogByID(req.params.id, req.body)
    if(!isUpdate) res.sendStatus(404)
    res.sendStatus(204)
})

blogRouter.delete('/:id', authorizationMiddleware, (req: Request, res: Response) => {
    const isDeleted = blogsRepository.deleteBlogByID(req.params.id)
    if(!isDeleted) res.sendStatus(404)
    res.sendStatus(204)
})
blogRouter.delete('/testing/all-data', (req: Request, res: Response) => {
    blogsDB.splice(0)
    res.sendStatus(204)
})