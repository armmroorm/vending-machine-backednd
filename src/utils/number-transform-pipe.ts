import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class NumberTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (value.machineId && value.machineId !== '') {
      value.machineId = parseInt(value.machineId);
    }

    if (value.productId && value.productId !== '') {
      value.productId = parseInt(value.productId);
    }

    if (typeof value.machineId !== 'number' && value.machineId !== undefined) {
      throw new BadRequestException(`${value.machineId} is not number`);
    }

    if (typeof value.productId !== 'number' && value.productId !== undefined) {
      throw new BadRequestException(`${value.productId} is not number`);
    }

    return value;
  }
}
