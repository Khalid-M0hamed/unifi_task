import InjectionService from '../../../services/Injection.service';
import { IUser } from '../models';
import {UserRepository} from '../repositories/user.repository';

class DeleteUserTokenCommand {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
   
  }

  async execute(id:string,userId: string) {
    try {
      this.userRepository.deleteToken(id,userId)
     
    } catch (error) {
      
      throw error;
    }
  }
}
export const deleteUserTokenCommand = new DeleteUserTokenCommand();
