import { ConflictException, Injectable } from '@nestjs/common';

import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async list() {
    return [
      {
        name: 'Faizan',
      },
      { name: 'Tarq' },
    ];
  }
  public async findById(id) {
    return 'User Controller';
  }

  // public async update(model: IUser, currentUser: ICurrentUser): Promise<User> {
  //   delete model.id;

  //   const user = await this.userRepository.findById(currentUser.id);

  //   if (user.email !== model.email) {
  //     const isEmailAvailable = await this.userRepository.isEmailAvailable(
  //       model.email,
  //     );
  //     if (!isEmailAvailable) throw new ConflictException('email-unavailable');
  //   }

  //   return this.userRepository.update({ ...user, ...model });
  // }
}
