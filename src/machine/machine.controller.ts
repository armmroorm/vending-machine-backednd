import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { Response } from 'express';
import { IdValidatePipe } from '../utils/id-validate-pipe';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { CreateMachineDto } from './dto/create-machine.dto';
@Controller('machine')
export class MachineController {
  constructor(private machineService: MachineService) {}

  @Get()
  async getGallery(@Res() res: Response) {
    const data = await this.machineService.GetAll();
    res.status(HttpStatus.OK).send(data);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createMachine(
    @Body() createMachineDto: CreateMachineDto,
    @Res() res: Response,
  ) {
    console.log('craeteMachineDto', createMachineDto);
    const data = await this.machineService.create(createMachineDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async updateContent(
    @Res() res: Response,
    @Param('id', IdValidatePipe, ParseIntPipe) id: number,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    const data = await this.machineService.update(id, updateMachineDto);
    res.status(HttpStatus.OK).send(data);
  }

  @Delete(':id')
  async deleteNew(
    @Param('id', IdValidatePipe, ParseIntPipe) id: number,
    @Res() res: Response,
  ) {
    const data = await this.machineService.delete(id);
    res.status(HttpStatus.OK).send(data);
  }
}
