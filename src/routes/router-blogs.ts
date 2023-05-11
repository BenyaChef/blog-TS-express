import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {authorizationMiddleware} from "../middlewares/authorization-middleware";
import {blogValidationMiddleware} from "../middlewares/blog-validation-middleware";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {BlogViewModel} from "../models/blogs-models/BlogViewModel";
import {CreateBlogModel} from "../models/blogs-models/CreateBlogModel";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../models/request-models/RequestTypes";
import {UpdateBlogModel} from "../models/blogs-models/UpdateBlogModel";


export const blogRouter = Router({})

blogRouter.get('/', async (req: Request,
                           res: Response<BlogViewModel[]>) => {
    res.status(200).send(await blogsRepository.getAllBlogs())
})

blogRouter.get('/:id', async (req: RequestWithParams<{ id: string }>,
                        res: Response<BlogViewModel[]>) => {
    const foundBlog = await blogsRepository.findBlogByID(req.params.id)
    if (!foundBlog) res.sendStatus(404)
    res.status(200).send(foundBlog)
})

blogRouter.post('/',
    authorizationMiddleware,
    blogValidationMiddleware,
    inputValidationMiddleware,
    async (req: RequestWithBody<CreateBlogModel>,
           res: Response<BlogViewModel>) => {
        const newBlog = await blogsRepository.createNewBlog(req.body)
        if (!newBlog) res.sendStatus(400)
        res.status(201).send(newBlog)
    })

blogRouter.put('/:id',
    authorizationMiddleware,
    blogValidationMiddleware,
    inputValidationMiddleware,
    (req: RequestWithParamsAndBody<{ id: string }, UpdateBlogModel>,
     res: Response) => {
        const isUpdate = blogsRepository.updateBlogByID(req.params.id, req.body)
        if (!isUpdate) res.sendStatus(404)
        res.sendStatus(204)
    })

blogRouter.delete('/:id',
    authorizationMiddleware,
    (req: RequestWithParams<{ id: string }>,
     res: Response) => {
        const isDeleted = blogsRepository.deleteBlogByID(req.params.id)
        if (!isDeleted) res.sendStatus(404)
        res.sendStatus(204)
    })
