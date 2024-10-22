import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UsePipes
} from '@nestjs/common';
import { ZodValidationPipe } from 'src/common/pipe/zodValidation.pipe';
import { CreateCatDto, createCatSchema } from './dto/create-cat.dto';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { CatsService } from './cats.service';

@Controller('cats')
class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ZodValidationPipe(createCatSchema)) // permet de valider le schema d'entré
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Get()
  async findAll() {
    try {
      // throw new Error();
      await this.catsService.findAll();
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

export { CatsController };
