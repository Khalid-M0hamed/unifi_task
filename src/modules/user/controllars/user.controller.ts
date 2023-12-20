// src/controllers/UserController.ts

import { NextFunction, Request, Response, Router } from 'express';
import { getTodoInfoQuery, getUserInfoQuery, getUserTodoQuery} from '../queries';
import {addTodoCommand,deleteUserTodoCommand, updateUserTodoCommand} from '../commands';
import { hasRole } from '../../../middlewares/has_role';
import { ROLE_ENUM } from '../../../typings/enums/defualts.enum';
import { success } from '../../../helpers/response';
import { HttpException } from '../../../helpers/exption';
import { exceptionMap } from '../../../typings/enums/httpExceptions';


export class UserController {

  private static _instance: UserController;
  readonly path: string;
  public router: Router;
  //track next  guest user id  to save as guest user username
  static get Instance() {
    return this._instance ? this._instance : (this._instance = new this());
  }
  constructor() {
    this.path = "";
    this.router = Router();
    this.initRoutes();
   
  }
  private initRoutes() {
    this.router.put(
      this.path + "/:id/todos/:todoId",
      [hasRole([ROLE_ENUM.admin, ROLE_ENUM.user])],
      this.updateUserTodo.bind(this)
    );

    this.router.delete(
      this.path + "/:id/todos/:todoId",

      this.deleteUserTodo.bind(this)
    );

    this.router.get(
      this.path + "/:id",
      [hasRole([ROLE_ENUM.user])],
      this.getUserInfo.bind(this)
    );

    
    this.router.get(
      this.path + "/:id/todos/:todoId",

      this.getTodoInfo.bind(this)
    );

    this.router.post(
      this.path + "/:id/todo",
      [hasRole([ROLE_ENUM.user])],
      this.addTodo.bind(this)
    );

    this.router.get(
      this.path + "/:id/todo",
      [hasRole([ROLE_ENUM.user])],
      this.getUserTodos.bind(this)
    );
  }

  getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.id;
      const user = await getUserInfoQuery.execute(userId);
      return success(res, {
        user,
      });

    } catch (error) {
      console.error(error);
      return  next(error)
    }
  };

  getUserTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.params.id;
      const todoList = await getUserTodoQuery.execute(userId);
      return success(res, {
        todoList,
      })
    } catch (error) {
      return  next(error)
    }
  };

  getTodoInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id || req.params.id;
      const todoId = req.params.todoId;
      const todoData= await getTodoInfoQuery.execute(todoId,userId);
      return success(res, {
        todo:todoData,
      })
    } catch (error) {
      return  next(error)
    }
  };

  deleteUserTodo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id || req.params.id;
    const todoId = req.params.todoId;

    try {
      const deletedTodo = await deleteUserTodoCommand.execute(todoId,userId);
      if (!deletedTodo) {
        throw new HttpException(exceptionMap.userNotFound);
      }

      return success(res, {
        success:!!deletedTodo.modifiedCount,
      })
    } catch (error) {
      return  next(error)
    }
  };

  updateUserTodo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id || req.params.id;
    const todoId = req.params.todoId;
    const updates = req.body;

    try {
      const updatedUserTods = await updateUserTodoCommand.execute(todoId,userId, updates);
      if (!updatedUserTods) {
        throw new HttpException(exceptionMap.userNotFound);
      }
      return success(res, {
        success:!!updatedUserTods.modifiedCount,
      })
    } catch (error) {
      return  next(error)
    }
  };
  
  addTodo = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const todo = req.body;

    try {
      const todoList = await addTodoCommand.execute(userId, todo);
      if (!todoList) {
        throw new HttpException(exceptionMap.userNotFound);
      }

      return success(res, {
        todoList,
      })
    } catch (error) {
      return  next(error)
    }
     
  };
}


