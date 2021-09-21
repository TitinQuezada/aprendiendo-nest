import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { HttpResponse } from 'src/common/http-response';
import { User } from 'src/database/models/user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  async get(): Promise<HttpResponse> {
    const operationResult = await this.userService.getAll();

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<HttpResponse> {
    const operationResult = await this.userService.getById(id);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse(operationResult.entity);
  }

  @Post()
  async create(@Body() user: User): Promise<HttpResponse> {
    const operationResult = await this.userService.create(user);

    if (!operationResult.success) {
      return HttpResponse.getFailedResponse(operationResult.errorMessage);
    }

    return HttpResponse.getSuccessResponse('Created');
  }
}
