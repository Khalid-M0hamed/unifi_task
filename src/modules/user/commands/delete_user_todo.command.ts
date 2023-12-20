import InjectionService from '../../../services/Injection.service';
import { IUser } from '../models';
import {UserRepository} from '../repositories/user.repository';

class DeleteUserTodoCommand {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
   
  }

  async execute(todoId: string,userId:string) {
    return this.userRepository.deleteTodo(todoId,userId);
  }
}
export const deleteUserTodoCommand = new DeleteUserTodoCommand();
