import InjectionService from '../../../services/Injection.service';
import {UserRepository} from '../repositories/user.repository';

class GetUserTokensQuery {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }

  async execute(userId: string,token:string) {

      return this.userRepository.findUserToken(userId,token);
      
    }

}


export const getUserTokensQuery = new GetUserTokensQuery();
