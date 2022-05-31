import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputsResolver } from './inputs.resolver';
import { InputsService } from './inputs.service';
import { Inputs } from './entities/inputs.entity';
import { InputsController } from './inputs.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Inputs])],
  providers: [InputsResolver, InputsService],
  controllers: [InputsController],
  exports:[InputsService]
})
export class InputsModule {}
