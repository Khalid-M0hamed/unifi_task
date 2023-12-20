import { HttpException } from '../../../helpers/exption';
import { success } from '../../../helpers/response';
import InjectionService from '../../../services/Injection.service';
import { getAccessToken, getRefreshToken } from '../../../services/jwt.service';
import { ROLE_ENUM, TOKEN_TYPES } from '../../../typings/enums/defualts.enum';
import { exceptionMap } from '../../../typings/enums/httpExceptions';
import { IUser } from '../models';
import {UserRepository} from '../repositories/user.repository';

class LoginCommand {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = InjectionService.getRepository<UserRepository>('UserRepository');
  }
  async execute(email: string, password: string) {
    let user = await this.userRepository.findByEmail(email)
    if (!user) throw new HttpException(exceptionMap.userNotFound);
    if (!user.comparePassword(password))
      throw new HttpException(exceptionMap.wrongPasswordOrUSerName);

    const accesToken = getAccessToken({ id: user.id, type: ROLE_ENUM.user });
    let newRefreshToken = getRefreshToken({
      id: user.id,
      type: ROLE_ENUM.user,
    });
  
  const refresTokens=user.tokens.filter(token=>token.tokenType === TOKEN_TYPES.refreshToken)
  if (refresTokens.length > 5) {
    await this.userRepository.deleteToken(refresTokens[0]._id,user.id)
  }
  await this.userRepository.createToken(user.id,
    { tokenType:TOKEN_TYPES.refreshToken,
      token:newRefreshToken,
    });

    return {
      token:accesToken,
      refreshToken:newRefreshToken,
      user,
    };

  }
}
export const loginCommand = new LoginCommand();
