import { Module } from '@nestjs/common';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MachineEntity } from './Entity/machine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MachineEntity])],
  controllers: [MachineController],
  providers: [MachineService],
})
export class MachineModule {}
