import InjectionService from '../../../services/Injection.service';
import { ITodo, IUser } from '../models';
import {UserRepository} from '../repositories/user.repository';

class UpdateUserTodoCommand {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }
  async execute(todoId: string,userId:string, updates: Partial<ITodo>) {
    // Check if the user exists
    const existingUser = await this.userRepository.findById(userId);
    if (!existingUser) {
      throw new Error('User not found');
    }

    // Save the updated user to the database
    const result = await this.userRepository.updateTodo(todoId,userId ,updates);

    return result;
  }
}
export const updateUserTodoCommand = new UpdateUserTodoCommand();
