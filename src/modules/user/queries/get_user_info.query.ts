import injectionService from '../../../services/Injection.service';
import InjectionService from '../../../services/Injection.service';
import { IUser } from '../models';
import {UserRepository} from '../repositories/user.repository';


class GetUserInfoQuery {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }

   execute(id: string): Promise<IUser | null> {
    return   this.userRepository.findById(id);
  }

}

injectionService.registerRepository('UserRepository',new UserRepository())
export const getUserInfoQuery = new GetUserInfoQuery();
