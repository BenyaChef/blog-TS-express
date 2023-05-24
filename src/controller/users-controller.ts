import {Response, Request} from "express";
import {RequestWithBody, RequestWithParams, RequestWithQuery} from "../models/request-models/request-types";
import {UserInputModel} from "../models/users-model/user-input-model";
import {usersService} from "../domain/users-service";
import {HTTP_STATUS} from "../enum/enum-HTTP-status";
import {usersQueryRepository} from "../repositories/query-repositories/users-query-repository";
import {UsersPaginationSortQueryModel} from "../models/request-models/users-pagination-sort-model";
import {UsersViewPaginationSortModel} from "../models/users-model/users-view-pagination-sort-model";



export const usersController = {
   async getAllUsers(req: RequestWithQuery<UsersPaginationSortQueryModel>,
                     res: Response<UsersViewPaginationSortModel>) {
        res.status(HTTP_STATUS.OK).send(await usersQueryRepository.getAllUsers(req.query))
    },

   async createUser(req: RequestWithBody<UserInputModel>,
                    res: Response) {
        const newUser = await usersService.createUser(req.body)
       res.status(HTTP_STATUS.Created).send(newUser)
    },

   async deleteUsersById(req: RequestWithParams<{ id: string }>,
                    res: Response) {
        const isDelete : boolean = await usersService.deleteUsersById(req.params.id)
       if(!isDelete) return res.sendStatus(HTTP_STATUS.Not_found)
       return res.sendStatus(HTTP_STATUS.No_content)
    }
}