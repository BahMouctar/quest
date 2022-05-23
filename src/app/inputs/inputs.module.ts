import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InputsResolver } from './inputs.resolver';
import { InputsService } from './inputs.service';
import { Inputs } from './entities/inputs.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Inputs])],
  providers: [InputsResolver, InputsService],
  exports:[InputsService]
})
export class InputsModule {}
