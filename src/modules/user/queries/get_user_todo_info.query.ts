import injectionService from '../../../services/Injection.service';
import InjectionService from '../../../services/Injection.service';
import {UserRepository} from '../repositories/user.repository';


class GetTodoInfoQuery {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }

   execute(id: string,userId:string) {
    return   this.userRepository.getTodoInfo(id,userId);
  }

}

injectionService.registerRepository('UserRepository',new UserRepository())
export const getTodoInfoQuery = new GetTodoInfoQuery();
