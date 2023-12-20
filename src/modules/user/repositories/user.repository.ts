import { Document, Model, ModifyResult, Query } from 'mongoose';
import InjectionService from '../../../services/Injection.service';
import { IUser, UserModel } from '../models/';
import { ITodo, IToken } from '../models/user.model';

export class UserRepository {
  private model: Model<IUser & Document>;

  constructor() {

    this.model = UserModel;
  }

  // Find all documents
  findAll(): Query<IUser[], IUser> {
    return this.model.find();
  }

  // Find a document by ID
  findById(id: string): Query<IUser | null, IUser> {
    return this.model.findById(id);
  }

  // Create a new document
  create(data: Partial<IUser>): Promise<IUser> {
    return this.model.create(data);
  }

  // Update a document by ID
  update(id: string, updates: Record<string, unknown>): Query<IUser | null, IUser> {
    return this.model.findByIdAndUpdate(id, updates, { new: true });
  }

  // Delete a document by ID
  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }

  async getTodoInfo(todoId:string,userId:string){
    const user = await this.model.findOne(
      { _id: userId, 'todos._id': todoId },
      { 'todos.$': 1 }
    );
      console.log(userId,todoId)
    if (user && user.todos && user.todos.length > 0) {
      return user.todos[0];
    }
    return null
  }
  addTodo(userId: string, todo: Partial<ITodo>): Query<IUser | null, IUser> {
    return this.model.findByIdAndUpdate(
      userId,
      { $push: { todos: todo } },
      { new: true }
    );
  }

  updateTodo(todoId: string,userId:string, todo: Partial<ITodo>) {
    const { _id, ...fieldsWithoutId } = todo;
    return this.model.updateOne(
      { _id: userId, 'todos._id': todoId },
      { $set: { 'todos.$': { _id ,...fieldsWithoutId} } }
    )
  }

  //  Get user Todo List
  findTodosById(userId: string) {
    return this.model.findById(userId).select('todos');
  }

  async findUserToken(userId: string, token: string) {
    const user = await this.model.findOne({ 'tokens.userId': userId, 'tokens.token': token }, { 'tokens.$': 1 }).exec();
    if (user && user.tokens && user.tokens.length > 0) {
      return user.tokens[0].token;
    } else {
      return null;
    }
  }


  deleteToken(id: string, userId: string) {
    return this.model.updateOne(
      { _id: userId },
      { $pull: { tokens: { _id: id } } }
    );
  }

  deleteTodo(id: string, userId: string) {
    return this.model.updateOne(
      { _id: userId },
      { $pull: { todos: { _id: id } } }
    );
  }


  createToken(userId: string, token: Partial<IToken>) {
    try {
      return this.model.findOneAndUpdate(
        { _id: userId },
        { $push: { tokens: token } },
      )
    }
    catch (error) {
      throw error;
    }
  }

  findByEmail(email: string) {
    try {
      return  this.model.findOne({ email });
    }
    catch (error) {
      throw error;
    }
  }


}





