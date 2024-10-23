import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  Post,
  UsePipes
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipe/zodValidation.pipe';
import { UserDto, userSchema } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(userSchema))
  async findOne(@Body() user: UserDto) {
    return this.usersService.findAll();
  }

  @Get()
  async findAll() {
    try {
      // throw new Error();
      await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message'
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error
        }
      );
    }
  }
}

export { UsersController };
