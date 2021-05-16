import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class IdValidatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value !== '') {
      if (value === '0') {
        throw new BadRequestException(`ID must not equal 0`);
      }

      if (value.length > 1 && parseInt(value[0]) === 0) {
        throw new BadRequestException(
          `ID should be a number(integer) or must not be 001 || 0.1`,
        );
      }

      for (let i = 0; i < value.length; i++) {
        const checkId = parseInt(value[i]);

        if (isNaN(checkId)) {
          throw new BadRequestException(
            `ID should be a number(integer) or must not be less than 1`,
          );
        }
      }

      return value;
    }
  }
}
