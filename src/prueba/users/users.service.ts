import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OperationResult } from 'src/common/operation-result';
import { User, UserDocument } from 'src/database/models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getAll(): Promise<OperationResult<Array<User>>> {
    try {
      const users = await this.userModel.find();
      const usersResult: Array<User> = users.map(({ _id, name, lastname }) => ({
        id: _id,
        name,
        lastname,
      }));

      return OperationResult.ok(usersResult);
    } catch (error) {
      return OperationResult.fail(
        'Ha ocurrido un error obteniendo los usuarios.',
      );
    }
  }

  async create(user: User): Promise<OperationResult<string>> {
    try {
      const createdUser = new this.userModel(user);
      await createdUser.save();
      return OperationResult.ok('created');
    } catch (error) {
      return OperationResult.fail('Ha ocurrido un error creando el usuario.');
    }
  }

  async getById(id: string): Promise<OperationResult<User>> {
    try {
      const { _id, name, lastname } = await this.userModel.findById(id);
      const userResult: User = { id: _id, name, lastname };

      return OperationResult.ok(userResult);
    } catch (error) {
      return OperationResult.fail('Ha ocurrido un error buscando el usuario.');
    }
  }
}
