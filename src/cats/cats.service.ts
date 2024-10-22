import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
class CatsService {
  private readonly cats: CreateCatDto[] = [
    {
      name: 'test',
      age: 1,
      breed: 'string'
    }
  ];

  constructor(private readonly configService: ConfigService) {}

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): CreateCatDto[] {
    const dbHost = this.configService.get('database.host');
    console.log(`dbhost => ${dbHost}`);
    return this.cats;
  }

  findOne(id: number): CreateCatDto {
    console.log(`id => ${id}`);
    return this.cats[`${id}`];
  }
}

export { CatsService };
