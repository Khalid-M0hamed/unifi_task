import InjectionService from '../../../services/Injection.service';
import { IToken } from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';

class CreateUserTokenCommand {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
   
  }

  async execute(id:string,tokenData: Partial<IToken>) {
    try {
      this.userRepository.createToken(id,tokenData)
     
    } catch (error) {
      
      throw error;
    }
  }
}
export const createUserTokenCommand = new CreateUserTokenCommand();
