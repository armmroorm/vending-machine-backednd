import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MachineEntity } from './Entity/machine.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { CreateMachineDto } from './dto/create-machine.dto';
import { loggerDeleteId } from '../utils/loggerDeleteId';

@Injectable()
export class MachineService {
  constructor(
    @InjectRepository(MachineEntity)
    private machineRepository: Repository<MachineEntity>,
  ) {}

  GetAll = async (): Promise<any> => {
    const quiryBuilder =
      this.machineRepository.createQueryBuilder('machine_tb');
    const machine = quiryBuilder
      .leftJoinAndSelect('machine_tb.product', 'productEntity')
      .getMany();
    return machine;
  };

  create = async (createMachineDto: CreateMachineDto) => {
    const { machineName, location, address } = createMachineDto;
    const machine = new MachineEntity();
    machine.machine_name = machineName;
    machine.location = location;
    machine.address = address;
    await machine.save();

    return machine;
  };

  update = async (id: number, updateMachineDto: UpdateMachineDto) => {
    const { machineName, location, address } = updateMachineDto;
    const machine = await this.QueryById(id);

    if (!machine) {
      throw new NotFoundException(`Machine with id : ${id} not found`);
    }

    if (machineName !== null && location !== null && address !== null) {
      machine.machine_name = machineName;
      machine.location = location;
      machine.address = address;
    }

    await machine.save();

    return machine;
  };

  delete = async (id: number) => {
    const deleteMachine = await this.machineRepository.delete(id);

    if (deleteMachine.affected === 0) {
      throw new NotFoundException(`Machine with id : ${id} not found`);
    }

    return loggerDeleteId(id);
  };

  QueryById = async (id) => {
    const machine = await this.machineRepository.findOne(id);

    if (!machine) {
      throw new NotFoundException(`machine with id : ${id} not found`);
    }

    return machine;
  };
}
