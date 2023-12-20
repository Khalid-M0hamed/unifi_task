import InjectionService from '../../../services/Injection.service';
import {UserRepository} from '../repositories/user.repository';

class GetUserTodoQuery {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }

  async execute(userId: string) {
      return this.userRepository.findTodosById(userId);
    }

}


export const getUserTodoQuery = new GetUserTodoQuery();
