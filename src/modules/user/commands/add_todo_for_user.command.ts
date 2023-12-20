import InjectionService from '../../../services/Injection.service';
import { IUser,ITodo } from '../models';
import {UserRepository} from '../repositories/user.repository';

class AddTodoCommand {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }

  async execute(userId: string, todo: ITodo){
    // Check if the user exists
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Add the todo to the user
    const result = await this.userRepository.addTodo(userId, todo).select("todos");

    return result;
  }
}

export const addTodoCommand = new AddTodoCommand();
