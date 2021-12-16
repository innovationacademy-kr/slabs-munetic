import { userCreationAttributes } from './../models/user';
import {
  Controller,
  Example,
  Get,
  Post,
  Route,
  Body,
  SuccessResponse,
} from 'tsoa';
import status from 'http-status';
import { AuthService } from '../service/auth.service';

@Route('/auth/')
export class AuthController extends Controller {
  @Get('')
  public async index() {
    return { msg: 'Hello World!' };
  }

  @Get('/msg')
  public msg() {
    return { msg: 'This is a message' };
  }

  // @Post('/signin')
  // public async createUser(
  //   userInfo: userCreationAttributes,
  // ): Promise<userCreationAttributes> {
  //   this.setStatus(201);
  //   return new AuthService().signin(userInfo);
  // }
}
