import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}

export { ValidationPipe };
