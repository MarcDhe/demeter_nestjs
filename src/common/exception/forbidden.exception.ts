import { HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';

class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}

export { ForbiddenException };
